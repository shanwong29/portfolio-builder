<template>
  <div id="projects" class="py-16">
    <h1>Projects</h1>

    <carousel
      :navigationEnabled="true"
      :scrollPerPage="true"
      :perPage="1"
      :perPageCustom="[[768, 2], [1024, 3]]"
      paginationColor="grey"
      paginationActiveColor="pink"
    >
      <slide
        v-for="(project) in getShownProjects"
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

export default {
  name: "Projects",
  components: {
    Carousel,
    Slide
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
        return (
          !this.dbProjectsData[el.id] ||
          this.dbProjectsData[el.id]["hide"] != true
        );
      });
      return shownProjects;
    }
  },
  methods: {
    getSlideClass(index) {
      if (index) {
        return "slide activeSlide";
      }
      return "slide";
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
