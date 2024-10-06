
const { Event, Ticket,User, Waitlist, sequelize } = require("@models");
const WaitService = require("@services/waitlist.service");
const EventService = require("@services/event.service");
const UserService = require("@services/user.service");
const logger = require("@utils/logger");
const { generateUniqueId } = require("@utils/helper");

const bookTicket = async (eventId, quantity,name,email) => {
  logger.log("info",`bookticketpayload ${JSON.stringify({eventId,quantity,name,email})}`)
  const transaction = await sequelize.transaction();
  try {
    // Lock the event row so no one else can modify it until the transaction finishes
    const event = await Event.findOne({
      where: { id: eventId },
      lock: transaction.LOCK.UPDATE
    },);

    if (!event) {
      throw new Error('Event does not exist');
    }


    //create user
    const user=await UserService.createUser(name,email,transaction);

    console.log("usersda",user);

    // Check if there are tickets available, if no put user in waitlist
    if (event.ticketsAvailable <= 0 || event.ticketsAvailable < quantity) {

      //add user to wait list
      await WaitService.addToWaitList(eventId, user.id, quantity);
      throw new Error('No tickets available now. You have been added to waitlist');
    }


    event.ticketsAvailable -= quantity;
    await event.save({ transaction });
    
    const orderId=`LADMARK${generateUniqueId(7)}`;
    //create ticket
    const ticket = await Ticket.create({
      userId:user.id,
      orderId,
      eventId,
      quantity
    }, { transaction });
    transaction.commit();

    return ticket

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const cancelOrder = async (orderId) => {
  const transaction = await sequelize.transaction();
  try {
    const cancelledticket = await Ticket.findOne({
      where: { orderId },
      lock: transaction.LOCK.UPDATE
    });
    if (!cancelledticket) {
      throw new Error('No ticket available');
    }

    if (cancelledticket.isCancelled) {
      throw new Error('Ticket is already cancelled');
    }

    cancelledticket.isCancelled = true;

    //get wailist user and assign ticket to
    const wailists = await WaitService.findActiveWaitlist(cancelledticket.eventId);


    let waitListTickt = null;
    for (const waitlist of wailists) {
      if (waitlist.quantity <= cancelledticket.ticketsAvailable) {
        waitListTickt = waitlist;
        return;
      }
    }

    if (waitListTickt) {
      const orderId=`LADMARK${generateUniqueId(7)}`;
      //create ticket
      const ticket = await Ticket.create({
        orderId,
        userId: waitListTickt.userId,
        eventId: cancelledticket.eventId,
        quantity: waitListTickt.quantity
      }, { transaction });
      //
    } else {
      //if no body to assign, the event available field should be updated

      const event = await EventService.findEventById(cancelledticket.eventId);
      if (event) {
        console.log("dsiiisdce");
        event.ticketsAvailable += cancelledticket.quantity;
        await event.save({ transaction });
      }

      console.log("reveres ticketavailable")
    }

    await cancelledticket.save({ transaction });

    transaction.commit();
    return true;


  } catch (error) {
    await transaction.rollback();

    throw error;
  }
}

const getTikects=async(eventId)=>{
  try {
    return Ticket.findAll({where:{
      eventId
    },
  include:[{
    model: Event,
  },{
    model:User
  }
]
  });
  } catch (error) {
    console.log("error fetching event",error)
    throw new Error(error.message|| error.toString())
  }   
 }

module.exports = {
  bookTicket,
  cancelOrder,
  getTikects
}