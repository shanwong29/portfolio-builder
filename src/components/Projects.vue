<template>
  <div id="projects">
    <h1>Projects</h1>

    <template v-for="project in filteredGithubData">
      <div
        v-if="!dbProjectsData[project.id] || !dbProjectsData[project.id]['hide']"
        :key="project.id"
      >
        <strong>{{ project.name }}</strong>
        <p>{{project.description}}</p>
        <p>{{project.language}}</p>
        <template v-if="dbProjectsData[project.id] && dbProjectsData[project.id]['stacks']">
          <span
            v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
            :key="index"
          >{{stack}}</span>
        </template>

        <a :href="project.html_url" target="_blank" rel="noopener noreferrer">Code</a>
        <a :href="project.homepage" target="_blank" rel="noopener noreferrer">Live</a>
      </div>
    </template>
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

<style></style>
