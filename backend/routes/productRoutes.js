const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/")
  .post(productController.createProduct)
  .get(productController.getProduct);

router.route("/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)
  .get(productController.getProduct);

module.exports = router;