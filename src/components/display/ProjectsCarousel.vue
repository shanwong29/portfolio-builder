<template>
  <carousel
    :navigationEnabled="$vuetify.breakpoint.xs ? false : true"
    :scrollPerPage="true"
    :perPage="1"
    :perPageCustom="[
      [$vuetify.breakpoint.thresholds.xs, 2],
      [$vuetify.breakpoint.thresholds.sm, 3],
      [$vuetify.breakpoint.thresholds.lg, 4]
    ]"
    paginationColor="#839496"
    :paginationActiveColor="getActivePaginationColor"
  >
    <template v-if="getAreProjectsLoading">
      <slide v-for="loader in getLoaderNum" :key="loader" class="slide">
        <v-skeleton-loader v-bind="{ elevation: 2 }" type="image, article, table-tfoot"></v-skeleton-loader>
      </slide>
    </template>
    <template v-else>
      <slide v-for="project in getStackFilteredShownProjects" :key="project.id" class="slide">
        <v-hover v-slot:default="{ hover }" class="card">
          <v-card>
            <v-img aspect-ratio="1.7" :src="getCoverUrl(project.id)" class="cover">
              <v-expand-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out v-card--reveal" style="height: 100%">
                  <v-btn
                    :class="[$vuetify.theme.dark ? 'black--text' : 'white--text', 'mr-2']"
                    color="secondary"
                    rounded
                    :href="project.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <v-icon left>mdi-github</v-icon>Code
                  </v-btn>
                  <v-btn
                    :class="$vuetify.theme.dark ? 'black--text' : 'white--text'"
                    color="secondary"
                    rounded
                    :disabled="project.homepage ? false : true"
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

            <v-card-text class="py-0">
              <div class="mb-2 subtitle-1">
                <v-badge
                  class="mr-1"
                  v-if="colorMap && colorMap[project.language]"
                  inline
                  left
                  dot
                  :color="colorMap[project.language]['color']"
                />{{ project.language }}
              </div>

              <div class="body-2" v-if="project.description" v-html="renderMarkDown(project.description)"></div>
            </v-card-text>

            <v-card-text class="pb-8 pt-0" v-if="dbProjectsData[project.id] && dbProjectsData[project.id]['stacks']">
              <v-chip
                class="mr-1 mt-1"
                small
                v-for="(stack, index) in dbProjectsData[project.id]['stacks']"
                :key="index"
                >{{ stack }}</v-chip
              >
            </v-card-text>
          </v-card>
        </v-hover>
      </slide>
    </template>
  </carousel>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import axios from "axios";
var md = require("markdown-it")();
var emoji = require("markdown-it-emoji");
md.use(emoji);

export default {
  name: "Projects",
  components: {
    Carousel,
    Slide
  },
  props: {
    idListOfProjectsWithChosenStack: { type: Array, required: true },
    shownProjects: { type: Array, required: true }
  },
  data() {
    return {
      colorMap: null
    };
  },
  async created() {
    const githubLangColorRef = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";
    const { data } = await axios.get(githubLangColorRef);
    this.colorMap = data;
  },
  computed: {
    ...mapGetters(["filteredGithubData", "getAreProjectsLoading"]),
    ...mapState(["dbProjectsData"]),
    getActivePaginationColor() {
      const theme = this.$vuetify.theme.dark ? "dark" : "light";
      return this.$vuetify.theme.themes[theme].primary;
    },
    getStackFilteredShownProjects() {
      if (!this.idListOfProjectsWithChosenStack.length) {
        return this.shownProjects;
      } else {
        return this.shownProjects.filter(el => {
          return this.idListOfProjectsWithChosenStack.indexOf(el.id.toString()) >= 0;
        });
      }
    },
    getLoaderNum() {
      if (this.$vuetify.breakpoint.xs) {
        return 1;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        return 2;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return 3;
      } else {
        return 4;
      }
    }
  },

  methods: {
    getCoverUrl(projectId) {
      if (this.dbProjectsData[projectId] && this.dbProjectsData[projectId]["coverUrl"]) {
        return this.dbProjectsData[projectId]["coverUrl"];
      }
      return `https://cdn.vuetifyjs.com/images/parallax/material.jpg`;
    },
    renderMarkDown(markdown) {
      return md.render(markdown);
    }
  }
};
</script>

<style>
.VueCarousel-slide {
  position: relative;
}

.VueCarousel-navigation-next,
.VueCarousel-navigation-prev {
  color: var(--v-primary-base) !important;
  font-size: 26px;
}

div[style].VueCarousel-dot-container,
button[style].VueCarousel-dot {
  margin-top: 0 !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
}

.slide {
  transform: scale(0.95);
}

.card {
  height: 100%;
}

.cover {
  border-bottom: #e1e1e1 1px solid;
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgba(255, 255, 255, 0.8) !important;
}

.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
