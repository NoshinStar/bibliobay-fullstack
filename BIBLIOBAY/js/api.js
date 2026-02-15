// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const API = {
    getToken() { return localStorage.getItem('access_token'); },
    setToken(token) { localStorage.setItem('access_token', token); },
    removeToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('currentUser');
    },
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

            if (response.status === 204) return null;

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                
                if (!response.ok) {
                    // FIX: Convert JSON error object to a clean string immediately
                    let errorMessage = 'API request failed';
                    if (data.detail) {
                        errorMessage = data.detail;
                    } else if (typeof data === 'object') {
                        // Turns {"username": ["Exists"]} into "username: Exists"
                        errorMessage = Object.entries(data)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join('\n');
                    }
                    throw new Error(errorMessage);
                }
                return data;
            } else {
                throw new Error(`Server Error (${response.status})`);
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    async get(endpoint) { return this.request(endpoint, { method: 'GET' }); },
    async post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); },
    async patch(endpoint, data) { return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }); },
    async delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); },
};

// --- Authentication API ---
// --- Authentication API ---
const AuthAPI = {
    // UPDATED: Added 'extraData' parameter to handle Role and Store Name
    async register(username, email, password, password2, extraData = {}) {
        API.removeToken(); 
        
        // Merge basic info with extra data (like role='member', address='Store Name')
        const payload = { 
            username, 
            email, 
            password, 
            password2,
            ...extraData 
        };

        const response = await API.post('/auth/register/', payload);
        
        // Save Token immediately
        if (response.tokens) {
            API.setToken(response.tokens.access);
            localStorage.setItem('refresh_token', response.tokens.refresh);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        return response;
    },

    async login(username, password) {
        API.removeToken();
        const response = await API.post('/auth/login/', { username, password });
        if (response.tokens) {
            API.setToken(response.tokens.access);
            localStorage.setItem('refresh_token', response.tokens.refresh);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        return response;
    },

    async logout() { API.removeToken(); },
    
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated() { return !!API.getToken(); },
};

const CartAPI = {
    async getCart() { return API.get('/cart/'); },
    async addToCart(bookId, quantity = 1) { return API.post('/cart/', { book: bookId, quantity: quantity }); },
    async updateCartItem(cartItemId, quantity) { return API.patch(`/cart/${cartItemId}/`, { quantity: quantity }); },
    async removeFromCart(cartItemId) { return API.delete(`/cart/${cartItemId}/`); },
};

const WishlistAPI = {
    async getAll() { return API.get('/wishlist/'); },
    async add(bookId) { return API.post('/wishlist/', { book: bookId }); },
    async remove(itemId) { return API.delete(`/wishlist/${itemId}/`); },
};

const OrdersAPI = {
    async getAll() { return API.get('/orders/'); },
    async create(orderData) { return API.post('/orders/', orderData); },
};

const ReviewsAPI = {
    async getAll(params = {}) { return API.get(`/reviews/?${new URLSearchParams(params)}`); },
};

const BlogsAPI = {
    async getAll(params = {}) { return API.get(`/blogs/?${new URLSearchParams(params)}`); },
};