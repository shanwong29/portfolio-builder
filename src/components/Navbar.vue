<template>
  <v-app-bar color="navbar" hide-on-scroll fixed width="100%">
    <template v-if="isPhone">
      <v-btn to="/" text icon color="primary" v-if="isLoginPage">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <div v-else-if="isInitialPage">
        <v-btn to="/" text icon color="primary">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn
          :href="`https://github.com/shanwong29/portfolio-builder`"
          text
          small
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </div>

      <div v-else>
        <v-btn class="mr-1" href="/#about" text icon color="primary">
          <v-icon>mdi-face-woman</v-icon>
        </v-btn>
        <v-btn class="mx-1" href="/#projects" text icon color="primary">
          <v-icon>mdi-briefcase</v-icon>
        </v-btn>
        <v-btn v-if="dbAboutData.showContributions" class="mx-1" href="/#contributions" text icon color="primary">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn class="mx-1" href="/#contact" text icon color="primary">
          <v-icon>mdi-phone-classic</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-switch
        :input-value="$vuetify.theme.dark"
        @change="handleThemeChange"
        :append-icon="$vuetify.theme.dark ? 'mdi-weather-night' : ''"
        :prepend-icon="$vuetify.theme.dark ? '' : 'mdi-white-balance-sunny'"
        hide-details
        color="secondary"
        class="mx-1 mx-sm-4"
      ></v-switch>
      <v-menu bottom offset-y v-if="isAdmin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="secondary" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in hamburgerLists" :key="i" @click="item.onClickEvent">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <v-btn to="/" text small color="primary" v-if="isLoginPage"> <v-icon left>mdi-home</v-icon>Home </v-btn>

      <div v-else-if="isInitialPage">
        <v-btn to="/" text small color="primary"> <v-icon left>mdi-home</v-icon>Home </v-btn>
        <v-btn
          :href="`https://github.com/shanwong29/portfolio-builder`"
          text
          small
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-icon left>mdi-information-outline</v-icon>Instructions
        </v-btn>
      </div>

      <div v-else>
        <v-btn href="/#about" text small color="primary"> <v-icon left>mdi-face-woman</v-icon>About </v-btn>
        <v-btn href="/#projects" text small color="primary"> <v-icon left>mdi-briefcase</v-icon>Projects </v-btn>
        <v-btn v-if="dbAboutData.showContributions" href="/#contributions" text small color="primary">
          <v-icon left>mdi-heart</v-icon>Contributions
        </v-btn>
        <v-btn href="/#contact" text small color="primary"> <v-icon left>mdi-phone-classic</v-icon>Contact </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-switch
        :input-value="$vuetify.theme.dark"
        @change="handleThemeChange"
        :append-icon="$vuetify.theme.dark ? 'mdi-weather-night' : ''"
        :prepend-icon="$vuetify.theme.dark ? '' : 'mdi-white-balance-sunny'"
        hide-details
        color="secondary"
        class="mx-1 mx-sm-4"
      ></v-switch>

      <div v-if="isAdmin">
        <v-btn
          v-if="isPhone"
          color="editBtn"
          :class="$vuetify.theme.dark ? 'black--text' : 'white--text'"
          @click="toogleEditPopUp"
          icon
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
          v-else
          color="editBtn"
          class="ma-2"
          :class="$vuetify.theme.dark ? 'black--text' : 'white--text'"
          @click="toogleEditPopUp"
          data-test-id="edit-btn"
          >Edit</v-btn
        >

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="logout">
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import { auth } from "../firebase-config/init";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      hamburgerLists: [
        { title: "Edit", onClickEvent: this.toogleEditPopUp },
        { title: "Logout", onClickEvent: this.logout }
      ]
    };
  },
  methods: {
    handleThemeChange() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("isDarkMode", this.$vuetify.theme.dark.toString());
    },
    logout() {
      auth.signOut().then(() => {
        console.log("logout");
      });
    },
    toogleEditPopUp() {
      this.$store.commit({ type: "toogleEditPopUp" });
    }
  },
  computed: {
    ...mapState(["isAdmin", "dbAboutData"]),
    isLoginPage() {
      return this.$route.name === "admin";
    },
    isInitialPage() {
      return this.$route.name === "initial";
    },
    isPhone() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>

<style scoped>
.wrapper {
  align-items: center;
}
</style>
