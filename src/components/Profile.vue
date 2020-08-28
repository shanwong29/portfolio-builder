<template>
  <div>
    <EditPopUp v-if="isAdmin" />
    <div id="about" class="section">
      <About />
    </div>
    <v-divider></v-divider>
    <div id="projects" class="section">
      <Projects />
    </div>
    <v-divider></v-divider>
    <div id="contact" class="section">
      <Contact />
    </div>
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

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

#projects {
  background-color: var(--v-projectsBkg-base);
}

.theme--light.v-divider {
  border-color: var(--v-projectsBkg-base) !important;
}

.section {
  padding: 30px 15px;
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .section {
    padding: 64px 12vw;
  }
}
</style>
