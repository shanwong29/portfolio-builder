<template>
  <div>
    <v-row class="center">
      <v-dialog
        v-model="openEditPopUp"
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

            <v-btn icon dark @click="toogleEditPopUp">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-text class="mt-16">
            <component :is="displayEditCmp"></component>
          </v-card-text>

          <div style="flex: 1 1 auto"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import EditAbout from "./EditAbout";
import EditContact from "./EditContact";
import EditProjects from "./EditProjects";
import { mapState } from "vuex";

export default {
  components: { EditAbout, EditContact, EditProjects },
  data() {
    return {
      tab: null,
      displayEditCmp: "EditAbout",
    };
  },
  computed: {
    ...mapState(["openEditPopUp"]),
  },
  methods: {
    setDisplayEditCmp(targetCmp) {
      return (this.displayEditCmp = targetCmp);
    },
    toogleEditPopUp() {
      this.$store.commit({ type: "toogleEditPopUp" });
    },
  },
};
</script>

<style></style>
