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

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
