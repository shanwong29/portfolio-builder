<template>
  <div>
    <v-btn @click="toggleShowProject">
      <v-icon left>{{ fieldExist("show") ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
      {{ fieldExist("show") ? `Hide this project` : `Show this project` }}
    </v-btn>

    <h4 class="my-4 mx-0">Tech stacks</h4>
    <template v-if="dbProjectsData[projectId]">
      <v-chip
        v-for="(stack, index) in dbProjectsData[projectId]['stacks']"
        :key="index"
        class="mr-1 mb-1"
        close-icon="mdi-delete"
        close
        @click:close="deleteTechStack(stack)"
        >{{ stack }}</v-chip
      >
    </template>
    <div class="d-flex align-center mt-2">
      <v-text-field
        v-model="stackToBeAdded"
        label="Add Stack"
        v-on:keyup.enter="addStack"
      ></v-text-field>

      <v-btn color="success" @click="addStack" class="mx-2" icon>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>

    <snackbar v-model="showSnackbar" :hasErr="hasErr" :snackbarMsg="errMsg" />
  </div>
</template>

<script>
import { db } from "../../firebase-config/init";
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import Snackbar from "../Snackbar";

export default {
  components: { Snackbar },
  props: ["projectId", "projectName", "panel"],
  data() {
    return {
      stackToBeAdded: "",
      hasErr: false,
      showSnackbar: false,
      errMsg:
        "Something goes wrong!! Cannot update additional info of this project.",
    };
  },
  computed: {
    ...mapState(["dbProjectsData"]),
  },
  watch: {
    panel() {
      this.stackToBeAdded = "";
    },
  },
  methods: {
    fieldExist(field) {
      if (!this.dbProjectsData[this.projectId]) {
        return false;
      } else if (!this.dbProjectsData[this.projectId][field]) {
        return false;
      } else {
        return this.dbProjectsData[this.projectId][field];
      }
    },

    async addStack() {
      if (!this.stackToBeAdded) {
        return;
      }
      const docRef = db.collection("projects").doc(this.projectId.toString());

      try {
        if (!this.dbProjectsData[this.projectId]) {
          await docRef.set(
            {
              name: this.projectName,
              stacks: [this.stackToBeAdded.trim()],
            },
            { merge: true }
          );
        } else {
          const updatedStacks = new Set([
            ...this.dbProjectsData[this.projectId]["stacks"],
            this.stackToBeAdded.trim(),
          ]);

          const sortedStacks = Array.from(updatedStacks).sort();
          await docRef.update({
            stacks: sortedStacks,
          });
        }

        this.stackToBeAdded = "";
        this.hasErr = false;
      } catch (err) {
        console.log(err);
        this.showSnackbar = true;
        this.hasErr = true;
      }
    },
    async toggleShowProject() {
      const docRef = db.collection("projects").doc(this.projectId.toString());

      try {
        if (!this.dbProjectsData[this.projectId]) {
          await docRef.set(
            {
              name: this.projectName,
              show: true,
            },
            { merge: true }
          );
        } else {
          await docRef.set(
            {
              show: !this.dbProjectsData[this.projectId]["show"],
            },
            { merge: true }
          );
        }

        this.hasErr = false;
      } catch (err) {
        console.log(err);
        this.showSnackbar = true;
        this.hasErr = true;
      }
    },

    async deleteTechStack(deleteItem) {
      const docRef = db.collection("projects").doc(this.projectId.toString());
      try {
        await docRef.update({
          stacks: firebase.firestore.FieldValue.arrayRemove(deleteItem),
        });
        this.hasErr = false;
      } catch (err) {
        console.log(err);
        this.showSnackbar = true;
        this.hasErr = true;
      }
    },
  },
};
</script>

<style></style>
