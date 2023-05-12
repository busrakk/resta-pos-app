const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const port = 5000;

dotenv.config();

// routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const ticketRoute = require("./routes/numberOfTickets.js");
const detailRoute = require("./routes/productsDetail.js");
const incomesRoute = require("./routes/incomes.js");
const expensesRoute = require("./routes/expenses.js");
const dayTransactionsRoute = require("./routes/dayTransactions.js"); 
const refundsAndCancellationsRoute = require("./routes/refundsAndCancellations.js");
const tableInfoRoute = require("./routes/tableInfos.js");
const tablePaymentRoute = require("./routes/tablePayments.js"); 

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

// middleware
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/details", detailRoute);
app.use("/api/incomes", incomesRoute);
app.use("/api/expenses", expensesRoute);
app.use("/api/transactions", dayTransactionsRoute);
app.use("/api/refund-and-cancel", refundsAndCancellationsRoute);
app.use("/api/table-info", tableInfoRoute);
app.use("/api/table-payment", tablePaymentRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
