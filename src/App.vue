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

    try {
      //check if this user is a admin when page is loaded and everytime when there is auth changes
      auth.onAuthStateChanged(async user => {
        if (user) {
          console.log("login user:", user);
          if (this.$route.name === "admin") {
            this.$router.push({ name: "mainPage" });
          }
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
  }
};
</script>
<style>
#app {
  background-color: var(--v-background-lighten1);
  color: var(--v-text-base);
}

html {
  scroll-behavior: smooth;
}
</style>
