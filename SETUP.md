# Product Store - Full Stack Application

A complete MERN-style product management application with a React frontend and Node.js/Express backend.

## Project Structure

```
ProductStore/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.route.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── package.json
```

## Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

## Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will open on `http://localhost:3000`

## API Endpoints

The frontend communicates with the following API endpoints:

### Products
- **GET** `/api/products` - Retrieve all products
- **POST** `/api/products` - Create a new product
  ```json
  {
    "name": "Product Name",
    "price": 19.99,
    "image": "https://image-url.jpg"
  }
  ```
- **PUT** `/api/products/:id` - Update a product
- **DELETE** `/api/products/:id` - Delete a product

## Frontend Features

### Home Page (`/`)
- View all products in a responsive grid
- See product image, name, and price
- Edit or delete individual products
- Quick link to create new product

### Create Product Page (`/create`)
- Form to add new products
- Fields: Name, Price, Image URL
- Real-time image preview
- Form validation
- Submit button to create product

### Edit Product Page (`/edit/:id`)
- Edit existing product information
- Pre-populated form fields
- Same validation as create form
- Update button to save changes

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React 18
- React Router v6
- Axios
- Vite
- CSS3

## Running Both Servers

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Then open your browser to `http://localhost:3000`

## Features Covered

✅ **GET All Products** - Home page displays all products from the database
✅ **CREATE Product** - Create Product page with form validation
✅ **UPDATE Product** - Edit product page to modify product information
✅ **DELETE Product** - Delete button on product cards with confirmation
✅ **Error Handling** - User-friendly error messages for all operations
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Image Preview** - Real-time preview when entering image URL
✅ **Form Validation** - Ensures all required fields are filled correctly

## Troubleshooting

### Backend Connection Error
- Make sure the backend is running on `http://localhost:5000`
- Check that MongoDB URI is correctly set in `.env` file

### Port Already in Use
- Change the port in `frontend/vite.config.js` or `backend/server.js`

### CORS Issues
- Backend should accept requests from frontend (default: localhost:3000)

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/productstore
```

### Frontend
The frontend is configured to proxy API requests to `http://localhost:5000` via Vite's proxy setting.

## Next Steps

1. Set up MongoDB and get connection string
2. Configure backend `.env` file
3. Install dependencies for both frontend and backend
4. Run both servers in separate terminals
5. Access the application at `http://localhost:3000`

## License

ISC
