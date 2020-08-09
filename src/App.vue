<template>
  <v-app>
    <Navbar />
    <v-container fluid class="content">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import axios from "axios";
import { auth } from "./firebase/init";
export default {
  components: { Navbar },
  name: "App",
  async created() {
    // get data from github
    const { data } = await axios.get(
      "https://api.github.com/users/shanwong29/repos?per_page=100&sort=created&direction=desc"
    );

    this.$store.commit({ type: "setGithubData", data });

    //check if this user is a admin when page is loaded and everytime when there is auth changes
    await auth.onAuthStateChanged(async user => {
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

    // get data from firestore
    this.$store.dispatch("getDbBasicInfo");
    this.$store.dispatch("getDbProjects");
  }
};
</script>
<style>
@media (min-width: 600px) {
  .content {
    width: 70%;
  }
}
</style>
