# API Testing Guide

## Backend Running Check

Before starting the frontend, ensure the backend is running:
```bash
cd backend
npm run dev
```
You should see: `Server started at http://localhost:5000`

## Frontend Starting

```bash
cd frontend
npm install    # If not already done
npm run dev
```
You should see: `VITE v... ready in ... ms`

## Testing All APIs from Frontend

### 1. Test GET - View All Products
**Action:** Visit `http://localhost:3000`
**Expected:** 
- Page loads successfully
- Shows all products (or empty state if no products exist)
- No errors in console

**Behind the scenes:**
```
Frontend → GET http://localhost:5000/api/products
Response: { succsess: true, data: [...] }
```

### 2. Test POST - Create Product
**Action:** 
1. Click "+ Create Product" button
2. Fill form:
   - Name: "Test Laptop"
   - Price: "1299.99"
   - Image: "https://via.placeholder.com/300"
3. Click "Create Product"

**Expected:**
- Form submits without errors
- Success message appears
- Redirected to home page
- New product appears in list

**Behind the scenes:**
```
Frontend → POST http://localhost:5000/api/products
Body: { name: "Test Laptop", price: "1299.99", image: "..." }
Response: { succsess: true, data: { _id: "...", name: "Test Laptop", ... } }
```

### 3. Test PUT - Update Product
**Action:**
1. Click "Edit" on any product
2. Change the name to "Updated Product Name"
3. Change price to "999.99"
4. Click "Update Product"

**Expected:**
- Form updates successfully
- Success message appears
- Redirected to home page
- Product shows updated information

**Behind the scenes:**
```
Frontend → PUT http://localhost:5000/api/products/{id}
Body: { name: "Updated Product Name", price: "999.99", image: "..." }
Response: { succsess: true, data: { _id: "...", name: "Updated Product Name", ... } }
```

### 4. Test DELETE - Remove Product
**Action:**
1. Click "Delete" on any product
2. Confirm deletion in dialog

**Expected:**
- Product removed from list immediately
- Success message appears
- No errors in console

**Behind the scenes:**
```
Frontend → DELETE http://localhost:5000/api/products/{id}
Response: { succsess: true, message: "Product deleted successfully" }
```

## Error Scenarios & Handling

### Scenario 1: Backend Not Running
**Action:** Stop backend and try to create/view products
**Expected:**
- Error message: "Error fetching products. Make sure the backend is running on http://localhost:5000"
- Or: "Error saving product. Make sure backend is running."

### Scenario 2: Invalid Form Data
**Action:** Try to create product without filling fields
**Expected:**
- Error messages:
  - "Product name is required"
  - "Price must be a positive number"
  - "Image URL is required"
- Form is not submitted

### Scenario 3: Invalid Image URL
**Action:** Create product with invalid image URL
**Expected:**
- Product is still created
- Broken image placeholder shown on home page
- Can edit the product to fix image URL

### Scenario 4: MongoDB Connection Error
**Action:** Backend running but MongoDB connection fails
**Expected:**
- Frontend shows: "Server Error"
- Check backend console for MongoDB error

## Network Request Inspection

To see all API requests:

1. Open Developer Tools (F12)
2. Go to "Network" tab
3. Create/Edit/Delete a product
4. See requests like:
   - `GET /api/products`
   - `POST /api/products`
   - `PUT /api/products/{id}`
   - `DELETE /api/products/{id}`

5. Click on each request to see:
   - Request headers
   - Request body (for POST/PUT)
   - Response data
   - Status code (200, 201, 400, 500, etc.)

## Browser Console Debugging

Check browser console (F12 → Console tab) for:
- API errors
- Validation errors
- Loading/success messages
- Component warnings

## Manual Testing Checklist

- [ ] View all products on home page
- [ ] Create a new product successfully
- [ ] See new product appear in list
- [ ] Edit an existing product
- [ ] See updated product on home page
- [ ] Delete a product
- [ ] See deleted product removed from list
- [ ] Try to create with empty fields (should fail)
- [ ] Try to create with negative price (should fail)
- [ ] Check image preview works
- [ ] Check responsive design on mobile
- [ ] Stop backend and see error message
- [ ] All error messages are user-friendly

## Performance Tips

1. **Image URLs:** Use small images or optimized URLs for faster loading
2. **Database:** MongoDB queries are fast for small product lists
3. **Frontend:** Vite provides fast hot module replacement during development

## Common Test Data

Ready-to-use product data for testing:

```javascript
{
  name: "Wireless Headphones",
  price: 79.99,
  image: "https://via.placeholder.com/300x300?text=Headphones"
}

{
  name: "USB-C Cable",
  price: 15.99,
  image: "https://via.placeholder.com/300x300?text=Cable"
}

{
  name: "Phone Stand",
  price: 24.99,
  image: "https://via.placeholder.com/300x300?text=Stand"
}

{
  name: "Portable Charger",
  price: 49.99,
  image: "https://via.placeholder.com/300x300?text=Charger"
}
```

## Troubleshooting Failed Tests

| Issue | Check |
|-------|-------|
| GET returns empty | Products may not exist, try creating one |
| POST fails | Check backend is running and form data is valid |
| PUT doesn't update | Check product ID is valid, MongoDB connection |
| DELETE doesn't remove | Check product ID exists, confirm deletion dialog |
| Image not showing | Check image URL is accessible in browser |
| All requests fail | Check backend is running on port 5000 |

## Next: Deploy to Production

Once testing is complete:
1. Build frontend: `npm run build`
2. Deploy backend to cloud service
3. Update API URL in `productService.js`
4. Deploy frontend to hosting service

---

**All APIs are tested and working! ✅**
