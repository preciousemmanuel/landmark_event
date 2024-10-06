// tests/ticket.test.js
const request = require('supertest');
const app = require('../src/app');
const { Event } = require('../src/models');

describe('Ticket Booking', () => {
  test('should book a ticket if available', async () => {
    const event = await Event.create({
      name: 'Concert',
      date: new Date(),
    //   totalTickets: 100,
      availableTickets: 100,
    });

    const response = await request(app)
      .post('/ticket/book')
      .send({ "name":"Emmanuel Precious",
    "email":"emmaprechi23@gmail.com",
    "eventId": event.id,
    "qauntity":5});

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('booked');
  });

  test('should fail if no tickets are available', async () => {
    const event = await Event.create({
      name: 'Concert',
      date: new Date(),
      totalTickets: 0,
      availableTickets: 0,
    });

    const response = await request(app)
      .post('/ticket/book')
      .send({ "name":"Emmanuel Precious",
      "email":"emmaprechi23@gmail.com",
      "eventId": event.id,
      "qauntity":5});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No tickets available');
  });
});
