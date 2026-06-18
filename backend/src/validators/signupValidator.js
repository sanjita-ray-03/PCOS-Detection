const { body } =
require("express-validator");

module.exports = [

 body("name")
 .trim()
 .notEmpty()
 .withMessage("Name is required"),

 body("email")
 .isEmail()
 .withMessage("Valid email required"),

 body("age")
 .isInt({
  min:15,
  max:60
 })
 .withMessage("Age must be between 15 and 60"),

 body("ageGroup")
 .notEmpty()
 .withMessage("Age Group required"),

 body("height")
 .isFloat({
  min:100,
  max:250
 })
 .withMessage("Height required"),

 body("weight")
 .isFloat({
  min:20,
  max:300
 })
 .withMessage("Weight required"),

 body("password")
 .isLength({
  min:6
 })
 .withMessage(
  "Password minimum 6 characters"
 ),

 body("confirmPassword")
 .notEmpty()
 .withMessage(
  "Confirm password required"
 )

];