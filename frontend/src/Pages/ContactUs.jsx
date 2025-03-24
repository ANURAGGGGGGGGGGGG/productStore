import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../Pages/ContactUs.css';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <button 
        className="home-btn"
        onClick={() => navigate('/')}
        aria-label="Return to Home"
      >
        <FaHome className="home-icon" />
      </button>

      <h1>Contact Us</h1>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
        
        <div className="contact-info">
          <h2>Visit Us</h2>
          <p>123 Store Street</p>
          <p>New York, NY 10001</p>
          <p>Email: contact@productstore.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;