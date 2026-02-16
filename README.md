# 📚 BiblioBAY - Fullstack E-Commerce Platform

A comprehensive, decoupled fullstack e-commerce application for online book sales, featuring a Django REST API backend and a modern vanilla JavaScript frontend.

![Django](https://img.shields.io/badge/Django-5.x-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0.2-purple.svg)

---

## 🌟 Overview

BiblioBAY is a full-featured e-commerce platform designed for online book sales. Built with a **decoupled architecture**, it features a powerful Django REST Framework backend and a dynamic vanilla JavaScript frontend. The system leverages JWT authentication, RESTful API design, and modern frontend patterns to deliver a seamless shopping experience for customers and comprehensive management tools for administrators.

### Why Decoupled Architecture?

- **Independent Development**: Frontend and backend can be developed, tested, and deployed separately
- **Scalability**: Easy to scale each layer independently based on demand
- **Technology Flexibility**: Frontend can be rebuilt with any framework (React, Vue) without touching the backend
- **API-First Design**: Backend APIs can serve multiple clients (web, mobile, desktop)
- **Better Performance**: Static frontend can be served via CDN

---

## ✨ Core Features

### 🛍️ Customer Experience

#### Seamless Shopping Journey
- **Dynamic Landing Page**: Visually engaging homepage with featured books, new releases, and category sections
- **Advanced Search**: Real-time book search with instant results and filtering
- **Responsive Design**: Optimized experience across desktop, tablet, and mobile devices
- **Book Details**: Comprehensive information including cover images, descriptions, ratings, and reviews

#### User Authentication
- **Secure Registration**: Complete sign-up flow with backend validation
- **JWT Authentication**: Token-based authentication with automatic refresh
- **Protected Routes**: Session-aware navigation with automatic redirects
- **User Dashboard**: Personalized area for logged-in customers

#### Shopping Cart System
- **Persistent Cart**: Backend-managed cart with user-specific data
- **Real-time Updates**: Instant cart modifications via API calls
- **Cart Management**: View all items with dynamic price calculations
- **Checkout Flow**: Complete purchase simulation with multiple payment options

#### Order Management
- **Order History**: View all past and pending orders
- **Order Tracking**: Real-time status updates
- **Payment Options**: Cash on Delivery (COD) and bKash integration
- **Invoice Generation**: Detailed order receipts

### 🔧 Admin Management System

#### Secure Administrator Access
- **JWT-Protected Admin Panel**: Role-based access control
- **Dashboard Analytics**: Real-time metrics for sales, users, and orders
- **Activity Monitoring**: Track customer activities and transactions

#### Inventory Management
- **Full CRUD Operations**: Create, Read, Update, Delete book entries
- **Stock Management**: Track inventory levels and availability
- **Category System**: Organize books by genre/category
- **Bulk Operations**: Efficient multi-item management

#### User Management
- **Customer Database**: Complete view of registered users
- **Role Management**: Assign roles (customer, member, admin)
- **Account Status**: Activate/deactivate user accounts
- **User Analytics**: Track user engagement and activity

#### Order Processing
- **Order Dashboard**: View and manage all customer purchases
- **Financial Calculations**:
  - Subtotal computation
  - 8% sales tax
  - $5.00 flat shipping rate
  - Grand total calculation
- **Status Management**: Update order fulfillment status
- **Transaction Tracking**: Monitor payment methods and IDs

#### Content Management
- **Review Moderation**: Approve/reject customer reviews with star ratings
- **Blog Management**: Create and manage blog content
- **System Settings**: Configure email templates and platform behavior

---

## 🏗️ Architecture Overview

```
BiblioBAY Fullstack
│
├── 📦 Backend (bibliobay_backend/)
│   └── Django REST Framework API
│       ├── JWT Authentication
│       ├── SQLite Database
│       └── RESTful Endpoints
│
└── 🎨 Frontend (BIBLIOBAY/)
    └── Vanilla JavaScript SPA
        ├── HTML5 Pages
        ├── CSS3 Styling
        └── API Communication Layer
```

---

## 🛠️ Technology Stack

### Backend (bibliobay_backend/)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Python** | Core Language | 3.8+ |
| **Django** | Web Framework | 5.x |
| **Django REST Framework** | API Framework | Latest |
| **djangorestframework-simplejwt** | JWT Authentication | Latest |
| **SQLite** | Database | Default |
| **CORS Headers** | Cross-Origin Requests | Latest |

### Frontend (BIBLIOBAY/)

| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Structure & Semantics | Latest |
| **CSS3** | Styling & Animations | Latest |
| **JavaScript** | Application Logic | ES6+ |
| **Bootstrap** | Responsive Framework | 5.0.2 |
| **Font Awesome** | Icon Library | CDN |
| **Swiper.js** | Touch Slider | CDN |
| **Feather Icons** | UI Icons | CDN |

---

## 📁 Project Structure

```
BiblioBAY-Fullstack/
│
├── 📂 bibliobay_backend/              # Django Backend
│   ├── bibliobay_backend/             # Project settings
│   │   ├── settings.py                # Django configuration
│   │   ├── urls.py                    # Main URL router
│   │   └── wsgi.py                    # WSGI config
│   │
│   ├── accounts/                      # User management app
│   │   ├── models.py                  # Custom User Model
│   │   ├── serializers.py             # User serialization
│   │   ├── views.py                   # Auth endpoints
│   │   └── urls.py                    # Auth routes
│   │
│   ├── books/                         # Book inventory app
│   │   ├── models.py                  # Book, Category models
│   │   ├── serializers.py             # Book serialization
│   │   ├── views.py                   # CRUD endpoints
│   │   └── urls.py                    # Book routes
│   │
│   ├── orders/                        # Order processing app
│   │   ├── models.py                  # Order, OrderItem models
│   │   ├── serializers.py             # Order serialization
│   │   ├── views.py                   # Checkout endpoints
│   │   └── urls.py                    # Order routes
│   │
│   ├── reviews/                       # Review management app
│   │   ├── models.py                  # Review model
│   │   ├── serializers.py             # Review serialization
│   │   └── views.py                   # Review endpoints
│   │
│   ├── blogs/                         # Blog content app
│   │   ├── models.py                  # Blog model
│   │   └── views.py                   # Blog endpoints
│   │
│   ├── manage.py                      # Django CLI
│   ├── requirements.txt               # Python dependencies
│   └── db.sqlite3                     # SQLite database
│
└── 📂 BIBLIOBAY/                      # Frontend
    │
    ├── 📄 index.html                  # Landing page
    ├── 📄 dashboard.html              # User dashboard
    ├── 📄 login.html                  # Customer login
    ├── 📄 register.html               # Registration
    ├── 📄 checkout.html               # Checkout page
    │
    ├── 🔐 Admin Panel
    │   ├── admin-login.html           # Admin authentication
    │   ├── admin-dashboard.html       # Analytics overview
    │   ├── admin-books.html           # Inventory management
    │   ├── admin-users.html           # User management
    │   ├── admin-orders.html          # Order processing
    │   ├── admin-reviews.html         # Review moderation
    │   ├── admin-blogs.html           # Blog management
    │   └── admin-settings.html        # System configuration
    │
    ├── 📂 js/                         # JavaScript modules
    │   ├── api.js                     # API communication layer
    │   ├── auth.js                    # Authentication logic
    │   ├── books-loader.js            # Dynamic book rendering
    │   ├── user-common.js             # Session & cart management
    │   ├── script.js                  # UI/UX enhancements
    │   └── data.js                    # Sample datasets
    │
    ├── 📂 css/                        # Stylesheets
    │   ├── style.css                  # Main styles
    │   ├── loginReg.css               # Auth page styles
    │   └── 404Style.css               # Error page styles
    │
    └── 📂 img/                        # Image assets
        ├── books/                     # Book cover images
        └── icons/                     # UI icons
```

---

## 🔧 Backend Architecture (Django API)

### Core Components

#### 1. Authentication System (`accounts/`)
```python
# Custom User Model with Roles
class User(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=[
            ('customer', 'Customer'),
            ('member', 'Member'),
            ('admin', 'Admin')
        ]
    )
    email = models.EmailField(unique=True)
```

**Features:**
- JWT token-based authentication via `simplejwt`
- Token refresh mechanism
- Role-based access control (RBAC)
- Secure password hashing

**Endpoints:**
```
POST /api/v1/accounts/register/    # User registration
POST /api/v1/accounts/login/       # JWT token generation
POST /api/v1/accounts/refresh/     # Token refresh
GET  /api/v1/accounts/profile/     # User profile
```

#### 2. Books Management (`books/`)
```python
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    category = models.ForeignKey(Category)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    description = models.TextField()
```

**Features:**
- CRUD operations for books
- Category-based filtering
- Search functionality (title, author, ISBN)
- Stock management
- Pagination support

**Endpoints:**
```
GET    /api/v1/books/              # List all books
POST   /api/v1/books/              # Create book (admin)
GET    /api/v1/books/{id}/         # Book details
PUT    /api/v1/books/{id}/         # Update book (admin)
DELETE /api/v1/books/{id}/         # Delete book (admin)
GET    /api/v1/books/?search=      # Search books
```

#### 3. Order Processing (`orders/`)
```python
class Order(models.Model):
    user = models.ForeignKey(User)
    status = models.CharField(choices=STATUS_CHOICES)
    payment_method = models.CharField(choices=PAYMENT_METHODS)
    subtotal = models.DecimalField()
    tax = models.DecimalField()
    shipping = models.DecimalField()
    total = models.DecimalField()
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order)
    book = models.ForeignKey(Book)
    quantity = models.IntegerField()
    price = models.DecimalField()
```

**Features:**
- Shopping cart management
- Checkout processing
- Order status tracking
- Payment method support (COD, bKash)
- Automatic calculations (tax, shipping, total)

**Endpoints:**
```
GET  /api/v1/orders/cart/          # Get user cart
POST /api/v1/orders/cart/add/      # Add to cart
PUT  /api/v1/orders/cart/update/   # Update quantity
DEL  /api/v1/orders/cart/remove/   # Remove item
POST /api/v1/orders/checkout/      # Place order
GET  /api/v1/orders/              # Order history
```

#### 4. Reviews & Ratings (`reviews/`)
```python
class Review(models.Model):
    user = models.ForeignKey(User)
    book = models.ForeignKey(Book)
    rating = models.IntegerField(choices=[(1,1), (2,2), ...])
    comment = models.TextField()
    status = models.CharField(choices=STATUS_CHOICES)
```

**Features:**
- User reviews and ratings
- Admin moderation
- Star rating system
- Review filtering

#### 5. Blog Management (`blogs/`)
```python
class Blog(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(User)
    content = models.TextField()
    published_date = models.DateTimeField()
```

### Security Features

1. **CORS Configuration**: Configured to allow frontend origin
2. **JWT Tokens**: 
   - Access Token: 60 minutes
   - Refresh Token: 7 days
3. **Permission Classes**: 
   - `IsAuthenticated` for protected routes
   - `IsAdminUser` for admin-only endpoints
4. **Input Validation**: DRF serializers validate all input data
5. **SQL Injection Protection**: Django ORM prevents SQL injection

---

## 🎨 Frontend Architecture (Client-Side)

### Core Components

#### A. API Communication Layer (`js/api.js`)

The backbone of the frontend - centralizes all API interactions:

```javascript
const API = {
    BASE_URL: 'http://localhost:8000/api/v1',
    
    // Automatic token attachment
    getHeaders() {
        const token = localStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    },
    
    // Centralized error handling
    async handleResponse(response) {
        if (response.status === 401) {
            // Token expired - redirect to login
            window.location.href = '/login.html';
        }
        return response.json();
    },
    
    // Auth API
    Auth: {
        login: (credentials) => fetch(`${API.BASE_URL}/accounts/login/`, {
            method: 'POST',
            headers: API.getHeaders(),
            body: JSON.stringify(credentials)
        }),
        register: (userData) => { /* ... */ }
    },
    
    // Books API
    Books: {
        getAll: (filters) => { /* ... */ },
        getById: (id) => { /* ... */ },
        search: (query) => { /* ... */ }
    },
    
    // Cart API
    Cart: {
        get: () => { /* ... */ },
        add: (bookId, quantity) => { /* ... */ },
        update: (itemId, quantity) => { /* ... */ },
        remove: (itemId) => { /* ... */ }
    },
    
    // Orders API
    Orders: {
        checkout: (orderData) => { /* ... */ },
        getHistory: () => { /* ... */ }
    }
};
```

**Benefits:**
- Single source of truth for API endpoints
- Automatic token management
- Centralized error handling
- Clean, maintainable code

#### B. Dynamic Content Rendering (`js/books-loader.js`)

Fetches and renders book data dynamically:

```javascript
async function loadBooks(filters = {}) {
    try {
        const response = await API.Books.getAll(filters);
        const books = await response.json();
        
        const booksContainer = document.getElementById('books-grid');
        booksContainer.innerHTML = books.map(book => `
            <div class="book-card">
                <img src="img/books/${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <p class="price">$${book.price}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Search functionality
document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value;
    loadBooks({ search: query });
});
```

#### C. Authentication Management (`js/auth.js`)

Handles user authentication flow:

```javascript
// Login
async function login(email, password) {
    const response = await API.Auth.login({ email, password });
    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard.html';
    } else {
        showError('Invalid credentials');
    }
}

