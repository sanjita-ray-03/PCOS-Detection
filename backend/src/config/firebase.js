const admin = require("firebase-admin");

console.log("Loading Firebase...");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

console.log(serviceAccount.project_id);
console.log(serviceAccount.client_email);

serviceAccount.private_key =
  serviceAccount.private_key.replace(
    /\\n/g,
    "\n"
  );

admin.initializeApp({
  credential: admin.credential.cert(
    serviceAccount
  )
});

const db = admin.firestore();

db.collection("test")
  .limit(1)
  .get()
  .then(() => {
    console.log("Firestore Connected");
  })
  .catch(err => {
    console.error("Firestore Error:", err);
  });

module.exports = db;