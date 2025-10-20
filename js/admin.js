// Admin Panel JavaScript

// Admin Password
const ADMIN_PASSWORD = 'RAVIRAJ@721933';

// Load data from localStorage
let orders = JSON.parse(localStorage.getItem('rssOrders')) || [];
let allOrders = [...orders]; // For filtering

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if admin is logged in
    checkAdminLogin();

    // Setup login form
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);

    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadDashboard();
    loadRecentOrders();

    // Setup form handler
    document.getElementById('addProductForm').addEventListener('submit', handleAddProduct);
});

// Check Admin Login Status
function checkAdminLogin() {
    const isLoggedIn = sessionStorage.getItem('rssAdminLoggedIn');

    if (isLoggedIn === 'true') {
        // Show admin panel
        showAdminPanel();
    } else {
        // Show login screen
        showLoginScreen();
    }
}

// Show Login Screen
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminLayout').classList.remove('active');
    document.getElementById('adminPassword').focus();
}

// Show Admin Panel
function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminLayout').classList.add('active');
    loadDashboard();
    loadRecentOrders();
}

// Handle Admin Login
function handleAdminLogin(e) {
    e.preventDefault();

    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('loginError');

    if (password === ADMIN_PASSWORD) {
        // Correct password
        sessionStorage.setItem('rssAdminLoggedIn', 'true');
        errorDiv.style.display = 'none';
        document.getElementById('adminPassword').value = '';
        showAdminPanel();
    } else {
        // Wrong password
        errorDiv.style.display = 'block';
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminPassword').focus();

        // Shake animation
        errorDiv.style.animation = 'shake 0.5s';
        setTimeout(() => {
            errorDiv.style.animation = '';
        }, 500);
    }
}

// Admin Logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('rssAdminLoggedIn');
        showLoginScreen();
    }
}

// Update Date Time
function updateDateTime() {
    const now = new Date();
    document.getElementById('currentDateTime').textContent = now.toLocaleString();
}

// Show Section
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));

    // Show selected section
    document.getElementById(section + '-section').classList.remove('hidden');

    // Update active menu
    document.querySelectorAll('.sidebar-menu a[data-section]').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('data-section') === section) {
            a.classList.add('active');
        }
    });

    // Load data for section
    switch(section) {
        case 'dashboard':
            loadDashboard();
            loadRecentOrders();
            break;
        case 'orders':
            loadAllOrders();
            break;
        case 'products':
            loadAllProducts();
            break;
        case 'customers':
            loadCustomers();
            break;
    }
}

// Load Dashboard Statistics
function loadDashboard() {
    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = products.length;

    // Get unique customers
    const uniqueCustomers = new Set(orders.map(order => order.address.phone));
    const totalCustomers = uniqueCustomers.size;

    // Update statistics
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toLocaleString();
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalCustomers').textContent = totalCustomers;
}

// Load Recent Orders (Last 5)
function loadRecentOrders() {
    const recentOrders = orders.slice(-5).reverse();
    const tableContainer = document.getElementById('recentOrdersTable');

    if (recentOrders.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No orders yet</p>';
        return;
    }

    let table = '<table class="data-table"><thead><tr>';
    table += '<th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th>';
    table += '</tr></thead><tbody>';

    recentOrders.forEach(order => {
        table += `<tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.address.fullName}<br><small>${order.address.phone}</small></td>
            <td>${order.dateTime || order.date}</td>
            <td class="order-items-list">${order.items.length} item(s)</td>
            <td><strong>₹${order.total}</strong></td>
            <td><span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span></td>
            <td>
                <button class="btn-action btn-view" onclick="viewOrderDetail('${order.id}')">View</button>
                <button class="btn-action btn-edit" onclick="updateOrderStatus('${order.id}')">Update</button>
            </td>
        </tr>`;
    });

    table += '</tbody></table>';
    tableContainer.innerHTML = table;
}

// Load All Orders
function loadAllOrders() {
    allOrders = [...orders].reverse();
    displayOrders(allOrders);
}

