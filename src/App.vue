<template>
  <v-app id="app">
    <Navbar />
    <v-container fluid class="pa-0">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import axios from "axios";
import { auth } from "./firebase-config/init";

export default {
  components: { Navbar },
  name: "App",
  async created() {
    const theme = localStorage.getItem("isDarkMode");
    if (theme === "true") {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }

    // get data from github
    const githubRepoApi = `https://api.github.com/users/${process.env.VUE_APP_GITHUB_USERNAME}/repos`;
    const { data } = await axios.get(githubRepoApi, {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc"
      }
    });

    this.$store.commit({ type: "setGithubData", data });
    try {
      //check if this user is a admin when page is loaded and everytime when there is auth changes
      auth.onAuthStateChanged(async user => {
        if (user) {
          console.log("login user:", user);
          const idTokenResult = await user.getIdTokenResult();
          if (idTokenResult.claims.admin) {
            this.$store.commit({ type: "setIsAdmin", isAdmin: true });
          }
        } else {
          this.$store.commit({ type: "setIsAdmin", isAdmin: false });
        }
      });
    } catch (err) {
      console.log(err);
    }
    // get data from firestore
    this.$store.dispatch("getDbAbout");
    this.$store.dispatch("getDbProjects");
    this.$store.dispatch("getDbContact");
  }
};
</script>
<style>
#app {
  background-color: var(--v-background-base);
  color: var(--v-text-base);
}

html {
  scroll-behavior: smooth;
}
</style>
