<template>
  <div>
    <Navbar />
    <About v-bind:profilePicUrl="profilePicUrl" />
    <component :is="displayEditCmp" :firestoreBasicInfo="firestoreBasicInfo"></component>
    <Projects v-bind:githubData="githubData" />
    <Contact v-bind:githubUrl="githubUrl" />
  </div>
</template>

<script>
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Navbar from "./Navbar";
import { auth, db } from "../firebase/init";
import EditAbout from "./EditAbout";

import axios from "axios";

export default {
  //is an object
  components: { About, Projects, Contact, Navbar, EditAbout },
  data() {
    return {
      githubData: [], //unlike react, all states need to be initialized here before used
      profilePicUrl: "",
      githubUrl: "",
      displayEditCmp: "",
      firestoreBasicInfo: {}
    };
  },

  async created() {
    //get data from github
    const { data } = await axios.get(
      "https://api.github.com/users/shanwong29/repos?sort=created&direction=desc"
    );

    this.githubData = data.filter(el => el.fork === false);

    this.profilePicUrl = data[data.length - 1].owner.avatar_url;
    this.githubUrl = data[data.length - 1].owner.html_url;

    // get data from firestore
    const snapshot = await db.collection("about").get();

    snapshot.forEach(doc => {
      this.firestoreBasicInfo = doc.data();
      this.firestoreBasicInfo.docId = doc.id;
    });

    //check if this user is a admin when page is loaded and everytime when there is auth changes
    await auth.onAuthStateChanged(user => {
      if (user) {
        // user.getIdTokenResult() return a promise
        console.log(user);
        user.getIdTokenResult().then(idTokenResult => {
          if (idTokenResult.claims.admin) {
            this.displayEditCmp = "EditAbout";
          }
          //  user.admin = idTokenResult.claims.admin;
        });
      } else {
        this.displayEditCmp = "";
      }
    });
  }
};
</script>

<style></style>
