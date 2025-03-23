import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Product Store</h1>
        <p>Discover amazing products at great prices</p>
      </section>

      <section className="features-section">
        <div 
          className="feature-card clickable-card"
          onClick={() => handleNavigation('/products')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleNavigation('/products')}
        >
          <h2>Quality Products</h2>
          <p>We source only the best items for our customers</p>
          <span className="card-link">View Products →</span>
        </div>

        <div 
          className="feature-card clickable-card"
          onClick={() => handleNavigation('/about')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleNavigation('/about')}
        >
          <h2>About Us</h2>
          <p>Learn more about our story and values</p>
          <span className="card-link">Learn More →</span>
        </div>

        <div 
          className="feature-card clickable-card"
          onClick={() => handleNavigation('/contact')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleNavigation('/contact')}
        >
          <h2>Contact Us</h2>
          <p>Get in touch with our support team</p>
          <span className="card-link">Contact Us →</span>
        </div>
      </section>
    </div>
  );
};

export default Home;