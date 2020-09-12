<template>
  <div class="wrapper mt-10">
    <div class="profile-pic-wrapper">
      <img class="profile-pic" :src="profilePicUrl" :alt="dbAboutData.name" />
    </div>

    <div class="basicInfo">
      <h1>Hi, I am {{ dbAboutData.name }}</h1>
      <p>{{ dbAboutData.bio }}</p>
      <p>{{ dbAboutData.description }}</p>

      <h4>Interest</h4>
      <ul>
        <li v-for="(interest, index) in dbAboutData.interests" :key="index">
          {{ interest }}
        </li>
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
    ...mapState(["dbAboutData"]),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.profile-pic {
  width: 100%;
  border-radius: 50%;
}

.profile-pic-wrapper {
  width: 100%;
  padding: 20px;
}

@import "~vuetify/src/styles/settings/_variables";

@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .basicInfo {
    width: 50%;
  }

  .profile-pic-wrapper {
    width: 50%;
  }
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .basicInfo {
    width: 55%;
  }

  .profile-pic-wrapper {
    width: 340px;
  }
}
</style>
