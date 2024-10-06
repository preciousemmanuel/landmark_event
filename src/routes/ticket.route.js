const { bookEvent, cancelOrder ,getEventTickets} = require('@controllers/event.controller');
const { validate } = require('@middlewares/validation.middleware');
const EventValidation = require('@validation/event.validation');
const express = require('express');


const router = express.Router();


router.post("/book",validate(EventValidation.bookEvent),bookEvent);
router.post("/cancel/:orderId",cancelOrder);
router.get("/:eventId",getEventTickets);

module.exports=router;