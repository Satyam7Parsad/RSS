# RSS E-Commerce Website

A modern, fully-functional e-commerce website for RSS Clothing Brand.

## Features

### Customer Features
- ✅ Modern and responsive UI
- ✅ 20 pre-loaded clothing products
- ✅ Product categories (Men's, Women's, Kids, Ethnic, Western, Accessories)
- ✅ Shopping cart functionality
- ✅ Product search and filters
- ✅ Sort by price, rating, popularity
- ✅ Product detail pages
- ✅ Complete checkout process
- ✅ Multiple payment options:
  - UPI Payment (7219336925@ybl)
  - Cash on Delivery
  - Credit/Debit Card
  - Pay to Another Person (custom UPI/phone)
- ✅ Order tracking and history
- ✅ User authentication
- ✅ Responsive design for all devices

### Admin Features
- ✅ **Secure login system with password protection**
- ✅ Password: RAVIRAJ@721933
- ✅ Session-based authentication
- ✅ Dashboard with statistics (Orders, Revenue, Products, Customers)
- ✅ Order management (View, Update Status, Search, Filter)
- ✅ Product management (Add, Edit, Delete, Search, Filter)
- ✅ Customer management (View all customers, spending, orders)
- ✅ Logout functionality
- ✅ All data stored locally in browser

## How to Use

### Running the Website
1. Open `index.html` in your web browser
2. Browse products, add to cart, and complete checkout
3. View your orders in the "Orders" section

### Adding New Products (Admin Panel)
1. Open `admin.html` in your web browser
2. **Login with password:** RAVIRAJ@721933
3. Click "Add Product" in the sidebar
4. Fill in the product details form:
   - Product Name
   - Category
   - Prices
   - Rating
   - Image URL (use Unsplash: https://unsplash.com)
   - Description
   - Features
   - Sizes
3. Click "Add Product"
4. New product will appear on the main website automatically

### Payment Integration
- **UPI ID:** 7219336925@ybl (already integrated)
- Customers can pay via:
  - Direct UPI payment
  - Cash on Delivery
  - Credit/Debit Card
  - Pay to another person (custom)

## File Structure
```
rss-ecommerce/
├── index.html          # Main website
├── admin.html          # Admin panel for adding products
├── css/
│   └── styles.css      # All styling
├── js/
│   ├── products.js     # Product database
│   └── app.js          # Main functionality
└── README.md           # This file
```

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome Icons
- LocalStorage for data persistence

## Data Persistence
- All data (products, cart, orders) is stored in browser's LocalStorage
- No server required - works completely offline
- Data persists across browser sessions

## Customization
- To change brand name: Edit "RSS" in HTML files
- To change colors: Edit CSS variables in styles.css
- To change UPI ID: Edit in index.html and admin.html

## Future Enhancements
- Backend integration
- Real payment gateway
- Admin authentication
- Product images upload
- Order status updates
- Email notifications
- Wishlist feature
- Product reviews

## Support
For issues or questions, contact RSS support team.

---

**Built for RSS Clothing Brand**
© 2025 RSS. All rights reserved.
