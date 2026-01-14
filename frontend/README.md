# Product Store Frontend

A React-based frontend for the Product Store application with full CRUD functionality.

## Features

- **Home Page**: Display all products in a responsive grid layout
- **Create Product**: Add new products with name, price, and image URL
- **Edit Product**: Update existing product information
- **Delete Product**: Remove products from the store
- **Image Preview**: Real-time preview of product images
- **Error Handling**: User-friendly error messages and validation
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- Backend server running on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Make sure your backend server is running:
   ```bash
   cd backend
   npm run dev
   ```
   The backend should be running on `http://localhost:5000`

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will open on `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # Home page with product list
│   │   └── CreateProduct.jsx  # Create/Edit product page
│   ├── services/
│   │   └── productService.js  # API service for backend communication
│   ├── styles/
│   │   ├── App.css            # Global styles
│   │   ├── Home.css           # Home page styles
│   │   └── CreateProduct.css  # Create product page styles
│   ├── App.jsx                # Main app component with routing
│   └── main.jsx               # Entry point
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies and scripts
```

## Available Routes

- `/` - Home page showing all products
- `/create` - Create a new product
- `/edit/:id` - Edit an existing product

## API Integration

The frontend connects to the following backend API endpoints:

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

All API requests are handled through the `productService.js` file, which provides a clean abstraction layer for API calls.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Technologies Used

- **React 18**: UI library
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **Vite**: Build tool and development server
- **CSS3**: Styling and responsive design

## Error Handling

The application includes comprehensive error handling:
- Validation for required fields
- API error messages displayed to users
- Loading states during operations
- Helpful error messages if backend is not running

## Notes

- The backend must be running before starting the frontend
- Image URLs must be valid and accessible
- All prices should be positive numbers
- The application stores data in MongoDB (managed by the backend)
