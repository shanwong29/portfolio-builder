const firebase = require("@firebase/rules-unit-testing");
const fs = require("fs");
var assert = require("assert");

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
const MY_PROJECT_ID = "shanwong";

describe("firebase", () => {
  let db;
  before(function() {
    // runs once before the first test in this block

    // db = firebase
    //   .initializeTestApp({
    //     projectId: MY_PROJECT_ID,
    //     auth: { uid: "alice", email: "alice@example.com" }
    //   })
    //   .firestore();
    firebase.loadFirestoreRules({
      projectId: MY_PROJECT_ID,
      rules: fs.readFileSync("./security-rules/firestore.rules", "utf8")
    });

    app.firestore();
  });
  it("public access", async () => {
    await firebase.assertSucceeds(
      db
        .collection("public")
        .doc("test-document")
        .get()
    );
  });
});
