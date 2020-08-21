<template>
  <div id="projects" class="py-16">
    <h1>Projects</h1>
    <div class="d-flex justify-center align-center mt-8 mb-4">
      <v-sheet max-width="800">
        <v-slide-group v-model="model" center-active show-arrows>
          <v-slide-item
            v-for="(stack, index) in getUsedTechStacks"
            :key="index"
            v-slot:default="{ active}"
          >
            <v-btn
              :color="active ? 'primary' : 'blue-grey lighten-5'"
              class="ma-1"
              rounded
              small
              @click="setChosenStack(index, stack)"
            >{{ stack}}</v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-btn icon @click="clearTechStacksFilter">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </div>

    <carousel
      :navigationEnabled="true"
      :scrollPerPage="true"
      :perPage="1"
      :perPageCustom="[[768, 2], [1024, 3]]"
      paginationColor="grey"
      paginationActiveColor="pink"
    >
      <slide
        v-for="project in getShownProjects"
        :key="project.id"
        :style="{ width: getCardWidth + '%' }"
        class="slide"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card class="card">
            <v-img height="220" :src="getCoverUrl(project.id)">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <v-btn
                    class="mr-2"
                    color="primary"
                    rounded
                    :href="project.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <v-icon left>mdi-github</v-icon>Code
                  </v-btn>
                  <v-btn
                    class="link-btn"
                    color="primary"
                    rounded
                    :href="project.homepage"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <v-icon left>mdi-earth</v-icon>Live
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-img>

            <v-card-title class="py-2">{{ project.name }}</v-card-title>

            <v-card-text class="pb-2 pt-0">
              <div class="mb-2 subtitle-1">{{ project.language }}</div>

              <div>{{ project.description }}</div>
            </v-card-text>

            <v-card-text
              class="pb-4 pt-0"
              v-if="
              dbProjectsData[project.id] && dbProjectsData[project.id]['stacks']
            "
            >
              <v-chip
                class="mr-1 mt-1"
                small
                v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
                :key="index"
              >{{ stack }}</v-chip>
            </v-card-text>
          </v-card>
        </v-hover>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import { db } from "../../firebase/init";

export default {
  name: "Projects",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      chosenStack: "",
      idListOfProjectsWithChosenStack: [],
      model: null
    };
  },
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"]),
    getCardWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100";
        case "sm":
          return "50";
        default:
          return "33";
        // case "lg":
        //   return "600px";
        // case "xl":
        //   return "800px";
      }
    },
    getShownProjects() {
      const shownProjects = this.filteredGithubData.filter(el => {
        let hasChosenStack = true;

        if (
          this.idListOfProjectsWithChosenStack.length &&
          this.idListOfProjectsWithChosenStack.indexOf(el.id.toString()) < 0
        ) {
          hasChosenStack = false;
        }
        return (
          this.dbProjectsData[el.id] &&
          this.dbProjectsData[el.id]["show"] == true &&
          hasChosenStack
        );
      });
      return shownProjects;
    },
    getUsedTechStacks() {
      let allTechStacks = [];
      for (const project in this.dbProjectsData) {
        if (
          this.dbProjectsData[project]["stacks"] &&
          this.dbProjectsData[project]["show"]
        ) {
          allTechStacks = allTechStacks.concat(
            this.dbProjectsData[project]["stacks"]
          );
        }
      }

      const noDuplicatedStacks = new Set(allTechStacks);
      return Array.from(noDuplicatedStacks);
    }
  },

  watch: {
    async chosenStack() {
      if (this.chosenStack) {
        const projects = db.collection("projects");

        const snapahot = await projects
          .where("stacks", "array-contains", this.chosenStack)
          .get();

        const projectsIdList = [];
        snapahot.forEach(doc => {
          projectsIdList.push(doc.id);
        });

        this.idListOfProjectsWithChosenStack = projectsIdList;
      } else {
        this.idListOfProjectsWithChosenStack = [];
      }
    }
  },

  methods: {
    clearTechStacksFilter() {
      this.model = null;
      this.chosenStack = "";
    },
    setChosenStack(index, stack) {
      this.model = index;
      this.chosenStack = stack;
    },
    getCoverUrl(projectId) {
      if (
        this.dbProjectsData[projectId] &&
        this.dbProjectsData[projectId]["coverUrl"]
      ) {
        return this.dbProjectsData[projectId]["coverUrl"];
      }
      return `https://cdn.vuetifyjs.com/images/parallax/material.jpg`;
    }
  }
};
</script>

<style scoped>
.VueCarousel-slide {
  position: relative;
}

.slide {
  transform: scale(0.95);
}

.card {
  height: 470px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
}
</style>
