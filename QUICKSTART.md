# Quick Start Guide

## One-Time Setup

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with MongoDB connection
echo MONGO_URI=your_mongodb_connection_string > .env

# Verify it works (Terminal 1)
npm run dev
# Should show: Server started at http://localhost:5000
```

### 2. Frontend Setup
```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (Terminal 2)
npm run dev
# Should show: Local: http://localhost:3000
```

## Access the Application

Open your browser and go to: **http://localhost:3000**

## Test the Features

### 1. Home Page
- View all products (initially empty if no products exist)
- See the "Create Product" button

### 2. Create a Product
- Click "+ Create Product"
- Fill in:
  - **Product Name**: e.g., "Laptop"
  - **Price**: e.g., "999.99"
  - **Image URL**: e.g., "https://via.placeholder.com/300"
- Click "Create Product"
- You'll be redirected to home page with your new product

### 3. Edit a Product
- Click "Edit" button on any product card
- Modify the fields
- Click "Update Product"

### 4. Delete a Product
- Click "Delete" button on any product card
- Confirm the deletion
- Product will be removed from the list

## API Response Format

All API responses follow this format:

### Success
```json
{
  "succsess": true,
  "data": { /* product object or array */ }
}
```

### Error
```json
{
  "succsess": false,
  "message": "Error description"
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" | Make sure backend is running on port 5000 |
| "Database connection failed" | Check MongoDB URI in `.env` file |
| "Port 3000 already in use" | Change port in `frontend/vite.config.js` |
| "Port 5000 already in use" | Change port in `backend/server.js` |
| "Image not showing" | Ensure image URL is valid and accessible |

## File Structure

```
ProductStore/
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/           # Route handlers
│   ├── models/               # Database schemas
│   ├── routes/               # API endpoints
│   ├── server.js             # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # React pages (Home, CreateProduct)
│   │   ├── services/         # API calls
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx           # Main component with routing
│   │   └── main.jsx          # React DOM render
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite config
│   └── package.json
│
└── SETUP.md                   # Full setup guide
```

## Development Tips

### Hot Module Replacement
- The frontend supports HMR (Hot Module Replacement)
- Changes to React components will reflect instantly without page reload

### Debugging
- Open browser DevTools (F12)
- Frontend errors appear in Console tab
- Network tab shows all API requests to backend

### Adding New Features
1. Create new page component in `src/pages/`
2. Add new API methods in `src/services/productService.js`
3. Add new routes in `src/App.jsx`
4. Create corresponding CSS in `src/styles/`

## Next Steps

- Deploy backend to a cloud service (Heroku, AWS, Azure)
- Update API URL in `productService.js` to production endpoint
- Build and deploy frontend to hosting service
- Set up environment variables for production

---

**Happy coding! 🚀**
