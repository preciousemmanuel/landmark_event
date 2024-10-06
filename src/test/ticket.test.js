const request = require('supertest');
const app = require('../app');  // Express app
const { Ticket, Event } = require('../models');  // Sequelize models

jest.mock('../models');  // Mock the Sequelize models

describe('POST /ticket/book', () => {
  it('should successfully book a ticket', async () => {
    // const mockEvent = { id: 1, ticketsAvailable: 10, save: jest.fn() };
    // const mockTicket = { id: 1, userId: 1, eventId: 1 };

    // Mock the Event and Ticket models
    // Event.findOne.mockResolvedValue(mockEvent);
    // Ticket.create.mockResolvedValue(mockTicket);

    const response = await request(app)
      .post('/ticket/book')
      .send({
        "name":"Emmanuel Precious",
        "email":"emmaprechi23@gmail.com",
        "eventId":1,
        "qauntity":1
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Ticket booked successfully');
    expect(mockEvent.save).toHaveBeenCalled();  // Ensure the event's save method was called
  });

//   it('should return an error when no tickets are available', async () => {
//     const mockEvent = { id: 1, qauntity: 10 };

//     // Mock the Event model to simulate no available tickets
//     Event.findOne.mockResolvedValue(mockEvent);

//     const response = await request(app)
//       .post('/events/1/book')
//       .send({ userId: 1 });

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('No tickets available');
//   });
});