// Route Protection
function checkAuth() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = '/login.html';
    }
}

// Logout
function logout() {
    localStorage.clear();
    window.location.href = '/index.html';
}
```

#### D. User Dashboard (`dashboard.html` & `js/user-common.js`)

Personalized user interface:

```javascript
// Role-based rendering
function renderDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    document.getElementById('username').textContent = user.username;
    
    if (user.role === 'member') {
        document.getElementById('role-badge').innerHTML = 
            '<span class="badge bg-success">Store Owner</span>';
    } else {
        document.getElementById('role-badge').innerHTML = 
            '<span class="badge bg-primary">Customer</span>';
    }
    
    loadCart();
    loadOrders();
}

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}
```

#### E. Shopping Cart System

Real-time cart management:

```javascript
async function addToCart(bookId, quantity = 1) {
    const response = await API.Cart.add(bookId, quantity);
    
    if (response.ok) {
        showNotification('Added to cart!');
        updateCartBadge();
    }
}

async function updateQuantity(itemId, quantity) {
    await API.Cart.update(itemId, quantity);
    loadCart(); // Refresh cart display
}

function calculateTotal() {
    const subtotal = cartItems.reduce((sum, item) => 
        sum + (item.book.price * item.quantity), 0
    );
    const tax = subtotal * 0.08;
    const shipping = 5.00;
    const total = subtotal + tax + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}
