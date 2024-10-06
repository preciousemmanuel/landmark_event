const { errorMiddleware } = require('@middlewares/error.middleware');
const eventRoutes = require('@routes/event.route');
const tiketRoutes = require('@routes/ticket.route');
const express = require('express');

const morgan = require('morgan');




const app = express();
app.use(morgan("dev"));

// Middleware
app.use(express.json());

app.use(errorMiddleware);

app.use("/event",eventRoutes);
app.use("/ticket",tiketRoutes);

module.exports = app;