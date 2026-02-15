function checkAuth() {
    if (!AuthAPI.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    
    const user = AuthAPI.getCurrentUser();
    
    if (user) {
        const welcomeText = document.getElementById('userInfo');
        const subText = document.getElementById('userSubText');
        const badge = document.getElementById('memberBadge');

        // Check if user is a Member (Book Store Owner)
        if (user.role === 'member') {
            // Show Store Owner Name
            welcomeText.textContent = `Welcome, ${user.first_name || user.username}`;
            
            // Show Store Name
            if (user.address) {
                subText.innerHTML = `<strong>${user.address}</strong> (Book Store Account)`;
            }
            
            // Show Badge
            if (badge) badge.style.display = 'inline-block';
            
        } else {
            // Standard Customer
            welcomeText.textContent = `Welcome, ${user.username}`;
            if (badge) badge.style.display = 'none';
        }
    }
    return true;
}

function switchTab(tabName) {
    document.querySelectorAll('.cart-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav-pills .btn').forEach(btn => btn.className = 'btn btn-outline-primary');
    
    document.getElementById(`${tabName}-section`).style.display = 'block';
    document.getElementById(`tab-${tabName}`).className = 'btn btn-primary';

    if (tabName === 'cart') loadCart();
    else if (tabName === 'orders') loadOrders();
    else if (tabName === 'wishlist') loadWishlist();
}

async function loadCart() {
    try {
        const response = await CartAPI.getCart();
        const items = response.results || response;
        const tbody = document.querySelector('#cartTable tbody');
        tbody.innerHTML = '';
        
        if (items.length === 0) {
            document.getElementById('cartEmpty').style.display = 'block';
            document.querySelector('#cart-section .table-responsive').style.display = 'none';
            document.getElementById('cartTotal').textContent = '৳ 0.00';
            return;
        }
        
        document.getElementById('cartEmpty').style.display = 'none';
        document.querySelector('#cart-section .table-responsive').style.display = 'block';
        let total = 0;

        items.forEach(item => {
            total += parseFloat(item.subtotal);
            const img = item.book_image || './img/book-1.png';
            tbody.innerHTML += `
                <tr>
                    <td><div class="d-flex align-items-center"><img src="${img}" class="book-img me-2"><h6>${item.book_title}</h6></div></td>
                    <td>BDT ${item.book_price}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </td>
                    <td>BDT ${item.subtotal}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button></td>
                </tr>`;
        });
        document.getElementById('cartTotal').textContent = `BDT ${total.toFixed(2)}`;
    } catch (e) { console.error(e); }
}

async function updateQuantity(id, qty) {
    if (qty < 1) return removeFromCart(id);
    await CartAPI.updateCartItem(id, qty);
    loadCart();
}

async function removeFromCart(id) {
    if(confirm("Remove?")) { await CartAPI.removeFromCart(id); loadCart(); }
}

// --- WISHLIST ---
async function loadWishlist() {
    const response = await WishlistAPI.getAll();
    const items = response.results || response;
    const tbody = document.querySelector('#wishlistTable tbody');
    
    if (items.length === 0) {
        document.getElementById('wishlistEmpty').style.display = 'block';
        document.querySelector('#wishlist-section .table-responsive').style.display = 'none';
        return;
    }
    document.getElementById('wishlistEmpty').style.display = 'none';
    document.querySelector('#wishlist-section .table-responsive').style.display = 'block';
    tbody.innerHTML = '';

    items.forEach(item => {
        const img = item.book_image || './img/book-1.png';
        tbody.innerHTML += `
            <tr>
                <td><div class="d-flex align-items-center"><img src="${img}" class="book-img me-2"><h6>${item.book_title}</h6></div></td>
                <td>BDT ${item.book_price}</td>
                <td>
                    <button class="btn btn-sm btn-success me-2" onclick="moveWishlistToCart(${item.id}, ${item.book})"><i class="fas fa-cart-plus"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${item.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    });
}

async function moveWishlistToCart(wId, bId) {
    try {
        await CartAPI.addToCart(bId, 1);
        await WishlistAPI.remove(wId);
        alert("Moved to Cart!");
        loadWishlist();
    } catch(e) { alert(e.message); }
}

async function removeFromWishlist(id) {
    if(confirm("Remove?")) { await WishlistAPI.remove(id); loadWishlist(); }
}

// --- CHECKOUT ---
function openCheckoutModal() {
    if(document.getElementById('cartTotal').textContent === '৳ 0.00') return alert("Cart empty!");
    const user = AuthAPI.getCurrentUser();
    if(user?.address) document.getElementById('shipAddress').value = user.address;
    new bootstrap.Modal(document.getElementById('checkoutModal')).show();
}

function togglePaymentFields() {
    const isBkash = document.querySelector('input[name="paymentMethod"]:checked').value === 'bkash';
    document.getElementById('bkashDetails').style.display = isBkash ? 'block' : 'none';
}

async function submitOrder() {
    const address = document.getElementById('shipAddress').value;
    const method = document.querySelector('input[name="paymentMethod"]:checked').value;
    const trxId = document.getElementById('bkashTrxId').value;
    
    if(!address) return alert("Enter address");
    if(method === 'bkash' && !trxId) return alert("Enter TrxID");

    try {
        const order = await OrdersAPI.create({
            payment_method: method, shipping_address: address, shipping_city: 'Ctg',
            shipping_postal_code: '4000', shipping_country: 'BD', transaction_id: trxId
        });
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
        alert(`Order #${order.order_number} Placed!`);
        switchTab('orders');
    } catch(e) { alert(e.message); }
}

// --- ORDERS ---
async function loadOrders() {
    const response = await OrdersAPI.getAll();
    const list = document.getElementById('ordersList');
    const items = response.results || response;
    list.innerHTML = items.length ? '' : '<p class="text-center">No orders.</p>';

    items.forEach(o => {
        let badge = o.payment_method === 'bkash' ? '<span class="badge" style="background:#e2136e">bKash</span>' : '<span class="badge bg-secondary">COD</span>';
        let trx = o.transaction_id ? `<div style="font-size:0.8em; color:#e2136e">Trx: ${o.transaction_id}</div>` : '';
        
        list.innerHTML += `
            <div class="card mb-3 shadow-sm">
                <div class="card-header d-flex justify-content-between">
                    <div><strong>#${o.order_number}</strong> ${badge}</div>
                    <span class="badge bg-primary">${o.status}</span>
                </div>
                <div class="card-body">
                    ${trx}
                    <div class="fw-bold text-end">Total: BDT ${o.total}</div>
                </div>
            </div>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.includes('dashboard')) {
        if(checkAuth()) loadCart();
        document.getElementById('userLogoutBtn')?.addEventListener('click', () => { AuthAPI.logout(); window.location.href='index.html'; });
    }
});