<template>
  <div id="contact" class="py-16">
    <h1>Contact Me</h1>

    <div class="buttons-wrapper">
      <v-btn
        class="mx-2"
        fab
        dark
        large
        color="black"
        :href="`https://github.com/shanwong29`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon dark>mdi-github</v-icon>
      </v-btn>

      <v-btn
        class="mx-2"
        fab
        dark
        large
        color="blue"
        :href="linkedinUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon dark>mdi-linkedin</v-icon>
      </v-btn>
      <!-- 
      <v-btn class="mx-2" fab dark large color="orange" :href="'mailto:'+firestoreBasicInfo.email">
        <v-icon dark>mdi-email</v-icon>
      </v-btn>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",

  computed: {
    githubUrl() {
      return this.$store.getters.githubUrl;
    },
    linkedinUrl() {
      return this.$store.getters.linkedinUrl;
    }
  }
};
</script>

<style scoped>
.buttons-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>