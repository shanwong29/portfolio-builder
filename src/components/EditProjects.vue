<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="project in filteredGithubData" :key="project.id">
      <v-expansion-panel-header>{{project.name}}</v-expansion-panel-header>

      <v-expansion-panel-content>
        <div class="my-2">
          <v-btn
            small
            @click="toggleShowProject(project.name, project.id)"
          >{{dbProjectsData[project.id] && dbProjectsData[project.id]['hide']? `show`:`hide` }}</v-btn>
        </div>
        <h4>Tech stacks</h4>
        <template v-if="dbProjectsData[project.id]">
          <v-chip
            v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
            :key="index"
          >{{stack}}</v-chip>
        </template>
        <div class="input-wrapper">
          <v-text-field v-model="stackToBeAdded" label="Add Stack"></v-text-field>

          <v-btn icon color="success" @click="addStack(project.name,project.id)" class="mx-2">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { db } from "../firebase/init";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Projects",
  data() {
    return {
      stackToBeAdded: ""
    };
  },
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"])
  },
  methods: {
    async addStack(projectName, projectId) {
      if (!this.stackToBeAdded) {
        return;
      }
      const docRef = db.collection("projects").doc(projectId.toString());

      try {
        if (!this.dbProjectsData[projectId]) {
          await docRef.set(
            {
              name: projectName,
              stacks: [this.stackToBeAdded.trim()]
            },
            { merge: true }
          );
        } else {
          await docRef.update({
            stacks: [
              ...this.dbProjectsData[projectId]["stacks"],
              this.stackToBeAdded.trim()
            ]
          });
        }
        this.$store.dispatch("getDbProjects");
        this.stackToBeAdded = "";

        console.log("stacks updated");
      } catch (err) {
        console.log(err);
      }
    },
    async toggleShowProject(projectName, projectId) {
      const docRef = db.collection("projects").doc(projectId.toString());
      if (!this.dbProjectsData[projectId]) {
        await docRef.set(
          {
            name: projectName,
            hide: true
          },
          { merge: true }
        );
      } else {
        await docRef.set(
          {
            hide: !this.dbProjectsData[projectId]["hide"]
          },
          { merge: true }
        );
      }
      this.$store.dispatch("getDbProjects");
    }
  }
};
</script>

<style></style>
