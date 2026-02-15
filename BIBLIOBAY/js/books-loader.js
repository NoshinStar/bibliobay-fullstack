// js/books-loader.js

const escapeHtml = (unsafe) => {
    return unsafe.replace(/'/g, "\\'").replace(/"/g, '&quot;');
};

// --- IMAGE MAPPING CONFIGURATION ---
const bookImages = {
    // Bangla Books
    "অপেক্ষা": "./img/b-1.png",
    "কোথাও কেউ নেই": "./img/b-2.png",
    "প্রথম আলো": "./img/b-3.webp",
    "জোছনা ও জননীর গল্প": "./img/book-14.webp",
    "সংশপ্তক": "./img/book-6.webp",

    // English Classics / Popular
    "Harry Potter": "./img/book-1.png",
    "A Tale Of Two Cities": "./img/book-2.webp",
    "Crime and Punishment": "./img/book-3.png",
    "Pride and Prejudice": "./img/book-4.webp",
    "White Nights": "./img/book-5.webp",

    // New Releases
    "The Diary of a Young Girl": "./img/n-1.webp",
    "Man's Search for Meaning": "./img/n-2.webp",
    "1984": "./img/n-3.webp",
    "Where the Crawdads Sing": "./img/n-4.webp",
    "Nothing Lasts Forever": "./img/n-5.webp",
    "Dreams From My Father": "./img/n-6.webp",
    "The Brothers Karamazov": "./img/n-7.webp",
    "The Da Vinci Code": "./img/n-8.webp",
    "Angels & Demons": "./img/n-9.webp",
    "The Idiot": "./img/n-10.webp"
};

// Helper to get image
function getBookImage(book) {
    if (book.cover_image) return book.cover_image;
    if (bookImages[book.title]) return bookImages[book.title];
    return './img/book-1.png';
}

// 1. HTML Generator
function createBookHTML(book) {
    const imageUrl = getBookImage(book);
    const price = book.price ? `BDT ${parseFloat(book.price).toFixed(2)}` : 'BDT 0.00';
    const originalPrice = book.original_price ? `BDT ${parseFloat(book.original_price).toFixed(2)}` : '';
    const safeTitle = escapeHtml(book.title);

    return `
        <div class="swiper-slide box">
            <div class="icons">
                <a href="javascript:void(0)" class="fas fa-search"></a>
                <a href="javascript:void(0)" class="fas fa-heart" onclick="addToWishlist(event, ${book.id}, '${safeTitle}')"></a>
                <a href="javascript:void(0)" class="fas fa-eye"></a>
            </div>
            <div class="image">
                <img src="${imageUrl}" alt="${book.title}" onerror="this.src='./img/book-1.png'">
            </div>
            <div class="content">
                <h3>${book.title}</h3>
                <div class="price">${price} ${originalPrice ? `<span>${originalPrice}</span>` : ''}</div>
                <button type="button" class="btn" onclick="addToCart(event, ${book.id}, '${safeTitle}')">Add to Cart</button>
            </div>
        </div>
    `;
}

// 2. New Book HTML
function createNewBookHTML(book) {
    const imageUrl = getBookImage(book);
    const price = book.price ? `BDT ${parseFloat(book.price).toFixed(2)}` : 'BDT 0.00';
    const safeTitle = escapeHtml(book.title);
    
    return `
        <div class="swiper-slide box">
            <div class="image">
                <img src="${imageUrl}" alt="${book.title}" onerror="this.src='./img/n-1.webp'">
            </div>
            <div class="content">
                <h3>${book.title}</h3>
                <div class="price">${price}</div>
                <div class="stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                </div>
                <button type="button" class="btn" style="margin-top: 10px;" onclick="addToCart(event, ${book.id}, '${safeTitle}')">Add to Cart</button>
            </div>
        </div>
    `;
}

