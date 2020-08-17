<template>
  <div id="about" class="mt-8 py-16">
    <img class="profile-pic" :src="profilePicUrl" :alt="dbAboutData.name" />
    <div class="basicInfo">
      <h1>Hi, I am {{ dbAboutData.name }}</h1>
      <p>{{ dbAboutData.bio }}</p>
      <p>{{ dbAboutData.description }}</p>

      <h4>Interest</h4>
      <ul>
        <li v-for="(interest, index) in dbAboutData.interests" :key="index">{{ interest }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "About",
  computed: {
    ...mapGetters(["profilePicUrl"]),
    ...mapState(["dbAboutData"])
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

.basicInfo {
  width: 60%;
}
</style>
