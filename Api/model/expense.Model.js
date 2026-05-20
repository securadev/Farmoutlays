const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Diesel",
        "Seeds",
        "Fertilizer",
        "Labor",
        "Equipment",
        "Electricity",
        "Transport",
        "Other",
      ],
      default: "Other",
    },

    description: {
      type: String,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);