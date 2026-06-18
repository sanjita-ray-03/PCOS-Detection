const db =
require("../config/firebase");

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

      name: user.name,

      email: user.email,

      age: user.age,

      ageGroup: user.ageGroup,

      height: user.height,

      weight: user.weight

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        "Failed to fetch profile"

    });

  }

};