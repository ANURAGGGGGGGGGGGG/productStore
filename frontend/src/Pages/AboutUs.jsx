import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Dashboard from "../Dashboard/Dashboard.png";
import '../Pages/AboutUs.css';

const AboutUS = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Home Navigation Button */}
      <button 
        className="home-btn"
        onClick={() => navigate('/')}
        aria-label="Return to Home"
      >
        <FaHome className="home-icon" />
      </button>

      <section className="hero-section">
        <h1>Welcome to NextBuy</h1>
        <p>Your intuitive platform for seamless product management</p>
      </section>

      <section className="features-section">
        <div className="feature-card platform-feature">
          <div className="feature-content">
            <h2>Effortless Product Management</h2>
            <p>Add, edit, and manage products with our intuitive dashboard</p>
            <div className="feature-actions">
              <button
                className="cta-btn"
                onClick={() => navigate('/products/add')}
              >
                Add Product Now
              </button>
            </div>
          </div>
          <div className="feature-visual">
            <img src={Dashboard} alt="Dashboard preview" />
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Simple Listing</h3>
            <p>Three-step process to list new products</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Updates</h3>
            <p>Instant visibility for added products</p>
          </div>
          <div className="feature-card">
            <h3>Smart Inventory</h3>
            <p>Automatic stock tracking & alerts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUS;