<template>
  <div class="pb-16">
    <h1>Contact Me</h1>

    <div class="buttons-wrapper">
      <v-btn
        class="mx-2"
        fab
        dark
        large
        :href="`https://github.com/${githubLogin}`"
        target="_blank"
        rel="noopener noreferrer"
        :style="{ background: 'linear-gradient(45deg, #000000, #353535, #000000 )' }"
      >
        <v-icon dark>mdi-github</v-icon>
      </v-btn>

      <v-btn
        :style="
          $vuetify.theme.dark
            ? { background: 'linear-gradient(45deg, #5b86e5, #36d1dc, #5b86e5)' }
            : { background: 'linear-gradient(45deg, #64a1fe, #8bfcfe)' }
        "
        class="mx-2"
        fab
        dark
        large
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
    githubLogin() {
      return process.env.VUE_APP_GITHUB_USERNAME;
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
  margin-top: 25px;
}
</style>