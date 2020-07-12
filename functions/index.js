const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// create function
// addAdminRole is the name of the fn
exports.addAdminRole = functions.https.onCall((data, context) => {
  //get user and add custom claim (admin)
  // context contain info about the user ==> so that can be used to check if user is admin

  //   if (context.auth.token.admin !== true) {
  //     return { error: "only admin can add other admins" };
  //   }

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made as admin.`,
      };
    })
    .catch((err) => {
      console.log(err);
    });
});
