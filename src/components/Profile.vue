<template>
  <div>
    <About v-bind:profilePicUrl="profilePicUrl" />
    <Projects v-bind:githubData="githubData" />
    <Contact v-bind:githubUrl="githubUrl" />
  </div>
</template>

<script>
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

import axios from "axios";

export default {
  //is an object
  components: { About, Projects, Contact },
  data() {
    return {
      githubData: [], //unlike react, all states need to be initialized here before used
      profilePicUrl: "",
      githubUrl: ""
    };
  },

  async created() {
    const { data } = await axios.get(
      "https://api.github.com/users/shanwong29/repos?sort=created&direction=desc"
    );

    this.githubData = data.filter(el => el.fork === false);

    this.profilePicUrl = data[data.length - 1].owner.avatar_url;
    this.githubUrl = data[data.length - 1].owner.html_url;
  }
};
</script>

<style>
</style>
