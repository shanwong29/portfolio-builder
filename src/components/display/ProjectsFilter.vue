<template>
  <div class="d-flex justify-center align-center mt-4 mt-sm-8 mb-4">
    <div :style="{ maxWidth: getPanelWidth + '%' }" v-if="getUsedTechStacks.length === 0">
      <v-skeleton-loader v-bind="{ width: getLoaderWidth }" type="heading"></v-skeleton-loader>
    </div>
    <v-sheet v-else :style="{ maxWidth: getPanelWidth + '%' }" color="background darken-1">
      <v-slide-group v-model="model" center-active show-arrows>
        <v-slide-item v-for="(stack, index) in getUsedTechStacks" :key="index" v-slot:default="{ active }">
          <v-btn
            :color="active ? 'primary' : 'light'"
            :class="[$vuetify.theme.dark || (!$vuetify.theme.dark && !active) ? 'black--text' : 'white--text', 'ma-1']"
            rounded
            small
            @click="setChosenStack(index, stack)"
            >{{ stack }}</v-btn
          >
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <v-btn icon @click="clearTechStacksFilter">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Projects",
  data() {
    return {
      chosenStack: "",
      model: null
    };
  },
  computed: {
    ...mapState(["dbProjectsData"]),
    getUsedTechStacks() {
      let allTechStacks = [];
      for (const project in this.dbProjectsData) {
        if (this.dbProjectsData[project]["stacks"] && this.dbProjectsData[project]["show"]) {
          allTechStacks = allTechStacks.concat(this.dbProjectsData[project]["stacks"]);
        }
      }

      const noDuplicatedStacks = new Set(allTechStacks);
      return Array.from(noDuplicatedStacks).sort();
    },
    getPanelWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "87";
        case "sm":
          return "77";
        default:
          return "70";
      }
    },
    getLoaderWidth() {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      return vw * (this.getPanelWidth / 100);
    }
  },

  methods: {
    clearTechStacksFilter() {
      this.$emit("chosenTechStackChanged", "");
      this.model = null;
      this.chosenStack = "";
    },
    setChosenStack(index, stack) {
      this.$emit("chosenTechStackChanged", stack);
      this.model = index;
      this.chosenStack = stack;
    }
  }
};
</script>

