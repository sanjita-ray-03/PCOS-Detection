const {
 body
} =
require(
 "express-validator"
);

module.exports = [

 body("email")
 .isEmail()
 .withMessage(
  "Valid email required"
 ),

 body("password")
 .notEmpty()
 .withMessage(
  "Password required"
 )

];