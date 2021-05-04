import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";
import "@firebase/functions";

let firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

if (location.hostname === "localhost") {
  db.settings({ experimentalForceLongPolling: true });
  db.useEmulator("localhost", 8081);
  auth.useEmulator("http://localhost:9099");
  functions.useEmulator("localhost", 5001);
}

export { db, auth, functions };

export const storage = firebase.storage();
