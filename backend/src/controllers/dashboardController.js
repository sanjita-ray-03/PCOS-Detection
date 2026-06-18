const db = require("../config/firebase");

exports.getDashboardData = async (req, res) => {

  try {

    const userDoc = await db
      .collection("users")
      .doc(req.user.id)
      .get();

    const userData = userDoc.data();

    const assessmentsSnapshot =
      await db
        .collection("users")
        .doc(req.user.id)
        .collection("assessments")
        .get();

    const assessments =
      assessmentsSnapshot.docs.map(
        doc => doc.data()
      );

    let bmi = 0;

    if (
      userData.height &&
      userData.weight
    ) {

      bmi =
        userData.weight /
        (
          (userData.height / 100) *
          (userData.height / 100)
        );

      bmi = bmi.toFixed(1);
    }

    const totalAssessments =
      assessments.length;

    const latestAssessment =
      assessments.length > 0
        ? assessments[assessments.length - 1]
        : null;

    res.status(200).json({

      bmi,

      totalAssessments,

      lastRisk:
        latestAssessment?.riskLevel ||
        "No Assessment",

      name:
        userData.name

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};