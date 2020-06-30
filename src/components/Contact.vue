<template>
  <div id="contact">
    <h1>Contact Me</h1>
    <a :href="githubUrl" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-github"></i>
    </a>

    <a href="https://www.linkedin.com/in/shanwong29/" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-linkedin"></i>
    </a>

    <a href="mailto:shan.wong29@gmail.com">
      <i class="fas fa-envelope"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    githubUrl: { type: String, required: true }
  }
};
</script>

<style>
</style>