function BMIBox({
 height,
 weight
}) {

 const bmi =
 (
  weight /
  ((height/100)*
  (height/100))
 ).toFixed(1);

 return (

 <div className="bg-pink-100 p-5 rounded-lg">

  <h3 className="font-bold text-lg">
   BMI
  </h3>

  <p className="text-3xl">
   {bmi}
  </p>

 </div>

 );
}

export default BMIBox;