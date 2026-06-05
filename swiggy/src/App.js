import React, { useMemo, useState } from 'react';
import './App.css';

const categories = [
  { id: 1, name: 'Pizza', emoji: '🍕' },
  { id: 2, name: 'Biryani', emoji: '🍛' },
  { id: 3, name: 'Sweets', emoji: '🍰' },
  { id: 4, name: 'Chinese', emoji: '🥡' },
  { id: 5, name: 'South Indian', emoji: '🫓' },
];

const restaurants = [
  {
    id: 1,
    name: 'Royal Spice',
    cuisine: 'North Indian, Biryani',
    rating: 4.8,
    eta: '28 mins',
    delivery: 'FREE',
    tags: ['Best Seller', 'Biryani', 'Family Meal'],
    dishes: [
      { name: 'Butter Chicken', price: '₹320' },
      { name: 'Hyderabadi Biryani', price: '₹260' },
      { name: 'Paneer Tikka', price: '₹220' },
    ],
  },
  {
    id: 2,
    name: 'Pizzeria Mania',
    cuisine: 'Italian, Fast Food',
    rating: 4.6,
    eta: '20 mins',
    delivery: '₹20',
    tags: ['Fresh Pizza', 'Cheesy', 'Offers'],
    dishes: [
      { name: 'Margherita', price: '₹199' },
      { name: 'Pepperoni', price: '₹299' },
      { name: 'Farmhouse', price: '₹279' },
    ],
  },
  {
    id: 3,
    name: 'Japan Wok',
    cuisine: 'Chinese, Noodles',
    rating: 4.5,
    eta: '22 mins',
    delivery: 'FREE',
    tags: ['Quick Bites', 'Combo Meals'],
    dishes: [
      { name: 'Chilli Chicken', price: '₹240' },
      { name: 'Veg Hakka Noodles', price: '₹180' },
      { name: 'Spring Rolls', price: '₹139' },
    ],
  },
  {
    id: 4,
    name: 'Dosa Corner',
    cuisine: 'South Indian',
    rating: 4.7,
    eta: '18 mins',
    delivery: '₹15',
    tags: ['Crispy Dosas', 'Filter Coffee'],
    dishes: [
      { name: 'Masala Dosa', price: '₹120' },
      { name: 'Paneer Dosa', price: '₹150' },
      { name: 'Idli Sambhar', price: '₹89' },
    ],
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const filteredRestaurants = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (!normalizedSearch) return restaurants;

    return restaurants.filter(restaurant => {
      const searchableFields = [
        restaurant.name,
        restaurant.cuisine,
        ...restaurant.tags,
        ...restaurant.dishes.map(dish => dish.name),
      ];

      return searchableFields.some(field => field.toLowerCase().includes(normalizedSearch));
    });
  }, [searchQuery]);

  const addToCart = restaurant => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === restaurant.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === restaurant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prevItems,
        {
          id: restaurant.id,
          name: restaurant.name,
          price: restaurant.dishes[0]?.price ?? '₹0',
          quantity: 1,
        },
      ];
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace(/[^0-9]/g, '')) * item.quantity,
    0
  );

  const cartLabel = totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''}` : 'Cart is empty';

  return (
    <div className="app-shell">
      <div className="hero-banner">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <h1>Swiggy Lite</h1>
            <p>Order delicious food from your favorite restaurants.</p>
          </div>
        </div>

        <div className="hero-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, cuisines or dishes"
            />
          </div>

          <div className="cart-summary-card">
            <div className="cart-top">
              <span className="cart-title">My Cart</span>
              <span className="cart-count">{cartLabel}</span>
            </div>
            <div className="cart-total">{totalItems > 0 ? `Total: ₹${totalPrice}` : 'Add something tasty'}</div>
          </div>
        </div>
      </div>

      <section className="section category-section">
        <div className="section-header">
          <div>
            <h2>Popular Categories</h2>
            <p>Select a category to browse faster.</p>
          </div>
        </div>

        <div className="category-list">
          {categories.map(category => (
            <button
              key={category.id}
              className="category-card"
              type="button"
              onClick={() => setSearchQuery(category.name)}
            >
              <span className="category-emoji">{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section restaurant-section">
        <div className="section-header">
          <div>
            <h2>Featured Restaurants</h2>
            <p>Handpicked restaurants for you.</p>
          </div>
          <button className="view-all" type="button" onClick={() => setSearchQuery('')}>
            View All
          </button>
        </div>

        <div className="restaurant-grid">
          {filteredRestaurants.map(restaurant => (
            <article key={restaurant.id} className="restaurant-card">
              <div className="restaurant-card-header">
                <div>
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.cuisine}</p>
                </div>
                <div className="rating-chip">{restaurant.rating} ★</div>
              </div>

              <div className="restaurant-meta">
                <span>{restaurant.eta}</span>
                <span>{restaurant.delivery}</span>
              </div>

              <div className="restaurant-tags">
                {restaurant.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="menu-preview">
                {restaurant.dishes.map(dish => (
                  <div key={dish.name} className="dish-row">
                    <span>{dish.name}</span>
                    <strong>{dish.price}</strong>
                  </div>
                ))}
              </div>

              <button className="order-button" type="button" onClick={() => addToCart(restaurant)}>
                Order Now
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section cart-section">
        <div className="cart-panel">
          <h2>Your Order</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Tap Order Now to add a restaurant.</p>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × {item.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
