<template>
  <div id="contact">
    <h1>Contact Me</h1>
    <a :href="githubUrl" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-github"></i>
    </a>

    <a :href="firestoreBasicInfo.linkedin" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-linkedin"></i>
    </a>

    <a :href="firestoreBasicInfo.email">
      <i class="fas fa-envelope"></i>
    </a>
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

<style>
</style>