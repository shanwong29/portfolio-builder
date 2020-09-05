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

    // Add user
    const user = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    });
    // here the user is already signuped & logined, if not specified, firebase assign a uuid to this user

    // get user and add custom claim (admin)
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    // create user collection
    await docRef.set({
      name: data.displayName,
      interests: [],
    });

    return {
      message: `Success!\n${data.email} has been set as admin account.`,
    };
  } catch (err) {
    return {
      error: `${err}`,
    };
  }
});
