const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoutes=require("./routes/auth.Routes");
const mongoose = require("mongoose");
const expenseRoutes = require("./routes/expense.Routes");
const app = express()


app.use(bodyParser.json());


  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/expenses", expenseRoutes);

app.use("/auth",authRoutes);


app.listen(3000 , ()=>{
console.log("server is running at: port 3000");

})