<template>
  <div class="profile">
    <EditPopUp v-if="isAdmin" />
    <About />
    <hr />
    <Projects />
    <hr />
    <Contact />
  </div>
</template>

<script>
import About from "./display/About";
import Projects from "./display/Projects";
import Contact from "./display/Contact";
import EditPopUp from "./edit/EditPopUp";
import { mapState } from "vuex";

export default {
  components: { About, Projects, Contact, EditPopUp },
  computed: {
    ...mapState(["isAdmin"]),
  },
};
</script>

<style>
.profile {
  scroll-behavior: smooth;
}
</style>
