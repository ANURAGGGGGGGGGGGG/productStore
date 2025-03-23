const Product = require("../models/product");
const mongoose = require("mongoose");

// Helper function for error responses
const errorResponse = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    msg: message,
    ...(process.env.NODE_ENV === 'development' && { error: error?.message })
  };
  return res.status(statusCode).json(response);
};

// Validate product data
const validateProductData = (data, isUpdate = false) => {
  const errors = [];
  const { productName, productPrice, imageUrl } = data;

  if (productName !== undefined) {
    if (!productName.trim()) errors.push('Product name is required');
    if (productName.trim().length < 3) errors.push('Product name must be at least 3 characters');
  }

  if (productPrice !== undefined) {
    if (isNaN(productPrice)) errors.push('Price must be a valid number');
    if (parseFloat(productPrice) <= 0) errors.push('Price must be greater than 0');
  }

  if (imageUrl !== undefined) {
    if (!imageUrl.trim()) errors.push('Image URL is required');
    if (!isValidUrl(imageUrl)) errors.push('Valid image URL is required');
  }

  if (!isUpdate && (!productName || !productPrice || !imageUrl)) {
    errors.push('All fields are required for creation');
  }

  return errors;
};


const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const createProduct = async (req, res) => {
  try {
    // Convert price to number before saving
    const productData = {
      ...req.body,
      productPrice: parseFloat(req.body.productPrice)
    };

    const product = new Product(productData);
    const savedProduct = await product.save();
    
    return res.status(201).json({
      success: true,
      product: savedProduct
    });
  } catch (err) {
    console.error("Create product error:", err);
    return res.status(400).json({ // Change to 400 for client errors
      success: false,
      error: err.message
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, 400, "Invalid product ID format");
      }

      const product = await Product.findById(id);
      if (!product) return errorResponse(res, 404, "Product not found");
      
      return res.status(200).json({ success: true, data: product });
    }

    // Get all products with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments()
    ]);

    return res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products
    });

  } catch (err) {
    console.error("Get product(s) error:", err);
    return errorResponse(res, 500, "Failed to retrieve products", err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 400, "Invalid product ID format");
    }

    // Convert price to number if present
    if (updateData.productPrice) {
      updateData.productPrice = parseFloat(updateData.productPrice);
    }

    const validationErrors = validateProductData(updateData, true);
    if (validationErrors.length > 0) {
      return errorResponse(res, 400, validationErrors.join(', '));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true,
        runValidators: true,
        overwrite: false // This allows partial updates
      }
    );

    if (!updatedProduct) return errorResponse(res, 404, "Product not found");

    return res.status(200).json({
      success: true,
      data: updatedProduct
    });

  } catch (err) {
    console.error("Update product error:", err);
    return errorResponse(res, 500, "Product update failed", err);
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 400, "Invalid product ID format");
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) return errorResponse(res, 404, "Product not found");

    return res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
      data: product
    });

  } catch (err) {
    console.error("Delete error:", err);
    return errorResponse(res, 500, "Product deletion failed", err);
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};