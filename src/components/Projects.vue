<template>
  <div>
    <h1 id="projects">Projects</h1>
    <div v-for="project in githubData" :key="project.id">
      <strong>{{ project.name }}</strong>
      <p>{{project.description}}</p>
      <p>{{project.language}}</p>

      <div>
        <span v-for="(stack, index) in getStacksUsed(project.name)" :key="index">{{stack}}</span>
      </div>
      <a :href="project.html_url" target="_blank" rel="noopener noreferrer">Code</a>
      <a :href="project.homepage" target="_blank" rel="noopener noreferrer">Live</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Projects",
  props: ["githubData"],
  components: {},
  methods: {
    // a computed getter
    getStacksUsed(projectName) {
      if (this.stackLists[projectName]) {
        return this.stackLists[projectName];
      } else {
        return [];
      }
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

<style></style>
