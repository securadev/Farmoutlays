const express = require("express");

const router = express.Router();

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getMonthlyExpenses,
} = require("../controllers/expense.Controller");

const authMiddleware = require("../middleware/auth.middleware");


// ADD
router.post("/", authMiddleware, addExpense);

// GET ALL
router.get("/", authMiddleware, getExpenses);

// MONTHLY REPORT
router.get("/monthly", authMiddleware, getMonthlyExpenses);

// UPDATE
router.put("/:id", authMiddleware, updateExpense);

// DELETE
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;