```

#### F. Checkout Flow

Modal-based checkout with payment options:

```javascript
async function checkout() {
    const orderData = {
        shipping_address: document.getElementById('address').value,
        payment_method: document.getElementById('payment-method').value,
        transaction_id: document.getElementById('transaction-id')?.value
    };
    
    const response = await API.Orders.checkout(orderData);
    
    if (response.ok) {
        showSuccessModal('Order placed successfully!');
        clearCart();
        setTimeout(() => {
            window.location.href = '/dashboard.html?tab=orders';
        }, 2000);
    }
}

// Dynamic payment field rendering
document.getElementById('payment-method').addEventListener('change', (e) => {
    const transactionField = document.getElementById('transaction-id-field');
    
    if (e.target.value === 'bkash') {
        transactionField.style.display = 'block';
    } else {
        transactionField.style.display = 'none';
    }
});
```

### Frontend Design Patterns

1. **Module Pattern**: JavaScript organized into logical modules
2. **Async/Await**: Modern promise handling
3. **Event Delegation**: Efficient event handling
4. **Template Literals**: Dynamic HTML generation
5. **Error Boundaries**: Graceful error handling

---

## 🚀 Installation & Setup

### Prerequisites

- **Python 3.8+**
- **pip** (Python package manager)
- **Modern web browser**
- **Git** (for cloning)

### Backend Setup

1. **Clone the Repository**
```bash
git clone https://github.com/NoshinStar/bibliobay-fullstack.git
cd bibliobay-fullstack/bibliobay_backend
```

2. **Create Virtual Environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure Database**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create Superuser**
```bash
python manage.py createsuperuser
# Follow prompts to create admin account
```

6. **Load Sample Data** (Optional)
```bash
python manage.py loaddata books/fixtures/sample_books.json
```

7. **Run Development Server**
```bash
python manage.py runserver
# Backend API: http://localhost:8000
# Admin Panel: http://localhost:8000/admin
```

### Frontend Setup

1. **Navigate to Frontend Directory**
```bash
cd ../BIBLIOBAY
```

2. **Update API Base URL**

Edit `js/api.js`:
```javascript
const API = {
    BASE_URL: 'http://localhost:8000/api/v1',  // Update if needed
    // ...
};
```

3. **Launch Frontend**

**Option A - Simple (File Protocol):**
```bash
# Just open index.html in your browser
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

