const Expense = require("../model/expense.Model");


// ADD EXPENSE
exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL EXPENSES
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.user.id,
    }).sort({ expenseDate: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE EXPENSE
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE EXPENSE
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MONTHLY EXPENSE REPORT
exports.getMonthlyExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 1);

    const expenses = await Expense.find({
      userId: req.user.id,
      expenseDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    res.status(200).json({
      success: true,
      totalExpense,
      totalRecords: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};