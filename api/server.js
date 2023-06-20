const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware");
const { verifyToken, checkRole } = authMiddleware;

const app = express();
const cors = require("cors");
const port = 5000;

dotenv.config();

// routes
const authRoute = require("./routes/auth");
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
const restaurantInfoRoute = require("./routes/restaurantInfos.js");
const reservationRoute = require("./routes/reservations.js");
const rezerveRoute = require("./routes/rezervePopup.js");
const salesRoute = require("./routes/salesReport.js");
const productSalesReportRoute = require("./routes/productSalesReport.js");
const orderRoute = require("./routes/orders.js");
const orderPlacedRoute = require("./routes/ordersPlaced.js");
const userRoute = require("./routes/user.js");
const printersRoute = require("./routes/printers.js");

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

app.use("/api/auth", authRoute);
app.use("/api/categories", verifyToken, checkRole(["admin"]), categoryRoute);
app.use("/api/products", verifyToken, checkRole(["admin"]), productRoute);
app.use("/api/tickets", verifyToken, ticketRoute);
app.use("/api/details", verifyToken, detailRoute);
app.use("/api/incomes", verifyToken, incomesRoute);
app.use("/api/expenses", verifyToken, expensesRoute);
app.use("/api/transactions", verifyToken, dayTransactionsRoute);
app.use("/api/refund-and-cancel", verifyToken, refundsAndCancellationsRoute);
app.use("/api/table-info", verifyToken, tableInfoRoute);
app.use("/api/table-payment", verifyToken, tablePaymentRoute);
app.use("/api/restaurants", verifyToken, restaurantInfoRoute);
app.use("/api/reservations", verifyToken, reservationRoute);
app.use("/api/rezerve", verifyToken, rezerveRoute);
app.use("/api/sales", verifyToken, salesRoute);
app.use("/api/product-sales", verifyToken, productSalesReportRoute);
app.use("/api/orders", verifyToken, orderRoute);
app.use("/api/orders-placed", verifyToken, orderPlacedRoute);
app.use("/api/users", verifyToken, userRoute);
app.use("/api/printers", verifyToken, printersRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