// Display Orders
function displayOrders(ordersToDisplay) {
    const tableContainer = document.getElementById('allOrdersTable');

    if (ordersToDisplay.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No orders found</p>';
        return;
    }

    let table = '<table class="data-table"><thead><tr>';
    table += '<th>Order ID</th><th>Customer Info</th><th>Date & Time</th><th>Items</th><th>Payment</th><th>Total</th><th>Status</th><th>Actions</th>';
    table += '</tr></thead><tbody>';

    ordersToDisplay.forEach(order => {
        const itemsList = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
        table += `<tr>
            <td><strong>${order.id}</strong></td>
            <td>
                <strong>${order.address.fullName}</strong><br>
                <small>${order.address.phone}</small><br>
                <small style="color: var(--text-secondary);">${order.address.city}, ${order.address.state}</small>
            </td>
            <td>${order.dateTime || order.date}</td>
            <td class="order-items-list" title="${itemsList}">${order.items.length} item(s)</td>
            <td><small>${order.paymentMethod.toUpperCase()}</small></td>
            <td><strong>₹${order.total.toLocaleString()}</strong></td>
            <td><span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span></td>
            <td>
                <button class="btn-action btn-view" onclick="viewOrderDetail('${order.id}')">View</button>
                <button class="btn-action btn-edit" onclick="updateOrderStatus('${order.id}')">Update</button>
            </td>
        </tr>`;
    });

    table += '</tbody></table>';
    tableContainer.innerHTML = table;
}

// Filter Orders
function filterOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const statusFilter = document.getElementById('orderStatusFilter').value;

    let filtered = orders;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(order =>
            order.id.toLowerCase().includes(searchTerm) ||
            order.address.fullName.toLowerCase().includes(searchTerm) ||
            order.address.phone.includes(searchTerm)
        );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
        filtered = filtered.filter(order => order.status === statusFilter);
    }

    displayOrders(filtered.reverse());
}

// View Order Detail
function viewOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    let detail = `
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${order.dateTime || order.date}</p>
        <hr>
        <h4>Customer Information</h4>
        <p><strong>Name:</strong> ${order.address.fullName}</p>
        <p><strong>Phone:</strong> ${order.address.phone}</p>
        <p><strong>Address:</strong> ${order.address.address}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}</p>
        <hr>
        <h4>Order Items</h4>
        <ul>
        ${order.items.map(item => `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}</li>`).join('')}
        </ul>
        <hr>
        <h4>Payment Information</h4>
        <p><strong>Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
        ${order.paymentDetails && order.paymentDetails.transactionId ? `<p><strong>Transaction ID:</strong> ${order.paymentDetails.transactionId}</p>` : ''}
        ${order.paymentDetails && order.paymentDetails.personName ? `<p><strong>Paid to:</strong> ${order.paymentDetails.personName} (${order.paymentDetails.personUPI})</p>` : ''}
        <hr>
        <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
        <p><strong>Shipping:</strong> ₹${order.shipping}</p>
        <p><strong>Total Amount:</strong> <span style="font-size: 20px; color: var(--success-color);">₹${order.total}</span></p>
        <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span></p>
    `;

    alert(detail.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')); // Simple alert for now
    // In production, use a modal
}

// Update Order Status
function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const newStatus = prompt(`Update order status for ${orderId}\n\nCurrent: ${order.status}\n\nEnter new status:\n- confirmed\n- shipped\n- delivered\n- cancelled`, order.status);

    if (newStatus && ['confirmed', 'shipped', 'delivered', 'cancelled'].includes(newStatus.toLowerCase())) {
        order.status = newStatus.toLowerCase();
        localStorage.setItem('rssOrders', JSON.stringify(orders));
        showSuccessMessage('Order status updated successfully!');
        loadAllOrders();
        loadDashboard();
    } else if (newStatus) {
        alert('Invalid status! Please use: confirmed, shipped, delivered, or cancelled');
    }
}

// Refresh Orders
function refreshOrders() {
    orders = JSON.parse(localStorage.getItem('rssOrders')) || [];
    loadAllOrders();
    showSuccessMessage('Orders refreshed!');
}

// Load All Products
function loadAllProducts() {
    displayProducts(products);
}

// Display Products
function displayProducts(productsToDisplay) {
    const tableContainer = document.getElementById('allProductsTable');

    if (productsToDisplay.length === 0) {
        tableContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No products found</p>';
        return;
    }

    let table = '<table class="data-table"><thead><tr>';
    table += '<th>Image</th><th>Product Name</th><th>Category</th><th>Price</th><th>Rating</th><th>Stock</th><th>Actions</th>';
    table += '</tr></thead><tbody>';

    productsToDisplay.forEach(product => {
        table += `<tr>
            <td><img src="${product.image}" class="product-image-small" onerror="this.src='https://via.placeholder.com/50x50?text=RSS'"></td>
            <td><strong>${product.name}</strong><br><small style="color: var(--text-secondary);">${product.description.substring(0, 50)}...</small></td>
            <td>${product.category}</td>
            <td><strong>₹${product.price}</strong><br><small style="text-decoration: line-through; color: var(--text-secondary);">₹${product.originalPrice}</small></td>
            <td>${product.rating} ⭐ (${product.reviews})</td>
            <td><span style="color: var(--success-color);">In Stock</span></td>
            <td>
                <button class="btn-action btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-action btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>`;
    });

    table += '</tbody></table>';
    tableContainer.innerHTML = table;
}

