<template>
  <div>
    <h1 class="mb-4">Contributions</h1>
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
      <template v-if="isLoading">
        <slide v-for="loader in getLoaderNum" :key="loader" class="slide">
          <v-skeleton-loader v-bind="{ elevation: 2 }" type="article"></v-skeleton-loader>
        </slide>
      </template>
      <template v-else>
        <slide v-for="(contributedRepo, index) in contributedRepos" :key="index" class="slide">
          <v-card class="card py-1">
            <a class="link-contributed-repo" :href="contributedRepo.url" target="_blank" rel="noopener noreferrer"
              ><v-card-title class="py-2">{{ contributedRepo.nameWithOwner }}</v-card-title></a
            >

            <v-card-text class="py-0">
              <div v-for="(language, index) in contributedRepo.languages.nodes" :key="index">
                <div class="mb-2 subtitle-1">
                  <v-badge class="mr-1" inline left dot :color="language.color" />{{ language.name }}
                </div>
              </div>
              <div
                class="body-2"
                v-if="contributedRepo.description"
                v-html="renderMarkDown(contributedRepo.description)"
              ></div>
            </v-card-text>
          </v-card>
        </slide>
      </template>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { functions } from "../../firebase-config/init";
const md = require("markdown-it")();
const emoji = require("markdown-it-emoji");
md.use(emoji);

export default {
  name: "Projects",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      contributedRepos: [],
      isLoading: true
    };
  },
  async created() {
    const getContribution = functions.httpsCallable("getContribution");
    try {
      const { data } = await getContribution({
        loginName: `${process.env.VUE_APP_GITHUB_USERNAME}`
      });

      if (data.user) {
        this.contributedRepos = data.user.repositoriesContributedTo.nodes;
      }
    } catch (err) {
      console.log(err);
    }

    this.isLoading = false;
  },
  computed: {
    getActivePaginationColor() {
      const theme = this.$vuetify.theme.dark ? "dark" : "light";
      return this.$vuetify.theme.themes[theme].primary;
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

.slide {
  transform: scale(0.95);
}

.card {
  height: 100%;
}

.link-contributed-repo {
  text-decoration: none;
}

.link-contributed-repo:hover {
  text-decoration: underline;
}
</style>
