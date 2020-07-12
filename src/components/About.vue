<template>
  <div id="about">
    <h1>Hi, I am {{ name }}</h1>
    <p>{{ bio }}</p>
    <p>{{ description }}</p>

    <h4>Interest</h4>
    <ul>
      <li v-for="(interest, index) in interests" :key="index">{{ interest }}</li>
    </ul>

    <img width="300" height="300" :src="profilePicUrl" alt="Shan Wong" />
  </div>
</template>

<script>
import { db } from "../firebase/init";
export default {
  name: "About",
  props: {
    profilePicUrl: { type: String, required: true }
  },
  data() {
    return {
      docId: "",
      name: "",
      bio: "",
      description: "",
      interestToBeAdded: "",
      modifiedInterests: [],
      interests: []
    };
  },

  async created() {
    const snapshot = await db.collection("about").get();

    snapshot.forEach(doc => {
      const { name, bio, description, interests } = doc.data();

      this.name = name;
      this.bio = bio;
      this.description = description;
      this.interests = interests;
      this.modifiedInterests = [...interests];
      this.docId = doc.id;
    });
  }
};
</script>

<style></style>
