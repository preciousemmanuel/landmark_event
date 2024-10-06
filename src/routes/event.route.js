const { createEvent, eventStatus } = require('@controllers/event.controller');
const { validate } = require('@middlewares/validation.middleware');

const EventValidation = require('@validation/event.validation');
const express = require('express');


const router = express.Router();


router.post("/initialize",validate(EventValidation.createEvent),createEvent);
router.get("/status/:eventId",eventStatus);

module.exports=router;