**Option B - Local Server (Recommended):**
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080

# Then visit: http://localhost:8080
```

### Testing the Installation

1. **Backend Health Check**
```bash
curl http://localhost:8000/api/v1/books/
# Should return JSON list of books
```

2. **Frontend Access**
- Visit: `http://localhost:8080` (or your server address)
- Should see landing page with books

3. **Login Test**
- Navigate to login page
- Use test credentials or create account
- Should redirect to dashboard

---

## 🔐 Default Credentials

### Admin Access (Backend Django Admin)
```
URL: http://localhost:8000/admin
Username: bibliobay_user
Password: bibliobay_123
```

### Admin Access (Frontend Panel)
```
URL: http://localhost:8080/admin-login.html
Username: admin
Password: admin123
```

### Test Customer Account
```
Username: noshin 
Password: noshin123
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/v1/accounts/register/       # Register new user
POST   /api/v1/accounts/login/          # Login (get JWT tokens)
POST   /api/v1/accounts/refresh/        # Refresh access token
GET    /api/v1/accounts/profile/        # Get user profile
PUT    /api/v1/accounts/profile/        # Update profile
```

### Books
```
GET    /api/v1/books/                   # List all books
POST   /api/v1/books/                   # Create book (admin)
GET    /api/v1/books/{id}/              # Get book details
PUT    /api/v1/books/{id}/              # Update book (admin)
DELETE /api/v1/books/{id}/              # Delete book (admin)
GET    /api/v1/books/?search={query}    # Search books
GET    /api/v1/books/?category={id}     # Filter by category
```

