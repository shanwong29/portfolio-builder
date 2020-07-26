<template>
  <v-app-bar fixed min-width="100%">
    <v-btn class="mx-1" to="/" text small color="primary">
      <v-icon :size="16" class="mr-1">mdi-home</v-icon>Home
    </v-btn>

    <v-btn class="mx-1" href="/#about" text small color="primary">
      <v-icon :size="16" class="mr-1">mdi-heart</v-icon>About
    </v-btn>
    <v-btn class="mx-1" href="/#projects" text small color="primary">
      <v-icon :size="16" class="mr-1">mdi-briefcase</v-icon>Projects
    </v-btn>
    <v-btn class="mx-1" href="/#contact" text small color="primary" @click="logout">
      <v-icon :size="16" class="mr-1">mdi-phone-classic</v-icon>Contact
    </v-btn>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="logout">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import { auth } from "../firebase/init";
export default {
  name: "Navbar",
  props: ["isAdmin"],
  methods: {
    logout() {
      auth.signOut().then(() => {
        console.log("logout");
      });
    }
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  z-index: 1;
}
</style>
