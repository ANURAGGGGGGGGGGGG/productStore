import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../ProductCard/ProductCard.css';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        console.log(response)
        setProducts(response.data.data || []);
      } catch (error) {
        setError(error.response?.data?.msg || error.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}`
      );
      
      if (response.status === 200) {
        setProducts(prev => prev.filter(product => product._id !== productId));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 
                         error.response?.data?.message || 
                         error.message || 
                         'Failed to delete product';
      setError(errorMessage);
      console.error('Delete Error Details:', error.response?.data || error);
    }
  };

  if (loading) return <div className="loading">🔄 Loading products...</div>;
  if (error) return <div className="error">❌ Error: {error}</div>;

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div className="empty-state">📭 No products found</div>
      ) : (
        products.map((product) => (
          <div key={product._id} className="card">
            <div className="card-image-container">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="card-img"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            <div className="card-content">
              <h2 className="card-title">{product.productName}</h2>
              <p className="card-price">
                ${parseFloat(product.productPrice).toFixed(2)}
              </p>
              <div className="card-buttons">
                <button 
                  className="button edit-btn"
                  onClick={() => handleEdit(product._id)}
                  aria-label={`Edit ${product.productName}`}
                >
                  ✏️ Edit
                </button>
                <button
                  className="button delete-btn"
                  onClick={() => handleDelete(product._id)}
                  aria-label={`Delete ${product.productName}`}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCard;