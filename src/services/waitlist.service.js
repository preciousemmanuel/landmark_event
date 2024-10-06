const {Waitlist} = require("@models");
const logger = require("@utils/logger");

const addToWaitList=async(eventId,userId,quantity)=>{
   
   try {
     return await Waitlist.create({eventId,userId,quantity});
   } catch (error) {
    logger.log("error",`Cannot create waitlist`)
      throw new Error(error.message||error.toString);
   }
}


const findActiveWaitlist=async(eventId)=>{
   
    try {
      return await Waitlist.findAll({where:{isDeleted:false,eventId}});
    } catch (error) {
       throw new Error(error.message||error.toString);
    }
 }

module.exports={
    addToWaitList,
    findActiveWaitlist
}