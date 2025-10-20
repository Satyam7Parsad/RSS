// State Management
let cart = [];
let orders = [];
let currentUser = null;
let currentCategory = 'all';
let currentProduct = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadOrders();
    loadUser();
    displayProducts();
    initializeEventListeners();
    startBannerSlider();
    updateCartCount();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('rssCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('rssCart', JSON.stringify(cart));
    updateCartCount();
}

// Load orders from localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('rssOrders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Save orders to localStorage
function saveOrders() {
    localStorage.setItem('rssOrders', JSON.stringify(orders));
}

// Load user from localStorage
function loadUser() {
    const savedUser = localStorage.getItem('rssUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Save user to localStorage
function saveUser() {
    localStorage.setItem('rssUser', JSON.stringify(currentUser));
}

// Banner Slider
let currentSlide = 0;
function startBannerSlider() {
    setInterval(() => {
        const slides = document.querySelectorAll('.banner-slide');
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

document.querySelector('.banner-next').addEventListener('click', () => {
    const slides = document.querySelectorAll('.banner-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
});

document.querySelector('.banner-prev').addEventListener('click', () => {
    const slides = document.querySelectorAll('.banner-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
});

// Event Listeners
function initializeEventListeners() {
    // Category navigation
    document.querySelectorAll('.nav-menu a, .category-card').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.getAttribute('data-category');
            filterByCategory(category);

            // Update active state for nav links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            if (e.target.tagName === 'A') {
                e.target.classList.add('active');
            }
        });
    });

    // Sort filter
    document.getElementById('sortFilter').addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });

    document.querySelector('.search-btn').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchInput').value;
        searchProducts(searchTerm);
    });

    // Modal buttons
    document.getElementById('loginBtn').addEventListener('click', () => {
        openModal('loginModal');
    });

    document.getElementById('cartBtn').addEventListener('click', () => {
        displayCart();
        openModal('cartModal');
    });

    document.getElementById('ordersBtn').addEventListener('click', () => {
        displayOrders();
        openModal('ordersModal');
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        closeModal('cartModal');
        displayCheckout();
        openModal('checkoutModal');
    });

    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);

    document.getElementById('loginSubmit').addEventListener('click', handleLogin);

    // Payment method change
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Hide all payment details
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });

            // Show selected payment details
            if (e.target.value === 'upi') {
                document.getElementById('upiDetails').style.display = 'block';
                generateQR();
            } else if (e.target.value === 'other') {
                document.getElementById('otherPersonDetails').style.display = 'block';
            }
        });
    });

    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Display Products
function displayProducts(productsToDisplay = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        grid.innerHTML = '<div class="empty-cart"><i class="fas fa-box-open"></i><p>No products found</p></div>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=RSS+Product'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <span class="rating-badge">${product.rating} <i class="fas fa-star"></i></span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount">${product.discount}</span>
                </div>
                <div class="product-buttons">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow(${product.id})">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;

        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('.product-buttons')) {
                showProductDetail(product);
            }
        });

        grid.appendChild(productCard);
    });
}

// Filter by Category
function filterByCategory(category) {
    currentCategory = category;
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Sort Products
function sortProducts(sortBy) {
    let sorted = [...products];
    if (currentCategory !== 'all') {
        sorted = sorted.filter(p => p.category === currentCategory);
    }

    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'popular':
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
    }

    displayProducts(sorted);
}

// Search Products
function searchProducts(term) {
    const searchTerm = term.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
}

