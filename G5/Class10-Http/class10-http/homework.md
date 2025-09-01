# 📝 Angular HTTP Homework Assignment

## 🎯 Objective

Complete the product management application by implementing HTTP operations with the FakeStore API.

## 🚀 Getting Started

1. **Copy the code** from the class folder to a new directory to avoid pushing to this repository
2. Ensure your development environment is set up and the application runs successfully

## ✅ Required Features

### 1. 🗑️ Delete Product Implementation

- Implement the delete functionality by calling the FakeStore API
- On successful deletion from the API, remove the product from the local state

### 2. 📂 Dynamic Categories

- Fetch product categories from the FakeStore API
- Replace hardcoded categories in `ProductFormComponent` with API data
- Display the categories dynamically in the product form dropdown

### 3. ✏️ Update Product Feature

- Complete the update product functionality
- Make API request to FakeStore API for product updates
- On successful update, refresh the product in the service state

### 4. 🔍 Get Product by ID

- Implement fetching individual products by ID from the FakeStore API
- Use this for the edit mode in `ProductFormComponent`
- Ensure form pre-population works even after page refresh
- Handle cases where product ID doesn't exist

## 🌟 Bonus Features (Optional)

### Search Filter

- Add a search filter to the product list component
- Filter products in real-time as the user types
- Search should match product names, descriptions, or categories

## 🔗 API Reference

Base URL: `https://fakestoreapi.com`

### Endpoints:

- **GET** `/products` - Get all products
- **GET** `/products/{id}` - Get product by ID
- **POST** `/products` - Create new product
- **PUT** `/products/{id}` - Update product
- **DELETE** `/products/{id}` - Delete product
- **GET** `/products/categories` - Get all categories

## 💡 Tips

- Make sure to go over the documentation of fakestoreapi.
- https://fakestoreapi.com/docs

---

**Good luck! 🚀**
