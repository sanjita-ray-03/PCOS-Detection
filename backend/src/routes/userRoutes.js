const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
 updateProfile
}
=
require(
 "../controllers/userController"
);

router.put(
 "/update-profile",
 authMiddleware,
 updateProfile
);

module.exports =
router;