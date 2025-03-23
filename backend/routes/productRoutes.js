const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// RESTful routes
router.route("/")
  .post(productController.createProduct) // POST /api/products
  .get(productController.getProduct);    // GET /api/products

router.route("/:id")
  .put(productController.updateProduct)    // PUT /api/products/:id
  .delete(productController.deleteProduct) // DELETE /api/products/:id
  .get(productController.getProduct);      // GET /api/products/:id (optional)

module.exports = router;