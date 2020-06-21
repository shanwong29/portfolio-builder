<template>
  <div>
    <h1 id="projects">Projects</h1>
    <div v-for="project in githubData" :key="project.id">
      <strong>{{ project.name }}</strong>
      <p>{{project.description}}</p>
      <p>{{project.language}}</p>

      <StackIcons v-bind:imgUrls="imgUrlArr(project.name)" />
      <a :href="project.html_url">Code</a>
      <a :href="project.homepage">Live</a>
    </div>
  </div>
</template>

<script>
import StackIcons from "./StackIcons";
export default {
  name: "Projects",
  props: ["githubData"],
  components: { StackIcons },
  methods: {
    // a computed getter
    imgUrlArr(projectName) {
      // `this` points to the vm instance
      return (
        this.usedStacks[projectName] &&
        this.usedStacks[projectName].map(el => {
          const imgUrl = this.techStacksUrl[el];
          if (imgUrl) {
            return imgUrl;
          } else {
            return el;
          }
        })
      );
    }
  },
  data() {
    return {
      size: "",
      techStacksUrl: {
        React: `https://logo.clearbit.com/reactjs.org?size=35`,
        Node: "https://logo.clearbit.com/nodejs.org?size=35",
        Express: "https://logo.clearbit.com/expressjs.com?size=20x20",
        GraphQL: "https://logo.clearbit.com/graphql.org?size=35",
        TypeScript: "https://logo.clearbit.com/typescriptlang.org?size=110",
        "styled-components":
          "https://logo.clearbit.com/styled-components.com?size=35",
        Jest: "https://logo.clearbit.com/jestjs.io?size=100",
        "React Testing Library":
          "https://logo.clearbit.com/testing-library.com?size=35",
        "Rick and Morty API":
          "https://logo.clearbit.com/rickandmortyapi.com?size=35",
        // Webpack: "https://logo.clearbit.com/webpack.js.org",
        Babel: "https://logo.clearbit.com/babeljs.io/?size=35",
        MongoDB: "https://logo.clearbit.com/mongodb.com?size=35",
        Enzyme: "https://logo.clearbit.com/airbnb.com?size=35",
        Docker: "https://logo.clearbit.com/docker.com?size=35",
        "Unsplash API": "https://logo.clearbit.com/unsplash.com?size=35",
        // Cloudinary: "https://logo.clearbit.com/cloudinary.com/?size=35",
        "Socket.IO": "https://logo.clearbit.com/socket.io?size=35",
        Google: "https://logo.clearbit.com/?size=35",
        "p5.js": "https://logo.clearbit.com/p5js.org?size=35",
        Mongoose: "https://logo.clearbit.com/mongoosejs.com?size=35",
        // "handlebars",

        Bootstrap: "https://logo.clearbit.com/getbootstrap.com?size=40"
      },
      usedStacks: {
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
