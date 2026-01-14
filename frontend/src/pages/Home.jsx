import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import Loading from '../components/Loading';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await productService.getAllProducts();
      if (response.succsess) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('Error fetching products. Make sure the backend is running on http://localhost:5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await productService.deleteProduct(id);
        if (response.succsess) {
          setProducts(products.filter((product) => product._id !== id));
          alert('Product deleted successfully');
        } else {
          setError('Failed to delete product');
        }
      } catch (err) {
        setError('Error deleting product');
        console.error(err);
      }
    }
  };

  return (
    <div className="home-container">
      {loading && <Loading />}
      
      <header className="header">
        <h1>Product Store</h1>
        <Link to="/create" className="btn-create">
          + Create Product
        </Link>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="products-container">
        {products.length === 0 && !loading ? (
          <div className="no-products">
            <p>No products found.</p>
            <Link to="/create" className="btn-create-secondary">
              Create your first product
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <div className="product-actions">
                    <Link to={`/edit/${product._id}`} className="btn-edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
