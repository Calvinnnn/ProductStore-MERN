import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-banner">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2>Loading Products</h2>
        <p>Fetching amazing products for you...</p>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
