<template>
  <div>
    <a href="/#about">About</a>
    <a href="/#projects">Projects</a>
    <a href="/#contact">Contact</a>
    <Button @click="logout">Logout</Button>
  </div>
</template>

<script>
import { auth } from "../firebase/init";
export default {
  name: "Navbar",
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
div {
  position: fixed;
  z-index: 1;
}
</style>