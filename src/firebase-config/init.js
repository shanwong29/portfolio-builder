import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";
import "@firebase/functions";

const isTestEnv = process.env.NODE_ENV !== "production";
let initialized = false;

let firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

const config = isTestEnv
  ? {
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      apiKey: "fake-api-key",
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
    }
  : firebaseConfig;

if (!initialized) {
  firebase.initializeApp(config);
  initialized = true;
}

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();
const storage = firebase.storage();

if (isTestEnv) {
  db.settings({ experimentalForceLongPolling: true });
  db.useEmulator("localhost", 8081);
  auth.useEmulator("http://localhost:9099");
  functions.useEmulator("localhost", 5001);
  storage.useEmulator("localhost", 9199);
}

export { db, auth, functions, storage };
