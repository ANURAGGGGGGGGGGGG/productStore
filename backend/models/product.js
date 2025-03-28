const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
    minlength: [3, "Product name must be at least 3 characters"]
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0.01, "Price must be at least 0.01"],
    set: v => parseFloat(v.toFixed(2))
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function(v) {
        return validator.isURL(v, {
          protocols: ["http", "https"],
          require_protocol: true
        });
      },
      message: "Invalid image URL format"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false,
  versionKey: false
});


productSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});


productSchema.index({ productName: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;