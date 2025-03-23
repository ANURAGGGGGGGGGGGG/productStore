import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes, FaImage, FaTag, FaDollarSign } from 'react-icons/fa';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/api/products/${id}`);
        setProduct(response.data);
        setPreviewImage(response.data.imageUrl || null);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8100/api/products/${id}`, product);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update product');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'imageUrl') {
      setPreviewImage(value.trim() ? value : null);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading product details...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-alert">
        ⚠️ {error}
        <button onClick={() => navigate('/')} className="error-close">
          <FaTimes />
        </button>
      </div>
    </div>
  );



  return (
    <div className="edit-product-container">
      <div className="edit-product-card">
        <h1 className="edit-product-title">
          <FaTag className="title-icon" />
          Edit Product
        </h1>

        <div className="image-preview-section">
          <div className="image-preview-container">
            {previewImage ? (
              <img
                key={previewImage}
                src={previewImage}
                alt="Product preview"
                className="image-preview"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            ) : (
              <div className="no-image-placeholder">
                <FaImage className="placeholder-icon" />
                <span>No image selected</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="edit-product-form">
          <div className="form-group">
            <label className="input-label">
              <FaTag className="input-icon" />
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <FaDollarSign className="input-icon" />
              Price
            </label>
            <input
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
              className="form-input"
              step="0.01"
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <FaImage className="input-icon" />
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="Paste image URL"
            />
          </div>

          {error && (
            <div className="form-error">
              ⚠️ {error}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-save">
              <FaSave className="btn-icon" />
              Save Changes
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/products')}
            >
              <FaTimes className="btn-icon" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;