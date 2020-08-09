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
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

import EditPopUp from "./EditPopUp";
import { mapState } from "vuex";

export default {
  //is an object
  components: { About, Projects, Contact, EditPopUp },
  data() {
    return {
      // firestoreBasicInfo: {},
      // dbProjectsData: {}
    };
  },

  computed: {
    ...mapState(["isAdmin"])
  }

  // async created() {}
};
</script>

<style>
.profile {
  scroll-behavior: smooth;
}
</style>