// Show Product Detail
function showProductDetail(product) {
    currentProduct = product;
    const detail = document.getElementById('productDetail');
    detail.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-detail-image" onerror="this.src='https://via.placeholder.com/400x400?text=RSS+Product'">
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-rating">
                <span class="rating-badge">${product.rating} <i class="fas fa-star"></i></span>
                <span class="rating-count">(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="current-price">₹${product.price}</span>
                <span class="original-price">₹${product.originalPrice}</span>
                <span class="discount">${product.discount}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <h4>Select Size:</h4>
            <div class="size-selector">
                ${product.sizes.map(size => `<button class="size-btn" onclick="selectSize(this)">${size}</button>`).join('')}
            </div>
            <h4>Features:</h4>
            <ul class="product-features">
                ${product.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
            <div class="product-buttons" style="display: flex; gap: 10px;">
                <button class="btn-add-cart" style="flex: 1;" onclick="addToCart(${product.id});">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn-buy-now" style="flex: 1;" onclick="buyNow(${product.id});">
                    <i class="fas fa-bolt"></i> Buy Now
                </button>
            </div>
        </div>
    `;
    openModal('productModal');
}

// Select Size
function selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    showNotification('Added to cart!');
}

// Buy Now - Direct Checkout
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Close any open modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });

    // Create temporary cart with single item
    const tempCart = [{ ...product, quantity: 1 }];

    // Display checkout with this single product
    displayBuyNowCheckout(tempCart);
    openModal('checkoutModal');
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';
        updateCartSummary();
        return;
    }

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80?text=RSS'">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartSummary();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        displayCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0;
    const total = subtotal + shipping;

    document.getElementById('cartSubtotal').textContent = '₹' + subtotal;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
    document.getElementById('cartTotal').textContent = '₹' + total;
}

// Display Checkout
function displayCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = '';

    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal + shipping;

    document.getElementById('checkoutTotal').textContent = '₹' + total;

    // Store checkout type
    sessionStorage.setItem('checkoutType', 'cart');

    // Show UPI details by default
    document.getElementById('upiDetails').style.display = 'block';
    generateQR();
}

// Display Buy Now Checkout
function displayBuyNowCheckout(tempCart) {
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = '';

    tempCart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });

    const subtotal = tempCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal + shipping;

    document.getElementById('checkoutTotal').textContent = '₹' + total;

    // Store temporary cart and checkout type
    sessionStorage.setItem('tempCart', JSON.stringify(tempCart));
    sessionStorage.setItem('checkoutType', 'buynow');

    // Show UPI details by default
    document.getElementById('upiDetails').style.display = 'block';
    generateQR();
}

// Generate QR Code
function generateQR() {
    const qrCode = document.getElementById('qrCode');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total > 1000 ? 0 : 50;
    const finalTotal = total + shipping;

    // Simple QR code placeholder
    qrCode.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <i class="fas fa-qrcode" style="font-size: 100px; color: var(--primary-color);"></i>
            <p style="margin-top: 10px; font-size: 12px;">Scan to pay ₹${finalTotal}</p>
            <p style="font-size: 10px; color: var(--text-secondary);">UPI ID: 7219336925@ybl</p>
        </div>
    `;
}

// Place Order
function placeOrder() {
    // Validate address
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;

    if (!fullName || !phone || !address || !city || !state || !pincode) {
        alert('Please fill all address fields!');
        return;
    }

    // Validate phone number
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }

    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Validate payment details
    if (paymentMethod === 'upi') {
        const transactionId = document.getElementById('upiTransactionId').value;
        if (!transactionId) {
            alert('Please enter UPI transaction ID!');
            return;
        }
    } else if (paymentMethod === 'other') {
        const otherPersonName = document.getElementById('otherPersonName').value;
        const otherPersonUPI = document.getElementById('otherPersonUPI').value;
        const otherPersonPhone = document.getElementById('otherPersonPhone').value;
        if (!otherPersonName || !otherPersonUPI || !otherPersonPhone) {
            alert('Please fill all payment details!');
            return;
        }
    }

    // Get checkout type and items
    const checkoutType = sessionStorage.getItem('checkoutType');
    let orderItems;

    if (checkoutType === 'buynow') {
        // Buy Now checkout - get items from temp cart
        orderItems = JSON.parse(sessionStorage.getItem('tempCart'));
    } else {
        // Regular cart checkout
        orderItems = [...cart];
    }

    // Create order
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal + shipping;

    const order = {
        id: 'RSS' + Date.now(),
        date: new Date().toLocaleDateString(),
        dateTime: new Date().toLocaleString(),
        items: orderItems,
        address: {
            fullName,
            phone,
            address,
            city,
            state,
            pincode
        },
        paymentMethod,
        paymentDetails: paymentMethod === 'upi' ? {
            transactionId: document.getElementById('upiTransactionId').value,
            upiId: '7219336925@ybl'
        } : paymentMethod === 'other' ? {
            personName: document.getElementById('otherPersonName').value,
            personUPI: document.getElementById('otherPersonUPI').value,
            personPhone: document.getElementById('otherPersonPhone').value
        } : {},
        subtotal,
        shipping,
        total,
        status: 'confirmed'
    };

    orders.push(order);
    saveOrders();

    // Clear cart only if it was cart checkout
    if (checkoutType === 'cart') {
        cart = [];
        saveCart();
    }

    // Clear session storage
    sessionStorage.removeItem('tempCart');
    sessionStorage.removeItem('checkoutType');

    // Close checkout modal
    closeModal('checkoutModal');

    // Show success message
    document.getElementById('orderId').textContent = order.id;
    openModal('successModal');

    // Clear form
    document.getElementById('fullName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('pincode').value = '';
    document.getElementById('upiTransactionId').value = '';
    document.getElementById('otherPersonName').value = '';
    document.getElementById('otherPersonUPI').value = '';
    document.getElementById('otherPersonPhone').value = '';
}

// Display Orders
function displayOrders() {
    const ordersList = document.getElementById('ordersList');

    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="empty-cart"><i class="fas fa-box"></i><p>No orders yet</p></div>';
        return;
    }

    ordersList.innerHTML = '';
    orders.reverse().forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">Order ID: ${order.id}</div>
                    <div class="order-date">${order.date}</div>
                </div>
                <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='https://via.placeholder.com/60x60?text=RSS'">
                        <div class="order-item-info">
                            <div class="order-item-name">${item.name}</div>
                            <div class="order-item-qty">Quantity: ${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <span>Total Amount:</span>
                <span>₹${order.total}</span>
            </div>
        `;
        ordersList.appendChild(orderCard);
    });
}

// Handle Login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please enter email and password!');
        return;
    }

    // Simple login (in real app, this would be server-side)
    currentUser = {
        email,
        name: email.split('@')[0]
    };

    saveUser();
    closeModal('loginModal');
    showNotification('Login successful!');
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// View Order from Success Modal
document.getElementById('viewOrderBtn').addEventListener('click', () => {
    closeModal('successModal');
    displayOrders();
    openModal('ordersModal');
});
