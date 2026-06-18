const db =
require("../config/firebase");

const axios =
require("axios");

exports.predictPCOS =
async (req,res)=>{

 try{

  const mlResponse =
  await axios.post(

   "http://localhost:5000/predict",

   req.body

  );

  const prediction =
  mlResponse.data;

  await db
   .collection("users")
   .doc(req.user.id)
   .collection("assessments")
   .add({

    ...req.body,

    prediction:
    prediction.prediction,

    probability:
    prediction.probability,

    riskLevel:
    prediction.riskLevel,

    createdAt:
    new Date()

   });

  res.status(200).json(
   prediction
  );

 }
 catch(error){

  console.log(error);

  res.status(500).json({

   message:error.message

  });

 }

};


exports.getHistory =
async (req,res)=>{

 try{

 const snapshot =
 await db
 .collection("users")
 .doc(req.user.id)
 .collection("assessments")
 .orderBy(
  "createdAt",
  "desc"
 )
 .get();

 const history =
snapshot.docs.map(doc => {

  const data = doc.data();

  return {

    id: doc.id,

    ...data,

    createdAt:
      data.createdAt
      ? data.createdAt.toDate()
      : null

  };

});

 res.json(history);

 }catch(error){

 res.status(500)
 .json({
  message:error.message
 });

 }

};
const {
 hashPassword,
 comparePassword
}
=
require(
 "../utils/hashPassword"
);