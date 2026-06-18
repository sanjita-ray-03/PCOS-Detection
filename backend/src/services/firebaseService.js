const db =
require("../config/firebase");

exports.getUserByEmail =
async(email)=>{

 const snapshot =
 await db
 .collection("users")
 .where(
  "email",
  "==",
  email
 )
 .get();

 return snapshot;
};

exports.getUserById =
async(id)=>{

 return await db
 .collection("users")
 .doc(id)
 .get();

};