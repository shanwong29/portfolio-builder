<template>
  <div id="about">
    <img class="profile-pic" :src="profilePicUrl" :alt="firestoreBasicInfo.name" />
    <div>
      <h1>Hi, I am {{ firestoreBasicInfo.name }}</h1>
      <p>{{ firestoreBasicInfo.bio }}</p>
      <p>{{ firestoreBasicInfo.description }}</p>

      <h4>Interest</h4>
      <ul>
        <li v-for="(interest, index) in firestoreBasicInfo.interests" :key="index">{{ interest }}</li>
      </ul>
    </div>
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

<style scoped>
#about {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap;
}

.profile-pic {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
</style>
