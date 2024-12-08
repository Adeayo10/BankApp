const express = require("express");
const authenticateToken = require("../middleware/middleware");
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.post("/create", authenticateToken, createCustomer);
router.get("/all", authenticateToken, getCustomers);
router.get("/:id", authenticateToken, getCustomerById);
router.put("/:id", authenticateToken, updateCustomer);
router.delete("/:id", authenticateToken, deleteCustomer);

module.exports = router;
