import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaPlusCircle, FaTag, FaDollarSign, FaImage, FaTimes } from 'react-icons/fa';
import '../ProductForm/ProductForm.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    imageUrl: ''
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'imageUrl') {
      setPreviewImage(value.trim() ? value : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        formData
      );

      if (response.data.success) {
        setFormData({ productName: '', productPrice: '', imageUrl: '' });
        setPreviewImage(null);
        setSuccess(true);
        setTimeout(() => {
          navigate('/products'); // Auto-redirect after success
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-product-container">
      <div className="edit-product-card">
        <h1 className="edit-product-title">
          <FaPlusCircle className="title-icon" />
          Add New Product
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
              value={formData.productName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter product name"
              required
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
              value={formData.productPrice}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
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
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="Paste image URL"
              required
            />
          </div>

          {error && (
            <div className="form-error">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="form-success">
              ✅ Product added successfully!
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn-save"
              disabled={isSubmitting}
            >
              <FaSave className="btn-icon" />
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/products')}
              disabled={isSubmitting}
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

export default ProductForm;