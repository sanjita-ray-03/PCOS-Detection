const express =
require("express");

const router =
express.Router();

const {
 signup,
 login
}
=
require(
 "../controllers/authController"
);

const signupValidator =
require(
 "../validators/signupValidator"
);

const loginValidator =
require(
 "../validators/loginValidator"
);

const validateMiddleware =
require(
 "../middleware/validateMiddleware"
);


const authMiddleware =
require("../middleware/authMiddleware");

const {
  getProfile
} =
require("../controllers/authController");


router.post(
 "/signup",
 signup
);

router.post(
 "/login",
 login
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

module.exports =
router;