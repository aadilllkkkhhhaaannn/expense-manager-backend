const expressAsyncHandler = require("express-async-handler");
const Transaction = require("../Model/transactionSchema");

const addTransaction = expressAsyncHandler(async (req, res) => {
  const { title, amount, type } = req.body;

  if (!title || !amount || !type) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const transaction = await Transaction.create({
      title,
      amount,
      type,
    });

    res.status(200).json(transaction);
  } catch (error) {
    console.log("Add Transaction Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// getAllTransactions
const getAllTransactions = expressAsyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// deleteTransaction
const deleteTransaction = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// updateTransaction
const updateTransaction = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // res.status(200).json(transaction);
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
};
