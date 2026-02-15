# bibliobay_backend/books/management/commands/import_books.py

import csv
import json
from decimal import Decimal
from django.core.management.base import BaseCommand, CommandError
from books.models import Book, Category


def clean_price(value):
    """Convert 'BDT 290.00' → '290.00'."""
    if not value:
        return None
    return value.replace("BDT", "").replace(",", "").strip()


class Command(BaseCommand):
    help = 'Imports book data from a CSV or JSON file into the database.'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the input data file.')
        parser.add_argument('--format', type=str, default='csv', help='Format (csv or json).')

    def handle(self, *args, **options):
        file_path = options['file_path']
        file_format = options['format'].lower()

        # --- Load file ---
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                if file_format == 'csv':
                    reader = csv.DictReader(f)
                    data_to_import = list(reader)
                elif file_format == 'json':
                    data_to_import = json.load(f)
                else:
                    raise CommandError('Unsupported file format. Use "csv" or "json".')

        except FileNotFoundError:
            raise CommandError(f'File not found: "{file_path}"')
        except Exception as e:
            raise CommandError(f'Error reading file: {e}')

        self.stdout.write(self.style.SUCCESS(
            f"Loaded {len(data_to_import)} records from {file_path}. Importing..."
        ))

        books_created_count = 0

        # --- Import loop ---
        for row in data_to_import:
            try:
                # Optional: category column
                category_name = row.get("category")
                category_obj = None
                if category_name:
                    category_obj, _ = Category.objects.get_or_create(name=category_name)

                # Clean price fields
                price = clean_price(row.get("price"))
                original_price = clean_price(row.get("original_price"))

                # Convert to Decimal
                price = Decimal(price) if price else Decimal("0.00")
                original_price = Decimal(original_price) if original_price else None

                # Save book
                Book.objects.create(
                    title=row.get("title"),
                    author=row.get("author"),
                    category=category_obj,
                    price=price,
                    original_price=original_price,
                    stock=row.get("stock") or 0,
                    description=row.get("description", ""),
                    status="active",
                )

                books_created_count += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(
                    f"Could not create book '{row.get('title')}': {e}"
                ))

        # --- Summary ---
        self.stdout.write(self.style.SUCCESS(
            f"Import complete. Successfully created {books_created_count} books."
        ))
