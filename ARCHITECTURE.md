# Product Store - Architecture & Flow Diagrams

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER                                 │
│                  http://localhost:3000                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  React Application  │
                    │  (Vite Dev Server)  │
                    └─────────────────────┘
                              ↓
        ┌─────────────────────────────────────────────┐
        │                                             │
        │  ┌──────────────────────────────────────┐  │
        │  │        React Components              │  │
        │  ├──────────────────────────────────────┤  │
        │  │ • App.jsx (Routing)                  │  │
        │  │ • Home.jsx (Product List)            │  │
        │  │ • CreateProduct.jsx (Form)           │  │
        │  └──────────────────────────────────────┘  │
        │                    ↓                       │
        │  ┌──────────────────────────────────────┐  │
        │  │    productService.js (API Layer)     │  │
        │  └──────────────────────────────────────┘  │
        │                    ↓                       │
        │  ┌──────────────────────────────────────┐  │
        │  │       Axios HTTP Client              │  │
        │  └──────────────────────────────────────┘  │
        └─────────────────────────────────────────────┘
                              ↓
                    HTTP/REST Requests
                              ↓
        ┌─────────────────────────────────────────────┐
        │         BACKEND SERVER                      │
        │     http://localhost:5000                   │
        │                                             │
        │  ┌──────────────────────────────────────┐  │
        │  │      Express.js Server               │  │
        │  └──────────────────────────────────────┘  │
        │                    ↓                       │
        │  ┌──────────────────────────────────────┐  │
        │  │    Routes: /api/products             │  │
        │  │  GET, POST, PUT, DELETE              │  │
        │  └──────────────────────────────────────┘  │
        │                    ↓                       │
        │  ┌──────────────────────────────────────┐  │
        │  │    Controllers: Business Logic       │  │
        │  └──────────────────────────────────────┘  │
        │                    ↓                       │
        │  ┌──────────────────────────────────────┐  │
        │  │    Models: Mongoose Schemas          │  │
        │  └──────────────────────────────────────┘  │
        └─────────────────────────────────────────────┘
                              ↓
                    MongoDB Operations
                              ↓
        ┌─────────────────────────────────────────────┐
        │         DATABASE                           │
        │    MongoDB Atlas / Local                    │
        │    (productstore database)                  │
        └─────────────────────────────────────────────┘
```

## 📊 Data Flow - Create Product

```
User Interface (Home.jsx)
         ↓
    [Click "+ Create Product"]
         ↓
Navigate to /create
         ↓
CreateProduct.jsx loads
         ↓
User fills form:
  • Product Name
  • Price
  • Image URL
         ↓
Form Validation:
  ✓ Name not empty
  ✓ Price > 0
  ✓ Image URL valid
         ↓
    [Click "Create Product"]
         ↓
productService.createProduct()
         ↓
axios.post('http://localhost:5000/api/products', {
  name: "...",
  price: ...,
  image: "..."
})
         ↓
Backend receives POST request
         ↓
Express Route Handler
         ↓
productController.createProduct()
         ↓
Validate data (server-side)
         ↓
Create new Product document
         ↓
Save to MongoDB
         ↓
Return { success: true, data: newProduct }
         ↓
Frontend receives response
         ↓
Alert("Product created successfully!")
         ↓
navigate('/') → Home page
         ↓
Home page fetches all products
         ↓
New product appears in grid
```

## 📊 Data Flow - Edit Product

```
User Interface (Home.jsx)
         ↓
Product Card: [Edit] button
         ↓
    [Click "Edit"]
         ↓
Navigate to /edit/productId
         ↓
CreateProduct.jsx loads
         ↓
useEffect detects isEditMode
         ↓
fetchProducts() → find matching product
         ↓
Load product data into form
         ↓
User modifies fields:
  • Product Name
  • Price
  • Image URL
         ↓
    [Click "Update Product"]
         ↓
productService.updateProduct(id, data)
         ↓
axios.put(`http://localhost:5000/api/products/${id}`, {
  name: "...",
  price: ...,
  image: "..."
})
         ↓
Backend receives PUT request
         ↓
productController.updateProduct()
         ↓
Find product by ID
         ↓
Update fields
         ↓
Save to MongoDB
         ↓
Return { success: true, data: updatedProduct }
         ↓
Frontend receives response
         ↓
Alert("Product updated successfully!")
         ↓
navigate('/') → Home page
         ↓
