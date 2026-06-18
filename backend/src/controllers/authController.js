const db = require("../config/firebase");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const generateToken =
require("../utils/generateToken");

exports.signup =
async(req,res)=>{

 try{

 const {

  name,
  email,
  age,
  ageGroup,
  height,
  weight,
  password,
  confirmPassword

 } = req.body;

 if(
  password !==
  confirmPassword
 ){

 return res.status(400)
 .json({

  message:
  "Passwords do not match"

 });

 }

 const existingUser =
 await db
 .collection("users")
 .where(
  "email",
  "==",
  email
 )
 .get();

 if(
  !existingUser.empty
 ){

 return res.status(400)
 .json({

  message:
  "Email already exists"

 });

 }

 const hashedPassword =
 await bcrypt.hash(
  password,
  12
 );

 const userRef =
 await db
 .collection("users")
 .add({

  name,

  email,

  age,

  ageGroup,

  height,

  weight,

  password:
  hashedPassword,

  role:"user",

  createdAt:
  new Date(),

  updatedAt:
  new Date()

 });

 const token =
 generateToken(
  userRef.id
 );

 res.status(201)
 .json({

  token,

  userId:
  userRef.id

 });

 }catch(error){

 res.status(500)
 .json({

  message:
  error.message

 });

 }

};

exports.login =
async(req,res)=>{

 const {
  email,
  password
 } = req.body;

 const snapshot =
 await db
 .collection("users")
 .where(
  "email",
  "==",
  email
 )
 .get();

 if(snapshot.empty){

  return res.status(404)
  .json({
   message:
   "User Not Found"
  });

 }

 const user =
 snapshot.docs[0];

 const userData =
 user.data();

 const match =
 await bcrypt.compare(
  password,
  userData.password
 );

 if(!match){

  return res.status(400)
  .json({
   message:
   "Wrong Password"
  });

 }



const token = jwt.sign(

  {
    id: user.id,
    email: userData.email,
    role: userData.role || "user"
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "7d"
  }

);

 res.json({

  token,

  userId:
  user.id

 });

};


exports.getProfile =
async (req, res) => {

  try {

    const userDoc =
    await db
      .collection("users")
      .doc(req.user.id)
      .get();

    if (!userDoc.exists) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const user =
    userDoc.data();

    res.status(200).json({

      id: userDoc.id,

      name: user.name,

      email: user.email,

      age: user.age,

      ageGroup: user.ageGroup,

      height: user.height,

      weight: user.weight

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message

    });

  }

};
