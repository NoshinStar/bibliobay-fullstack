import csv
from django.core.management.base import BaseCommand
from accounts.models import User
from django.db import IntegrityError

class Command(BaseCommand):
    help = 'Imports user data from a specified CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the users_import.csv file')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        
        try:
            with open(csv_file_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                users_created = 0
                users_skipped = 0
                
                self.stdout.write(self.style.SUCCESS(f'--- Starting User Import from {csv_file_path} ---'))

                for row in reader:
                    # Required fields
                    username = row.get('username')
                    email = row.get('email')
                    password = row.get('password') # IMPORTANT: This should be the plaintext password or the old hash!
                    
                    if not username or not email or not password:
                        self.stdout.write(self.style.ERROR(f"Skipping row due to missing username, email, or password: {row}"))
                        users_skipped += 1
                        continue

                    try:
                        # Extract optional fields
                        user_id = row.get('id') 
                        role = row.get('role', 'customer')
                        phone = row.get('phone', '')
                        address = row.get('address', '')
                        first_name = row.get('first_name', '')
                        last_name = row.get('last_name', '')
                        
                        user_data = {
                            'username': username,
                            'email': email,
                            'role': role,
                            'phone': phone,
                            'address': address,
                            'first_name': first_name,
                            'last_name': last_name,
                        }
                        
                        # Use .objects.create() if you are letting MySQL auto-assign IDs
                        # If you MUST preserve the old ID for foreign key reasons:
                        if user_id:
                             user_data['id'] = user_id
                             
                        user = User(**user_data)
                        
                        # --- CRITICAL STEP: Hashing the Password ---
                        # If you are migrating users with existing hashed passwords, 
                        # you must use user.password = password directly.
                        # If the CSV contains NEW plaintext passwords, use set_password(). 
                        
                        # Assuming the CSV contains PLAINTEXT passwords for simplicity:
                        user.set_password(password)
                        
                        user.save()
                        users_created += 1
                        self.stdout.write(self.style.NOTICE(f'Successfully created user: {username}'))

                    except IntegrityError:
                        self.stdout.write(self.style.WARNING(f'Skipping user: {username}. Username or email already exists.'))
                        users_skipped += 1
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'Error creating user {username}: {e}'))
                        users_skipped += 1
                        
                self.stdout.write(self.style.SUCCESS('--- User Import Complete ---'))
                self.stdout.write(self.style.SUCCESS(f'Total Users Created: {users_created}'))
                self.stdout.write(self.style.WARNING(f'Total Users Skipped: {users_skipped}'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'Error: CSV file not found at {csv_file_path}'))