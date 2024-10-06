const {User} = require("@models")

const createUser=async(name,email,transaction)=>{
   
   try {
     return await User.create({
      name,
      email
     },{transaction});
   } catch (error) {
    console.log(error)
      throw new Error(error.message||error.toString);
   }
}



 module.exports={
    createUser
 }