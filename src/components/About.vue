<template>
  <div id="about">
    <h1>Hi, I am {{ firestoreBasicInfo.name }}</h1>
    <p>{{ firestoreBasicInfo.bio }}</p>
    <p>{{ firestoreBasicInfo.description }}</p>

    <h4>Interest</h4>
    <ul>
      <li v-for="(interest, index) in firestoreBasicInfo.interests" :key="index">{{ interest }}</li>
    </ul>

    <img width="300" height="300" :src="profilePicUrl" :alt="firestoreBasicInfo.name" />
  </div>
</template>

<script>
// import { db } from "../firebase/init";
export default {
  name: "About",
  props: {
    profilePicUrl: { type: String, required: true },
    firestoreBasicInfo: { type: Object }
  },
  data() {
    return {
      name: "",
      bio: "",
      description: "",
      interests: []
    };
  }
};
</script>

<style></style>
