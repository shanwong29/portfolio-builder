<template>
  <div>
    <v-row class="center mt-16">
      <v-btn color="primary" class="ma-2" dark @click="dialog = true">Open Dialog 1</v-btn>

      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-app-bar flat dense dark color="black" app>
            <v-icon class="mr-4">mdi-pencil</v-icon>
            <v-tabs v-model="tab" background-color="black" color="white">
              <v-tab @click="setDisplayEditCmp('EditAbout')">About</v-tab>
              <v-tab @click="setDisplayEditCmp('EditProjects')">Project</v-tab>
              <v-tab @click="setDisplayEditCmp('EditContact')">Contact</v-tab>
            </v-tabs>

            <v-spacer></v-spacer>

            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-text class="mt-16">
            <component
              :is="displayEditCmp"
              :firestoreBasicInfo="firestoreBasicInfo"
              :dbProjectsData="dbProjectsData"
              :githubData="githubData"
            ></component>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>

  <!-- 

  <v-card class="ma-auto pop-up">
    <nav>
      <button @click="setDisplayEditCmp('EditAbout')">About</button>
      <button @click="setDisplayEditCmp('EditProjects')">Projects</button>
      <button @click="setDisplayEditCmp('EditContact')">Contact</button>
    </nav>
    <component
      :is="displayEditCmp"
      :firestoreBasicInfo="firestoreBasicInfo"
      :dbProjectsData="dbProjectsData"
      :githubData="githubData"
    ></component>
  </v-card>-->
</template>


<script>
import EditAbout from "./EditAbout";
import EditContact from "./EditContact";
import EditProjects from "./EditProjects";

export default {
  components: { EditAbout, EditContact, EditProjects },
  props: ["firestoreBasicInfo", "dbProjectsData", "githubData"],
  data() {
    return {
      dialog: false,
      tab: null,
      displayEditCmp: "EditAbout"
    };
  },
  methods: {
    setDisplayEditCmp(targetCmp) {
      return (this.displayEditCmp = targetCmp);
    }
  }
};
</script>




<style>
.pop-up {
  width: 70vw;
  height: 80vh;
  position: fixed;
  top: 15%;
}
</style>