### Cart & Orders
```
GET    /api/v1/orders/cart/             # Get current cart
POST   /api/v1/orders/cart/add/         # Add item to cart
PUT    /api/v1/orders/cart/update/{id}/ # Update cart item
DELETE /api/v1/orders/cart/remove/{id}/ # Remove from cart
POST   /api/v1/orders/checkout/         # Place order
GET    /api/v1/orders/                  # Get order history
GET    /api/v1/orders/{id}/             # Get order details
```

### Reviews
```
GET    /api/v1/reviews/                 # List all reviews
POST   /api/v1/reviews/                 # Create review
GET    /api/v1/reviews/{id}/            # Get review details
PUT    /api/v1/reviews/{id}/            # Update review
DELETE /api/v1/reviews/{id}/            # Delete review
GET    /api/v1/reviews/?book={id}       # Reviews for a book
```

### Blogs
```
GET    /api/v1/blogs/                   # List all blogs
POST   /api/v1/blogs/                   # Create blog (admin)
GET    /api/v1/blogs/{id}/              # Get blog details
PUT    /api/v1/blogs/{id}/              # Update blog (admin)
DELETE /api/v1/blogs/{id}/              # Delete blog (admin)
```

---

## 💡 Key Concepts Demonstrated

### Backend Concepts
- **RESTful API Design**: Standard HTTP methods and status codes
- **JWT Authentication**: Stateless, scalable authentication
- **Django ORM**: Database abstraction and querying
- **Serialization**: JSON data transformation
- **Permission Classes**: Role-based access control
- **CORS Handling**: Cross-origin resource sharing

