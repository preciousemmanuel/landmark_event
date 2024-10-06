const {Event,Ticket,User,Waitlist} = require("@models")

const createEvent=async(title,description,date,ticketsAvailable,price)=>{
   
   try {
     return await Event.create({
      title,
      description,
      date,
      ticketsAvailable,
      price
     });
   } catch (error) {
      throw new Error(error.message||error.toString);
   }
}

const status = async (eventId) => {
  try {
    return await Event.findByPk(eventId, {
      include: [
        {
          model: Ticket,
          where: {
            isCancelled: false
          },
          include: User,
          required: false 
        }, {
          model: Waitlist
        }]
    });

  } catch (error) {
    throw new Error(error.message || error.toString);
  }

}

 const findEventById=async(eventId)=>{
  try {
    return Event.findOne({where:{
      id:eventId
    }});
  } catch (error) {
    console.log("error fetching event",error)
    return null;
  }   
 }

 module.exports={
   createEvent,
   findEventById,
   status
 }