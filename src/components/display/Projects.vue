<template>
  <div>
    <h1>Projects</h1>
    <projects-filter
      @chosenTechStackChanged="getStackFilteredProjectsId($event)"
    />
    <projects-carousel
      :shownProjects="getShownProjects"
      :idListOfProjectsWithChosenStack="idListOfProjectsWithChosenStack"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { db } from "../../firebase-config/init";
import ProjectsCarousel from "./ProjectsCarousel";
import ProjectsFilter from "./ProjectsFilter";

export default {
  name: "Projects",
  components: { ProjectsCarousel, ProjectsFilter },
  data() {
    return {
      idListOfProjectsWithChosenStack: [],
    };
  },
  computed: {
    ...mapGetters(["filteredGithubData"]),
    ...mapState(["dbProjectsData"]),
    getShownProjects() {
      const shownProjects = this.filteredGithubData.filter((el) => {
        return (
          this.dbProjectsData[el.id] &&
          this.dbProjectsData[el.id]["show"] == true
        );
      });
      return shownProjects;
    },
  },

  methods: {
    async getStackFilteredProjectsId(chosenStack) {
      if (chosenStack) {
        const projects = db.collection("projects");

        const snapahot = await projects
          .where("stacks", "array-contains", chosenStack)
          .get();

        const projectsIdList = [];
        snapahot.forEach((doc) => {
          projectsIdList.push(doc.id);
        });

        this.idListOfProjectsWithChosenStack = projectsIdList;
      } else {
        this.idListOfProjectsWithChosenStack = [];
      }
    },
  },
};
</script>

<style></style>
