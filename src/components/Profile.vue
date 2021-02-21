<template>
  <div>
    <EditPopUp v-if="isAdmin" />
    <div id="about" class="section">
      <About />
    </div>
    <v-divider v-if="$vuetify.theme.dark" />
    <div id="projects" class="section">
      <Projects />
    </div>
    <v-divider v-if="$vuetify.theme.dark" />
    <div v-if="dbAboutData.showContributions" id="contributions" class="section">
      <Contributions />
    </div>
    <v-divider v-if="$vuetify.theme.dark && dbAboutData.showContributions" />
    <div id="contact" class="section">
      <Contact />
    </div>
  </div>
</template>

<script>
import About from "./display/About";
import Projects from "./display/Projects";
import Contributions from "./display/Contributions";
import Contact from "./display/Contact";
import EditPopUp from "./edit/EditPopUp";
import { mapState } from "vuex";

export default {
  components: { About, Projects, Contributions, Contact, EditPopUp },
  computed: {
    ...mapState(["isAdmin", "dbAboutData"])
  }
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

#projects {
  background-color: var(--v-background-darken1);
}

#contributions {
  background-color: var(--v-background-base);
}

.theme--light.v-divider {
  border-color: var(--v-background-base) !important;
}

.section {
  padding: 30px 15px;
}

@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .section {
    padding: 64px 15vw;
  }
}
</style>