Updated product shows in list
```

## 📊 Data Flow - Delete Product

```
User Interface (Home.jsx)
         ↓
Product Card: [Delete] button
         ↓
    [Click "Delete"]
         ↓
Confirmation Dialog
  "Are you sure you want to delete this product?"
         ↓
    [OK] or [Cancel]
         ↓
If OK:
  productService.deleteProduct(id)
         ↓
axios.delete(`http://localhost:5000/api/products/${id}`)
         ↓
Backend receives DELETE request
         ↓
productController.deleteProduct()
         ↓
Find product by ID
         ↓
Delete from MongoDB
         ↓
Return { success: true, message: "Product deleted successfully" }
         ↓
Frontend receives response
         ↓
Remove product from state
         ↓
Product disappears from grid
         ↓
Alert("Product deleted successfully")

If Cancel:
  Dialog closes, no changes
```

## 🔄 Component Hierarchy

```
App.jsx
├── Router Setup
├── Routes Definition
│   ├── / → Home.jsx
│   ├── /create → CreateProduct.jsx
│   └── /edit/:id → CreateProduct.jsx
│
Home.jsx
├── State Management
│   ├── products (array)
│   ├── loading (boolean)
│   └── error (string)
├── Effects
│   └── fetchProducts on mount
├── Handlers
│   ├── fetchProducts()
│   └── handleDelete()
└── UI
    ├── Header
    │   ├── Title "Product Store"
    │   └── Button "+ Create Product"
    └── Product Grid
        └── ProductCard × N
            ├── Image
            ├── Name
            ├── Price
            └── Actions
                ├── Edit button
                └── Delete button
│
CreateProduct.jsx
├── State Management
│   ├── formData
│   │   ├── name
│   │   ├── price
│   │   └── image
│   ├── error (string)
│   └── loading (boolean)
├── Effects
│   └── loadProduct on edit mode
├── Handlers
│   ├── handleChange()
│   └── handleSubmit()
└── UI
    ├── Form
    │   ├── Name Input
    │   ├── Price Input
    │   └── Image URL Input
    ├── Image Preview
    └── Buttons
        ├── Submit (Create/Update)
        └── Cancel
```

## 🔐 Request/Response Format

### Create Product Request
```
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "image": "https://example.com/laptop.jpg"
}
```

### Create Product Response (Success)
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "succsess": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 999.99,
    "image": "https://example.com/laptop.jpg",
    "__v": 0
  }
}
```

### Create Product Response (Error)
```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "succsess": false,
  "message": "All fields are required"
}
```

### Get All Products Response
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "succsess": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "price": 999.99,
      "image": "https://example.com/laptop.jpg"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Mouse",
      "price": 29.99,
      "image": "https://example.com/mouse.jpg"
    }
  ]
}
```

## 🌐 HTTP Methods Summary

```
┌─────────────┬──────────────────────┬────────────┬──────────────────┐
│ HTTP Method │ Endpoint             │ Purpose    │ Request Body     │
├─────────────┼──────────────────────┼────────────┼──────────────────┤
│ GET         │ /api/products        │ Read all   │ None             │
│ POST        │ /api/products        │ Create     │ { name, price... }│
│ PUT         │ /api/products/:id    │ Update     │ { name, price... }│
│ DELETE      │ /api/products/:id    │ Delete     │ None             │
└─────────────┴──────────────────────┴────────────┴──────────────────┘
```

## 🎯 State Management Flow

```
Global Application State:
  └── products (stored in MongoDB)
      ├── _id: unique identifier
      ├── name: product name
      ├── price: product price
      └── image: product image URL

Component State:
  Home.jsx
  ├── products: [] (fetched from backend)
  ├── loading: false (during fetch)
  └── error: "" (error messages)

  CreateProduct.jsx
  ├── formData: { name, price, image }
  ├── error: "" (validation errors)
  └── loading: false (during submission)
```

## 📱 Responsive Breakpoints

```
Desktop: >= 768px
  └── Product Grid: 4 columns

Tablet: 480px - 768px
  └── Product Grid: 2 columns

Mobile: < 480px
  └── Product Grid: 1 column
```

## 🔄 Error Handling Flow

```
User Action
    ↓
Try Block
    ├── Success → Update UI
    │              Display success message
    │              Navigate if needed
    │
    └── Error → Catch Block
                 Extract error message
                 Update error state
                 Display error to user
                 Log to console
                 Prevent navigation
```

---

**Visual understanding of how the entire system works! 📊**
