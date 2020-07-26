<template>
  <div id="contact">
    <h1>Contact Me</h1>

    <div class="buttons-wrapper">
      <v-btn
        class="mx-2"
        fab
        dark
        large
        color="black"
        :href="githubUrl"
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
        :href="firestoreBasicInfo.linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon dark>mdi-linkedin</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark large color="orange" :href="'mailto:'+firestoreBasicInfo.email">
        <v-icon dark>mdi-email</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    githubUrl: { type: String, required: true },
    firestoreBasicInfo: { type: Object, required: true }
  }
};
</script>

<style scoped>
#contact {
  padding: 50px 0 80px;
}

.buttons-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>