const db =
require("../config/firebase");

const axios =
require("axios");



exports.predictPCOS = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("USER:", req.user);

    const mlResponse = await axios.post(process.env.ML_API, req.body);

    console.log("ML RESPONSE:", mlResponse.data);

    const prediction = mlResponse.data;

    if (!req.user?.id) {
      throw new Error("User ID missing (auth issue)");
    }

    if (!prediction) {
      throw new Error("ML response missing");
    }

    await db
      .collection("users")
      .doc(req.user.id)
      .collection("assessments")
      .add({
        ...req.body,
        prediction: prediction.prediction,
        probability: prediction.probability,
        riskLevel: prediction.riskLevel,
        createdAt: new Date()
      });

    res.status(200).json(prediction);

  } catch (error) {
    console.log("🔥 FULL ERROR MESSAGE:");
    console.log(error.message);

    console.log("🔥 ML ERROR RESPONSE:");
    console.log(error.response?.data);

    console.log("🔥 STACK:");
    console.log(error.stack);

    res.status(500).json({
      message: error.message,
      mlError: error.response?.data
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