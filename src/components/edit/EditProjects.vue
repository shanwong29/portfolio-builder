<template>
  <div>
    <v-expansion-panels v-model="panel" focusable>
      <v-expansion-panel v-for="project in filteredGithubData" :key="project.id">
        <v-expansion-panel-header>
          <span>
            <v-icon left>{{ fieldExist(project.id, 'show') ?'mdi-eye': "mdi-eye-off"}}</v-icon>
            {{ project.name }}
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <div class="my-2">
            <v-row>
              <v-col :md="5" :xs="12">
                <edit-projects-cover
                  :projectId="project.id"
                  :projectName="project.name"
                  :panel="panel"
                />
              </v-col>

              <v-col>
                <edit-projects-additional-info
                  :projectId="project.id"
                  :projectName="project.name"
                  :panel="panel"
                />
              </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import EditProjectsCover from "./EditProjectsCover";
import EditProjectsAdditionalInfo from "./EditProjectsAdditionalInfo";

export default {
  name: "EditProjects",
  components: { EditProjectsCover, EditProjectsAdditionalInfo },
  data() {
    return {
      panel: null
    };
  },
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"])
  },

  methods: {
    fieldExist(projectId, field) {
      if (!this.dbProjectsData[projectId]) {
        return false;
      } else if (!this.dbProjectsData[projectId][field]) {
        return false;
      } else {
        return this.dbProjectsData[projectId][field];
      }
    }
  }
};
</script>

<style>
</style>
