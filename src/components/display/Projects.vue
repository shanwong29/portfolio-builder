<template>
  <div id="projects" class="py-16">
    <h1>Projects</h1>
    <div class="projects-wrapper">
      <template v-for="project in filteredGithubData">
        <v-hover
          v-slot:default="{ hover }"
          v-if="
          !dbProjectsData[project.id] || !dbProjectsData[project.id]['hide']
        "
          :key="project.id"
        >
          <v-card class="mx-auto my-4" max-width="300">
            <v-img height="200" :src="getCoverUrl(project.id)">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <v-btn
                    class="mr-2 link-btn"
                    color="primary"
                    rounded
                    :href="project.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Code</v-btn>
                  <v-btn
                    class="link-btn"
                    color="primary"
                    rounded
                    :href="project.homepage"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Live</v-btn>
                </div>
              </v-expand-transition>
            </v-img>

            <v-card-title class="py-2">{{ project.name }}</v-card-title>

            <v-card-text class="pb-2 pt-0">
              <div class="mb-2 subtitle-1">{{ project.language }}</div>

              <div>{{ project.description }}</div>
            </v-card-text>

            <v-card-text
              class="pb-4 pt-0"
              v-if="
            dbProjectsData[project.id] && dbProjectsData[project.id]['stacks']
          "
            >
              <v-chip
                class="mr-1 mt-1"
                small
                v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
                :key="index"
              >{{ stack }}</v-chip>
            </v-card-text>
          </v-card>
        </v-hover>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Projects",
  components: {},
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"])
  },
  methods: {
    getCoverUrl(projectId) {
      if (
        this.dbProjectsData[projectId] &&
        this.dbProjectsData[projectId]["coverUrl"]
      ) {
        return this.dbProjectsData[projectId]["coverUrl"];
      }
      return `https://cdn.vuetifyjs.com/images/parallax/material.jpg`;
    }
  },

  data() {
    return {
      stackLists: {
        "repos-checker-2.0": [
          "React",
          "Node",
          "Express",
          "CSS Modules",
          "GraphQL",
          "TypeScript",
          "Github Action",
          "Docker"
        ],

        "rick-and-morty-app": [
          "React",
          "styled-components",
          "Jest",
          "React Testing Library",
          "Rick and Morty API",
          "Docker"
        ],
        "arabic-roman-calc": ["React", "styled-components", "Docker"],
        "MERN-app-setup": [
          "Webpack",
          "Babel",
          "React",
          "Node",
          "Mongoose",
          "MongoDB Atlas",
          "Docker"
        ],
        "photo-gallery": [
          "React",
          "Node",
          "Express",
          "Unsplash API",
          "Jest",
          "React Testing Library",
          "Enzyme",
          "Docker"
        ],

        Kiez: [
          "React",
          "Node",
          "Express",
          "MongoDB",
          "Cloudinary",
          "Socket.IO",
          "Google Geocoding"
        ],
        "flavor-it": [
          "Node",
          "Express",
          "MongoDB",
          "handlebars",
          "Cloudinary",
          "Bootstrap"
        ],
        "Xmas-game": ["p5.js"]
      }
    };
  }
};
</script>

<style scoped>
.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  /* opacity: 0.7; */
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
}
.link-btn {
  opacity: 1.5;
}
</style>
