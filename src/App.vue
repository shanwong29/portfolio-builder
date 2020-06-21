<template>
  <div id="app">
    <About v-bind:profilePicUrl="profilePicUrl" />
    <Projects v-bind:githubData="githubData" />
    <Contact v-bind:githubUrl="githubUrl" />
  </div>
</template>

<script>
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import axios from "axios";
export default {
  //is an object
  name: "App",
  components: { About, Projects, Contact },
  data() {
    return {
      githubData: [], //unlike react, all states need to be initialized here before used
      profilePicUrl: "",
      githubUrl: ""
    };
  },
  // props: [], //array
  async created() {
    const { data } = await axios.get(
      "https://api.github.com/users/shanwong29/repos?sort=created&direction=desc"
    );

    this.githubData = data.filter(el => el.fork === false);

    this.profilePicUrl = data[data.length - 1].owner.avatar_url;
    this.githubUrl = data[data.length - 1].owner.html_url;
    console.log(this.githubData);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  margin-top: 60px;
}
</style>
