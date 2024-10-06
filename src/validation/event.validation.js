const Joi =require("joi")

const createEvent = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().iso().required(),
    ticketsAvailable: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required()
  });

  const bookEvent = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(10).required(),
    eventId: Joi.number().required(),
    qauntity: Joi.number().integer().required(),
  });

  const cancelEvent = Joi.object({
  
    eventId: Joi.number().required(),

  });

  module.exports={
    createEvent,
    bookEvent,
    cancelEvent
  }