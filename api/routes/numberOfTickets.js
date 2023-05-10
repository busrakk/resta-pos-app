const Ticket = require("../models/NumberOfTickets");
const express = require("express");
const router = express.Router();

router.post("/add-ticket", async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json({
      status: "success",
      message: "Ticket added successfully",
      data: newTicket,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); // create ticket

router.get("/get-tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    // res.send(tickets)
    res.status(200).json({
      status: "success",
      message: "Tickets listed successfully",
      data: tickets,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}); // get all tickets

module.exports = router;