### Frontend Concepts
- **API Integration**: Consuming RESTful endpoints
- **Token Management**: Storing and refreshing JWT tokens
- **Dynamic Rendering**: Client-side HTML generation
- **State Management**: Using localStorage for persistence
- **Event-Driven Programming**: User interaction handling
- **Responsive Design**: Mobile-first approach

### Full-Stack Integration
- **Decoupled Architecture**: Independent frontend and backend
- **Data Flow**: Client → API → Database → API → Client
- **Error Handling**: Graceful degradation across layers
- **Security**: Token-based authentication flow

---

## 🎯 Use Cases

### Educational
- Learn Django REST Framework
- Understand JWT authentication
- Practice API consumption
- Study fullstack architecture
- Implement CRUD operations
- Master async JavaScript

### Professional
- E-commerce platform template
- Bookstore management system
- Library catalog system
- Inventory management
- Order processing system

### Portfolio
- Demonstrate fullstack capabilities
- Showcase API design skills
- Exhibit responsive frontend
- Display database modeling
- Show authentication implementation

---

## 🔮 Future Enhancements

### Backend
- [ ] PostgreSQL/MySQL integration
- [ ] Redis caching layer
- [ ] Celery for async tasks
- [ ] Email notifications (SMTP)
- [ ] File upload for book covers
- [ ] Advanced search (Elasticsearch)
- [ ] Rate limiting (Django Throttle)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit tests (pytest-django)
- [ ] Docker containerization

### Frontend
- [ ] Progressive Web App (PWA)
- [ ] Service Worker (offline mode)
- [ ] Image lazy loading
- [ ] Pagination for book lists
- [ ] Advanced filtering UI
- [ ] Wishlist functionality
- [ ] Book recommendations
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Dark mode theme

### Features
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Real-time chat support
- [ ] Email verification
- [ ] Social media authentication
- [ ] Advanced analytics dashboard
- [ ] Export reports (PDF, CSV)
- [ ] Barcode scanning
- [ ] Inventory alerts
- [ ] Discount codes system
- [ ] Customer reviews moderation

---

## 📚 Documentation

### For Developers
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [JWT Authentication](https://django-rest-framework-simplejwt.readthedocs.io/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)

---

## 👨‍💻 Author

**Noshin Star**
- GitHub: [@NoshinStar](https://github.com/NoshinStar)

---

## 🙏 Acknowledgments

- Django & DRF communities for excellent documentation
- Bootstrap team for responsive framework
- Font Awesome for icon library
- All open-source contributors

---

## ⭐ Star This Repository

If you find this project helpful, please consider giving it a star! It helps others discover the project and motivates further development.

---

**Made with ❤️ by Noshin Star**

*Last Updated: February 2025*
