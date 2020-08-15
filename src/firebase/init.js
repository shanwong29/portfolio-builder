import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyDWeZQ16XTYHBvqzPhduxxA02lmVkz4ruI",
  authDomain: "vue-profolio.firebaseapp.com",
  databaseURL: "https://vue-profolio.firebaseio.com",
  projectId: "vue-profolio",
  storageBucket: "vue-profolio.appspot.com",
  messagingSenderId: "994884099448",
  appId: "1:994884099448:web:50d42673a0f0c6de3f3c8d",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();
export const storage = firebase.storage();
