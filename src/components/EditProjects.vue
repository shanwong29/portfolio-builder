<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="project in githubData" :key="project.id">
      <v-expansion-panel-header>{{project.name}}</v-expansion-panel-header>

      <v-expansion-panel-content>
        <h5>Tech stacks</h5>
        <template v-if="dbProjectsData[project.id]">
          <v-chip
            v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
            :key="index"
          >{{stack}}</v-chip>
        </template>
        <div class="input-wrapper">
          <v-text-field v-model="stackToBeAdded" label="Add Stack"></v-text-field>

          <v-btn icon color="success" @click="addStack(project.name,project)" class="mx-2">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <!-- <div>
    
    <div v-for="project in githubData" :key="project.id">
      <h3>{{project.name}}</h3>
      <button
        @click="toggleShowProject(project.name, project.id)"
      >{{dbProjectsData[project.id] && dbProjectsData[project.id]['hide']? "show": "hide"}}</button>
      <h5>Tech stacks</h5>
      <template v-if="dbProjectsData[project.id]">
        <span v-for="(stack, index) in dbProjectsData[project.id]['stacks']" :key="index">{{stack}}</span>
      </template>
      <input type="text" v-model="tsackToBeAdded" />
      <button @click="addStack(project.name,project.id)">Add</button>
    </div>
  </div>-->
</template>

<script>
import { db } from "../firebase/init";
export default {
  name: "Projects",
  props: ["githubData", "dbProjectsData"],
  components: {},

  created() {
    console.log(this.dbProjectsData);
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
            hide: false
          },
          { merge: true }
        );
      }
    }
  },

  data() {
    return {
      stackToBeAdded: "",
      modifiedDbProjectsData: {}
    };
  }
};
</script>

<style></style>