// 3. Add to Cart
async function addToCart(event, bookId, bookTitle) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    if (!AuthAPI.isAuthenticated()) {
        if (confirm('Please login to add items to cart.')) window.location.href = 'login.html';
        return;
    }
    try {
        await CartAPI.addToCart(bookId, 1);
        if (confirm(`Successfully added "${bookTitle}" to cart!\n\nClick OK to Checkout.`)) window.location.href = './dashboard.html';
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

// 4. Add to Wishlist
async function addToWishlist(event, bookId, bookTitle) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    if (!AuthAPI.isAuthenticated()) {
        if (confirm('Please login to use Wishlist.')) window.location.href = 'login.html';
        return;
    }
    try {
        const response = await WishlistAPI.add(bookId);
        if (response.message && response.message.includes('Already')) {
            alert(`"${bookTitle}" is already in your Wishlist.`);
            return;
        }
        if (confirm(`Added "${bookTitle}" to Wishlist!\n\nView Wishlist?`)) window.location.href = './dashboard.html';
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

// 5. Load Books (Initial Load)
async function loadBooks() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/books/');
        const data = await response.json();
        const books = data.results || data;

        const popularWrapper = document.querySelector('.popular-slider .swiper-wrapper');
        const newWrapper1 = document.querySelector('.new-slider .swiper-wrapper');
        const newWrapper2 = document.querySelector('.new-slider-2 .swiper-wrapper');

        // Clear
        if (popularWrapper) popularWrapper.innerHTML = '';
        if (newWrapper1) newWrapper1.innerHTML = '';
        if (newWrapper2) newWrapper2.innerHTML = '';

        // Inject
        if (popularWrapper) popularWrapper.innerHTML = books.slice(0, 10).map(createBookHTML).join('');
        if (newWrapper1) newWrapper1.innerHTML = books.slice(0, 5).map(createNewBookHTML).join('');
        if (newWrapper2) newWrapper2.innerHTML = books.slice(5, 10).map(createNewBookHTML).join('');

        // FIX: Add delay to allow rendering before starting sliders
        setTimeout(() => {
            initSwipers();
        }, 100);

    } catch (error) { console.error('Book load error:', error); }
}

// 6. Load Categories
async function loadCategories() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/categories/');
        const data = await response.json();
        const categories = data.results || data;
        
        const select = document.getElementById('category-select');
        if(!select) return;

        select.innerHTML = '<option value="">All Genres</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.name;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) { console.error('Category load error:', error); }
}

// 7. Handle Search
async function handleSearch(e) {
    if(e) e.preventDefault();
    
    const query = document.getElementById('search-box').value.trim();
    const category = document.getElementById('category-select').value;

    if (!query && !category) {
        alert("Please enter a name or select a category.");
        return;
    }

    let url = `http://127.0.0.1:8000/api/v1/books/?`;
    if (query) url += `search=${query}&`;
    if (category) url += `category=${category}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results || data;

        document.querySelector('.new').style.display = 'none';
        
        const sectionTitle = document.querySelector('.popular .heading span');
        let titleText = "Results";
        if (query) titleText += ` for "${query}"`;
        if (category) titleText += ` in ${category}`;
        sectionTitle.textContent = titleText;

        const wrapper = document.querySelector('.popular-slider .swiper-wrapper');
        wrapper.innerHTML = '';

        if (results.length === 0) {
            wrapper.innerHTML = `<div style="width:100%; text-align:center; padding:50px; font-size:1.5rem;">No books found.</div>`;
        } else {
            wrapper.innerHTML = results.map(createBookHTML).join('');
        }

        setTimeout(() => { initSwipers(); }, 100);
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        
        const searchForm = document.querySelector('.search-form');
        if(searchForm.classList.contains('active')) searchForm.classList.remove('active');

    } catch (error) { console.error("Search error:", error); }
}

// 8. Initialize Swipers
function initSwipers() {
    const reInit = (selector, instanceName, options) => {
        const el = document.querySelector(selector);
        if(!el) return;
        
        // Destroy existing instance safely
        if(window[instanceName]) {
            try { 
                if(typeof window[instanceName].destroy === 'function') {
                    window[instanceName].destroy(true, true); 
                }
            } catch(e) {}
        }
        
        // Create new instance
        window[instanceName] = new Swiper(selector, options);
    };

    // --- 1. HERO SECTION SLIDER (The one on the stand) ---
    reInit(".books-slider", "booksSwiper", {
        loop: true,
        centeredSlides: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // --- 2. POPULAR SLIDER ---
    reInit(".popular-slider", "popularSwiper", {
        spaceBetween: 10, loop: true, centeredSlides: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: { 0: { slidesPerView: 1 }, 450: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } },
    });

    // --- 3. NEW RELEASES SLIDER 1 ---
    reInit(".new-slider", "newSwiper", {
        spaceBetween: 10, loop: true, centeredSlides: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });

    // --- 4. NEW RELEASES SLIDER 2 ---
    reInit(".new-slider-2", "newSwiper2", {
        spaceBetween: 10, loop: true, centeredSlides: true,
        autoplay: { delay: 6000, disableOnInteraction: false },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    loadCategories();
    const searchForm = document.querySelector('.search-form');
    if (searchForm) searchForm.addEventListener('submit', handleSearch);
});