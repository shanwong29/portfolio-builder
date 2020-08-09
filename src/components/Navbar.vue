<template>
  <v-app-bar fixed min-width="100%">
    <v-btn class="mx-1" to="/" text small color="primary" v-if="!isMainPage">
      <v-icon :size="16" class="mr-1">mdi-home</v-icon>Home
    </v-btn>
    <div v-else>
      <v-btn class="mx-1" href="/#about" text small color="primary">
        <v-icon :size="16" class="mr-1">mdi-heart</v-icon>About
      </v-btn>
      <v-btn class="mx-1" href="/#projects" text small color="primary">
        <v-icon :size="16" class="mr-1">mdi-briefcase</v-icon>Projects
      </v-btn>
      <v-btn class="mx-1" href="/#contact" text small color="primary">
        <v-icon :size="16" class="mr-1">mdi-phone-classic</v-icon>Contact
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div v-if="isAdmin">
      <v-btn color="primary" class="ma-2" dark @click="toogleEditPopUp"
        >Edit</v-btn
      >

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="logout">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </div>
  </v-app-bar>
</template>

<script>
import { auth } from "../firebase/init";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  methods: {
    logout() {
      auth.signOut().then(() => {
        console.log("logout");
      });
    },
    toogleEditPopUp() {
      this.$store.commit({ type: "toogleEditPopUp" });
    },
  },
  computed: {
    ...mapState(["isAdmin"]),
    isMainPage() {
      return this.$route.name === "mainPage";
    },
  },
};
</script>

<style scoped></style>