// Filter Products
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('productCategoryFilter').value;

    let filtered = products;

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }

    displayProducts(filtered);
}

// Handle Add Product
function handleAddProduct(e) {
    e.preventDefault();

    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        originalPrice: parseInt(document.getElementById('productOriginalPrice').value),
        discount: Math.round(((parseInt(document.getElementById('productOriginalPrice').value) - parseInt(document.getElementById('productPrice').value)) / parseInt(document.getElementById('productOriginalPrice').value)) * 100) + '% off',
        rating: parseFloat(document.getElementById('productRating').value),
        reviews: parseInt(document.getElementById('productReviews').value),
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        features: document.getElementById('productFeatures').value.split(',').map(f => f.trim()),
        sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim())
    };

    products.push(newProduct);
    saveProducts();

    // Show success message
    showSuccessMessage('Product added successfully!');

    // Reset form
    document.getElementById('addProductForm').reset();

    // Update dashboard
    loadDashboard();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Edit Product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Switch to add product section
    showSection('add-product');

    // Fill form with product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice;
    document.getElementById('productRating').value = product.rating;
    document.getElementById('productReviews').value = product.reviews;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productFeatures').value = product.features.join(', ');
    document.getElementById('productSizes').value = product.sizes.join(', ');

    // Change form to edit mode
    const form = document.getElementById('addProductForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Product';

    // Remove old submit handler and add new one
    form.onsubmit = (e) => {
        e.preventDefault();

        // Update product
        product.name = document.getElementById('productName').value;
        product.category = document.getElementById('productCategory').value;
        product.price = parseInt(document.getElementById('productPrice').value);
        product.originalPrice = parseInt(document.getElementById('productOriginalPrice').value);
        product.discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) + '% off';
        product.rating = parseFloat(document.getElementById('productRating').value);
        product.reviews = parseInt(document.getElementById('productReviews').value);
        product.image = document.getElementById('productImage').value;
        product.description = document.getElementById('productDescription').value;
        product.features = document.getElementById('productFeatures').value.split(',').map(f => f.trim());
        product.sizes = document.getElementById('productSizes').value.split(',').map(s => s.trim());

        saveProducts();
        showSuccessMessage('Product updated successfully!');

        // Reset form
        form.reset();
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Product';
        form.onsubmit = handleAddProduct;

        // Go back to products
        showSection('products');
    };
}

// Delete Product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === id);
        if (index > -1) {
            products.splice(index, 1);
            saveProducts();
            showSuccessMessage('Product deleted successfully!');
            loadAllProducts();
            loadDashboard();
        }
    }
}

// Load Customers
function loadCustomers() {
    const customersContainer = document.getElementById('customersTable');

    if (orders.length === 0) {
        customersContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No customers yet</p>';
        return;
    }

    // Get unique customers from orders
    const customerMap = new Map();
    orders.forEach(order => {
        const key = order.address.phone;
        if (!customerMap.has(key)) {
            customerMap.set(key, {
                name: order.address.fullName,
                phone: order.address.phone,
                city: order.address.city,
                state: order.address.state,
                orders: 1,
                totalSpent: order.total,
                lastOrder: order.dateTime || order.date
            });
        } else {
            const customer = customerMap.get(key);
            customer.orders++;
            customer.totalSpent += order.total;
            customer.lastOrder = order.dateTime || order.date;
        }
    });

    const customers = Array.from(customerMap.values());

    let table = '<table class="data-table"><thead><tr>';
    table += '<th>Customer Name</th><th>Phone</th><th>Location</th><th>Total Orders</th><th>Total Spent</th><th>Last Order</th>';
    table += '</tr></thead><tbody>';

    customers.forEach(customer => {
        table += `<tr>
            <td><strong>${customer.name}</strong></td>
            <td>${customer.phone}</td>
            <td>${customer.city}, ${customer.state}</td>
            <td>${customer.orders}</td>
            <td><strong>₹${customer.totalSpent.toLocaleString()}</strong></td>
            <td>${customer.lastOrder}</td>
        </tr>`;
    });

    table += '</tbody></table>';
    customersContainer.innerHTML = table;
}

// Show Success Message
function showSuccessMessage(message) {
    const successMsg = document.getElementById('successMsg');
    document.getElementById('successMsgText').textContent = message;
    successMsg.style.display = 'flex';

    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}
