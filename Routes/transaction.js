const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../Controllers/expenseManager");
const router = express.Router();

router.post("/add", addTransaction);
router.delete("/delete/:id", deleteTransaction);
router.get("/getAllTransactions", getAllTransactions);
router.put("/update/:id", updateTransaction);

module.exports = router;
