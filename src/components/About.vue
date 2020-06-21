<template>
  <div id="about">
    <h1>Hi, I am Shan</h1>
    <p>A passionate Full-stack Developer</p>
    <p>
      having an experience of building Web and applications with JavaScript /
      Reactjs / Nodejs and some other cool libraries and frameworks.
    </p>

    <h4>Interest</h4>
    <ul>
      <li v-for="(interest, index) in interests" :key="index">{{ interest }}</li>
    </ul>

    <img width="300" height="300" :src="profilePicUrl" alt="Shan Wong" />
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    profilePicUrl: { type: String, required: true }
  },
  data() {
    return {
      interests: [
        "Single Page Application, React.js, Vue.js,",
        "Serverless Architecture"
      ]
    };
  }
};
</script>

<style></style>
