<template>
  <div id="app">
    <Navbar />

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  //is an object
  name: "App",
  components: { Navbar }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #fff; */
  /* background: black; */
  margin-top: 60px;
}
</style>
