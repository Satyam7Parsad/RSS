// Products Database - RSS Clothing Store
let products = [
    {
        id: 1,
        name: "RSS Premium Cotton Formal Shirt - White",
        category: "mens",
        price: 899,
        originalPrice: 1999,
        discount: "55% off",
        rating: 4.7,
        reviews: 2341,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
        description: "Classic white formal shirt perfect for office and formal occasions. Made with premium cotton fabric.",
        features: ["100% Premium Cotton", "Wrinkle-Free", "Slim Fit", "Easy Care", "Professional Look"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 2,
        name: "RSS Men's Casual T-Shirt - Navy Blue",
        category: "mens",
        price: 499,
        originalPrice: 999,
        discount: "50% off",
        rating: 4.5,
        reviews: 3421,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Comfortable casual t-shirt perfect for everyday wear. Breathable and durable fabric.",
        features: ["100% Cotton", "Round Neck", "Regular Fit", "Soft Fabric", "Machine Washable"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 3,
        name: "RSS Men's Denim Jeans - Blue",
        category: "mens",
        price: 1499,
        originalPrice: 2999,
        discount: "50% off",
        rating: 4.6,
        reviews: 4521,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        description: "Premium denim jeans with perfect fit and comfort. Ideal for casual and semi-formal occasions.",
        features: ["Premium Denim", "Regular Fit", "5 Pockets", "Durable", "Stylish Design"],
        sizes: ["28", "30", "32", "34", "36", "38"]
    },
    {
        id: 4,
        name: "RSS Men's Formal Trousers - Black",
        category: "mens",
        price: 1199,
        originalPrice: 2499,
        discount: "52% off",
        rating: 4.4,
        reviews: 1876,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
        description: "Elegant formal trousers for office and business meetings. Comfortable all-day wear.",
        features: ["Wrinkle Resistant", "Slim Fit", "Side Pockets", "Professional", "Easy Iron"],
        sizes: ["28", "30", "32", "34", "36", "38"]
    },
    {
        id: 5,
        name: "RSS Men's Polo T-Shirt - Maroon",
        category: "mens",
        price: 699,
        originalPrice: 1499,
        discount: "53% off",
        rating: 4.5,
        reviews: 2987,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
        description: "Stylish polo t-shirt perfect for casual and smart-casual occasions.",
        features: ["Pique Cotton", "Collar Design", "Regular Fit", "Breathable", "Classic Style"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 6,
        name: "RSS Women's Designer Kurta Set - Pink",
        category: "womens",
        price: 1999,
        originalPrice: 4999,
        discount: "60% off",
        rating: 4.8,
        reviews: 5678,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
        description: "Beautiful designer kurta set with intricate embroidery. Perfect for parties and festivals.",
        features: ["Designer Embroidery", "Comfortable Fit", "Includes Dupatta", "Premium Fabric", "Party Wear"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 7,
        name: "RSS Women's Cotton Saree - Red",
        category: "womens",
        price: 2499,
        originalPrice: 5999,
        discount: "58% off",
        rating: 4.9,
        reviews: 4321,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
        description: "Elegant cotton saree with beautiful border work. Comfortable for all-day wear.",
        features: ["Pure Cotton", "Traditional Design", "With Blouse Piece", "Easy Draping", "Festive Wear"],
        sizes: ["Free Size"]
    },
    {
        id: 8,
        name: "RSS Women's Western Top - White",
        category: "womens",
        price: 799,
        originalPrice: 1999,
        discount: "60% off",
        rating: 4.6,
        reviews: 3456,
        image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&h=400&fit=crop",
        description: "Trendy western top perfect for casual outings and office wear.",
        features: ["Stylish Design", "Regular Fit", "Breathable Fabric", "Easy Care", "Versatile"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 9,
        name: "RSS Women's Jeans - Dark Blue",
        category: "womens",
        price: 1299,
        originalPrice: 2799,
        discount: "54% off",
        rating: 4.7,
        reviews: 2876,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        description: "Comfortable women's jeans with perfect fit. Great for casual and smart-casual looks.",
        features: ["Stretchable Denim", "Slim Fit", "5 Pockets", "High Quality", "Comfortable"],
        sizes: ["28", "30", "32", "34", "36"]
    },
    {
        id: 10,
        name: "RSS Women's Palazzo Set - Green",
        category: "womens",
        price: 1499,
        originalPrice: 3499,
        discount: "57% off",
        rating: 4.5,
        reviews: 1987,
        image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop",
        description: "Comfortable palazzo set with matching top. Perfect for summer and casual occasions.",
        features: ["Flowy Palazzo", "Matching Top", "Breathable", "All Season", "Easy Wear"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 11,
        name: "RSS Kids Boys T-Shirt - Blue",
        category: "kids",
        price: 399,
        originalPrice: 899,
        discount: "56% off",
        rating: 4.6,
        reviews: 1234,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop",
        description: "Comfortable cotton t-shirt for kids. Fun designs and vibrant colors.",
        features: ["Soft Cotton", "Comfortable", "Durable Print", "Easy Care", "Fun Design"],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"]
    },
    {
        id: 12,
        name: "RSS Kids Girls Dress - Pink",
        category: "kids",
        price: 699,
        originalPrice: 1699,
        discount: "59% off",
        rating: 4.7,
        reviews: 2345,
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop",
        description: "Beautiful dress for girls. Perfect for parties and special occasions.",
        features: ["Pretty Design", "Comfortable Fit", "Soft Fabric", "Party Wear", "Easy Wash"],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"]
    },
    {
        id: 13,
        name: "RSS Kids Shorts - Black",
        category: "kids",
        price: 349,
        originalPrice: 799,
        discount: "56% off",
        rating: 4.4,
        reviews: 987,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        description: "Comfortable shorts for active kids. Perfect for play and sports.",
        features: ["Elastic Waist", "Comfortable", "Durable", "Quick Dry", "Active Wear"],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"]
    },
    {
        id: 14,
        name: "RSS Ethnic Sherwani Set - Cream",
        category: "ethnic",
        price: 4999,
        originalPrice: 9999,
        discount: "50% off",
        rating: 4.9,
        reviews: 876,
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop",
        description: "Premium sherwani set for weddings and special occasions. Comes with kurta and bottom.",
        features: ["Designer Embroidery", "Premium Fabric", "Complete Set", "Wedding Wear", "Royal Look"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 15,
        name: "RSS Women's Lehenga Choli - Maroon",
        category: "ethnic",
        price: 5999,
        originalPrice: 12999,
        discount: "54% off",
        rating: 4.8,
        reviews: 1543,
        image: "https://images.unsplash.com/photo-1610190625737-34620cf799c6?w=400&h=400&fit=crop",
        description: "Stunning lehenga choli perfect for weddings and festivals. Beautiful embroidery work.",
        features: ["Heavy Embroidery", "Semi-Stitched", "With Dupatta", "Wedding Wear", "Designer Piece"],
        sizes: ["Free Size - Semi Stitched"]
    },
    {
        id: 16,
        name: "RSS Men's Pathani Suit - White",
        category: "ethnic",
        price: 1999,
        originalPrice: 4499,
        discount: "56% off",
        rating: 4.6,
        reviews: 654,
        image: "https://images.unsplash.com/photo-1622519407650-3df9883f76e4?w=400&h=400&fit=crop",
        description: "Traditional pathani suit for festivals and ethnic occasions.",
        features: ["Pure Cotton", "Comfortable Fit", "Traditional Design", "Full Set", "Festival Wear"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 17,
        name: "RSS Men's Leather Jacket - Brown",
        category: "western",
        price: 3999,
        originalPrice: 7999,
        discount: "50% off",
        rating: 4.7,
        reviews: 432,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        description: "Premium faux leather jacket for a stylish look. Perfect for winter and casual outings.",
        features: ["Faux Leather", "Warm & Stylish", "Multiple Pockets", "Zipper Closure", "Winter Wear"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 18,
        name: "RSS Women's One-Piece Dress - Black",
        category: "western",
        price: 1799,
        originalPrice: 3999,
        discount: "55% off",
        rating: 4.8,
        reviews: 1876,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
        description: "Elegant western one-piece dress. Perfect for parties and evening events.",
        features: ["Elegant Design", "Comfortable Fit", "Party Wear", "Premium Fabric", "Stylish"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 19,
        name: "RSS Designer Sunglasses - Black",
        category: "accessories",
        price: 599,
        originalPrice: 1499,
        discount: "60% off",
        rating: 4.5,
        reviews: 2341,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        description: "Stylish designer sunglasses with UV protection. Perfect for any outfit.",
        features: ["UV Protection", "Polarized Lens", "Lightweight Frame", "Durable", "Stylish Design"],
        sizes: ["One Size"]
    },
    {
        id: 20,
        name: "RSS Leather Belt - Brown",
        category: "accessories",
        price: 499,
        originalPrice: 1299,
        discount: "62% off",
        rating: 4.6,
        reviews: 3210,
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400&h=400&fit=crop",
        description: "Premium leather belt for men. Classic design that goes with any outfit.",
        features: ["Genuine Leather", "Metal Buckle", "Durable", "Classic Design", "Adjustable"],
        sizes: ["28-32", "32-36", "36-40"]
    }
];

// Load products from localStorage if available
function loadProducts() {
    const savedProducts = localStorage.getItem('rssProducts');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('rssProducts', JSON.stringify(products));
}

// Initialize products
loadProducts();
