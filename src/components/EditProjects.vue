<template>
  <div>
    <div v-for="project in githubData" :key="project.id">
      <h3>{{project.name}}</h3>
      <button
        @click="toggleShowProject(project.name, project.id)"
      >{{dbProjectsData[project.id] && dbProjectsData[project.id]['hide']? "show": "hide"}}</button>
      <h5>Tech stacks</h5>
      <template v-if="dbProjectsData[project.id]">
        <span v-for="(stack, index) in dbProjectsData[project.id]['stacks']" :key="index">{{stack}}</span>
      </template>
      <input type="text" v-model="stackToBeAdded" />
      <button @click="addStack(project.name,project.id)">Add</button>
    </div>
  </div>
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
