import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import "../Nav/Navbar.css";

const Nav = ({ onAddProduct  }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle("dark-theme", !isDarkMode);
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const themeToggleVariants = {
    light: { background: "linear-gradient(45deg, #3498db, #8e44ad)" },
    dark: { background: "linear-gradient(45deg, #2c3e50, #34495e)" }
  };

  return (
    <motion.nav
      className="navbar"
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="navbar-left">
        <motion.span
          className="logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
        >
          🛒 Product Store
        </motion.span>
      </div>

      <div className="nav-buttons-container">
        <motion.button
          className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Home
        </motion.button>
        
        <motion.button
          className={`nav-btn ${location.pathname === "/about" ? "active" : ""}`}
          onClick={() => navigate("/about")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          About Us
        </motion.button>
        
        <motion.button
          className={`nav-btn ${location.pathname === "/contact" ? "active" : ""}`}
          onClick={() => navigate("/contact")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Contact Us
        </motion.button>
      </div>

      <div className="navbar-right">
        <motion.button
          className="btn add-product"
          onClick={() => onAddProduct(prev => !prev)}
          aria-label="Add Product"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          ➕
        </motion.button>

        <div className="theme-toggle-wrapper">
          <input
            type="checkbox"
            id="theme-toggle"
            className="visually-hidden"
            aria-label="Toggle Theme"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <motion.label
            htmlFor="theme-toggle"
            className="theme-toggle"
            variants={themeToggleVariants}
            animate={isDarkMode ? "dark" : "light"}
          />
        </div>
      </div>
    </motion.nav>
  );
};

Nav.propTypes = {
  setShowForm: PropTypes.func.isRequired
};

export default Nav;