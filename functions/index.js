const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// create function
// addAdminRole is the name of the fn
exports.addAdminRole = functions.https.onCall(async (data, context) => {
  // context contain info about the user ==> so that can be used to check if user is admin

  //   if (context.auth.token.admin !== true) {
  //     return { error: "only admin can add other admins" };
  //   }

  const docRef = admin
    .firestore()
    .collection("personalInfo")
    .doc("about");

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      return {
        error: "App has been initialized, no re-initialization is allowed.",
      };
    }

    // get user and add custom claim (admin)
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    // create user collection
    await docRef.set({
      name: data.name,
      interests: [],
    });

    return {
      message: `Success! ${data.email} has been made as admin.`,
    };
  } catch (err) {
    console.log(err);
  }
});
