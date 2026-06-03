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
    name: 'China Wok',
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
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="search" placeholder="Search for restaurants, cuisines or dishes" />
        </div>
      </div>

      <section className="section category-section">
        <h2>Popular Categories</h2>
        <div className="category-list">
          {categories.map(category => (
            <button key={category.id} className="category-card">
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
          <button className="view-all">View All</button>
        </div>

        <div className="restaurant-grid">
          {restaurants.map(restaurant => (
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
                  <span key={tag} className="tag">{tag}</span>
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
              <button className="order-button">Order Now</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
