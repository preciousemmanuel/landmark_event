const EventService = require("@services/event.service");
const TicketService = require("@services/ticket.service");
const HttpException = require("@utils/exceptions/error.exception");
const { HTTP_SERVER_ERROR, HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK } = require("@utils/exceptions/http/codes.http");
const { responseObject } = require("@utils/exceptions/http/response.http");


const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, ticketsAvailable, price } = req.body;
        const response = await EventService.createEvent(title, description, date, ticketsAvailable, price);
        if (!response) {
            responseObject(res, HTTP_BAD_REQUEST, "error", "Cannot create event")

        }
        responseObject(res, HTTP_CREATED, "success", "Event created successfully", response)


    } catch (error) {
        console.log(error);
        // next(new HttpException(HTTP_BAD_REQUEST, error.message))
        responseObject(res, HTTP_SERVER_ERROR, "error", error.message||"Somenthing went wrong")
    }
}

const bookEvent = async (req, res, next) => {
    try {
        const { name, email, qauntity, eventId } = req.body;
        console.log(req.body);
        const response = await TicketService.bookTicket(eventId, qauntity, name, email);
        if (!response) {
            responseObject(res, HTTP_BAD_REQUEST, "error", "Cannot book event")
        }
        responseObject(res, HTTP_CREATED, "success", "Ticket booked successfully", response)

    } catch (error) {
        console.log(error);
        // next(new HttpException(HTTP_BAD_REQUEST, error.message))
        responseObject(res, HTTP_SERVER_ERROR, "error", error.message||"Something went wrong")
    }
}

const eventStatus = async (req, res, next) => {
    try {
        const { eventId} = req.params;
        const response = await EventService.status(eventId);
        if (!response) {
            responseObject(res, HTTP_BAD_REQUEST, "error", "Cannot fetch event")

        }
        responseObject(res, HTTP_CREATED, "success", "Event fetch successfully", response)


    } catch (error) {
        console.log(error);
        // next(new HttpException(HTTP_BAD_REQUEST, error.message))
        responseObject(res, HTTP_SERVER_ERROR, "error", "Somenthing went wrong")
    }
}

const cancelOrder = async (req, res, next) => {
    try {
        const { orderId} = req.params;
        const response = await TicketService.cancelOrder(orderId);
        if (!response) {
            responseObject(res, HTTP_BAD_REQUEST, "error", "Cannot cancel ticket")

        }
        responseObject(res, HTTP_CREATED, "success", "Ticket cancelled successfully", response)
    } catch (error) {
        console.log(error);
        // next(new HttpException(HTTP_BAD_REQUEST, error.message))
        responseObject(res, HTTP_SERVER_ERROR, "error",error.message|| "Somenthing went wrong")
    }
}

const getEventTickets = async (req, res, next) => {
    try {
        const { eventId} = req.params;
        const response = await TicketService.getTikects(eventId);
        if (!response) {
            responseObject(res, HTTP_BAD_REQUEST, "error", "Cannot fetch tickets");
        }
        responseObject(res, HTTP_OK, "success", "Tickets fetched successfully", response);
    } catch (error) {
        console.log(error);
        // next(new HttpException(HTTP_BAD_REQUEST, error.message))
        responseObject(res, HTTP_SERVER_ERROR, "error",error.message|| "Somenthing went wrong")
    }
}


module.exports = {
    createEvent,
    bookEvent,
    eventStatus,
    cancelOrder,
    getEventTickets
}