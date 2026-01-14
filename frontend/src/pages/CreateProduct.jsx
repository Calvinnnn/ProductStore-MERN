import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/CreateProduct.css';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productService.getAllProducts();
      if (response.succsess) {
        const product = response.data.find((p) => p._id === id);
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
          });
        }
      }
    } catch (err) {
      setError('Error loading product');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number');
      return;
    }
    if (!formData.image.trim()) {
      setError('Image URL is required');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (isEditMode) {
        response = await productService.updateProduct(id, formData);
      } else {
        response = await productService.createProduct(formData);
      }

      if (response.succsess) {
        alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
        navigate('/');
      } else {
        setError(response.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving product. Make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <div className="form-wrapper">
        <h1>{isEditMode ? 'Edit Product' : 'Create New Product'}</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              step="0.01"
              min="0"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              disabled={loading}
            />
          </div>

          {formData.image && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img src={formData.image} alt="Preview" />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
