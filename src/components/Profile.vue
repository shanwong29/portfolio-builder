<template>
  <div>
    <EditPopUp v-if="isAdmin" />
    <About />
    <v-divider></v-divider>

    <Projects />
    <v-divider></v-divider>

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
    ...mapState(["isAdmin"])
  }
};
</script>

<style>
</style>
