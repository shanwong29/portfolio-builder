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
import axios from "axios";

export default {
  components: { About, Projects, Contributions, Contact, EditPopUp },
  computed: {
    ...mapState(["isAdmin", "dbAboutData"])
  },

  async created() {
    try {
      // get data from github
      const githubRepoApi = `https://api.github.com/users/${process.env.VUE_APP_GITHUB_USERNAME}/repos`;
      const githubOwnerApi = `https://api.github.com/users/${process.env.VUE_APP_GITHUB_USERNAME}`;

      const reposPromise = axios.get(githubRepoApi, {
        params: {
          per_page: 100,
          sort: "created",
          direction: "desc"
        }
      });

      const ownerPromise = axios.get(githubOwnerApi);

      const [reposRes, ownerRes] = await Promise.all([reposPromise, ownerPromise]);

      this.$store.commit({ type: "setGithubData", data: { repos: reposRes.data, owner: ownerRes.data } });

      // get data from firestore
      this.$store.dispatch("getDbAbout");
      this.$store.dispatch("getDbProjects");
      this.$store.dispatch("getDbContact");
    } catch (err) {
      console.log(err);
    }
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
