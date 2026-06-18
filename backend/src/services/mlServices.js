const axios =
require("axios");

exports.predictPCOS =
async(formData)=>{

 const response =
 await axios.post(

  `${process.env.ML_API}/predict`,

  formData

 );

 return response.data;

};