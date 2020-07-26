<template>
  <v-app>
    <Navbar />
    <v-container fluid class="content">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: { Navbar },
  name: "App"
};
</script>
<style>
@media (min-width: 600px) {
  .content {
    width: 70%;
  }
}
</style>
