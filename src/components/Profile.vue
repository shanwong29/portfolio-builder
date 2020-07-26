<template>
  <div>
    <Navbar :isAdmin="isAdmin" />
    <About v-bind:profilePicUrl="profilePicUrl" :firestoreBasicInfo="firestoreBasicInfo" />
    <EditPopUp
      v-if="isAdmin"
      :firestoreBasicInfo="firestoreBasicInfo"
      :dbProjectsData="dbProjectsData"
      :githubData="githubData"
    />
    <Projects v-bind:githubData="githubData" :dbProjectsData="dbProjectsData" />
    <Contact v-bind:githubUrl="githubUrl" :firestoreBasicInfo="firestoreBasicInfo" />
  </div>
</template>

<script>
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Navbar from "./Navbar";
import { auth, db } from "../firebase/init";
import EditPopUp from "./EditPopUp";

import axios from "axios";

export default {
  //is an object
  components: { About, Projects, Contact, Navbar, EditPopUp },
  data() {
    return {
      githubData: [], //unlike react, all states need to be initialized here before used
      profilePicUrl: "",
      githubUrl: "",
      firestoreBasicInfo: {},
      dbProjectsData: {},
      isAdmin: false
    };
  },

  async created() {
    //get data from github
    const { data } = await axios.get(
      "https://api.github.com/users/shanwong29/repos?per_page=100&sort=created&direction=desc"
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

    const projectsSnapshot = await db.collection("projects").get();

    projectsSnapshot.forEach(doc => {
      this.dbProjectsData[doc.id] = { ...doc.data() };
    });

    console.log("here", this.dbProjectsData);

    //check if this user is a admin when page is loaded and everytime when there is auth changes
    await auth.onAuthStateChanged(user => {
      if (user) {
        // user.getIdTokenResult() return a promise
        console.log("login user:", user);
        user.getIdTokenResult().then(idTokenResult => {
          if (idTokenResult.claims.admin) {
            this.isAdmin = true;
          }
        });
      } else {
        this.isAdmin = false;
      }
    });
  }
};
</script>

<style></style>
