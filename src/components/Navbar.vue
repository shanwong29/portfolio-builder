<template>
  <nav>
    <a href="/#about">About</a>
    <a href="/#projects">Projects</a>
    <a href="/#contact">Contact</a>
    <Button v-if="isAdmin" @click="logout">Logout</Button>
  </nav>
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
nav {
  position: fixed;
  z-index: 1;
}
</style>