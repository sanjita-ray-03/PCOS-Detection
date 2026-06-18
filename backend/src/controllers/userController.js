const db =
require("../config/firebase");

exports.updateProfile =
async (req,res)=>{

 try{

  const {

   name,
   age,
   ageGroup,
   height,
   weight

  } = req.body;

  await db
  .collection("users")
  .doc(req.user.id)
  .update({

   name,
   age,
   ageGroup,
   height,
   weight,

   updatedAt:
   new Date()

  });

  res.status(200)
  .json({

   message:
   "Profile Updated"

  });

 }catch(error){

  res.status(500)
  .json({

   message:
   error.message

  });

 }

};