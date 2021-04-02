<template>
  <div class="wrapper mt-10">
    <div class="profile-pic-wrapper">
      <v-skeleton-loader v-if="!profilePicUrl" type="avatar"></v-skeleton-loader>
      <img v-else class="profile-pic" :src="profilePicUrl" :alt="dbAboutData.name" />
    </div>

    <div class="basicInfo">
      <template v-if="!dbAboutData.name">
        <v-skeleton-loader class="mb-7" type="heading"></v-skeleton-loader>
        <v-skeleton-loader class="mb-5" type="sentences"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph"></v-skeleton-loader>
      </template>

      <template v-else>
        <h1>Hi, I am {{ dbAboutData.name }}</h1>
        <p>{{ dbAboutData.bio }}</p>
        <p>{{ dbAboutData.description }}</p>

        <h4>Interest</h4>
        <ul>
          <li v-for="(interest, index) in dbAboutData.interests" :key="index">{{ interest }}</li>
        </ul>
      </template>
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

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

.wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .basicInfo {
    width: 100%;
  }

  .profile-pic-wrapper {
    width: 100%;
    padding: 20px;

    .profile-pic {
      width: 100%;
      border-radius: 50%;
    }

    .v-skeleton-loader {
      width: 100%;
    }

    .v-skeleton-loader__avatar {
      width: 100%;
      padding-bottom: 100%;
    }
  }

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
}
</style>
