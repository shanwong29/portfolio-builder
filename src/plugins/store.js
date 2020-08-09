import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/init";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    githubData: [], //unlike react, all states need to be initialized here before used
    firestoreBasicInfo: {},
    dbProjectsData: {},
    isAdmin: false,
    openEditPopUp: false,
  },
  getters: {
    filteredGithubData: (state) => {
      return state.githubData.filter((el) => el.fork === false);
    },
    profilePicUrl: (state) => {
      return state.githubData.length
        ? state.githubData[state.githubData.length - 1].owner.avatar_url
        : "";
    },
    linkedinUrl: (state) => {
      return (
        state.firestoreBasicInfo.linkedin && state.firestoreBasicInfo.linkedin
      );
    },
  },

  mutations: {
    setGithubData: (state, payload) => {
      state.githubData = payload.data;
    },
    setIsAdmin: (state, payload) => {
      console.log("???");
      state.isAdmin = payload.isAdmin;
    },
    toogleEditPopUp: (state) => {
      state.openEditPopUp = !state.openEditPopUp;
    },
    setDbProjectsData: (state, payload) => {
      state.dbProjectsData = payload.data;
    },
    setFirestoreBasicInfo: (state, payload) => {
      state.firestoreBasicInfo = payload.data;
      console.log(state.firestoreBasicInfo);
    },
  },

  actions: {
    async getDbProjects(context) {
      const projectsData = [];
      const projectsSnapshot = await db.collection("projects").get();
      projectsSnapshot.forEach((doc) => {
        projectsData[doc.id] = doc.data();
      });

      context.commit({
        type: "setDbProjectsData",
        data: { ...projectsData },
      });
    },

    async getDbBasicInfo(context) {
      const snapshot = await db.collection("about").get();
      snapshot.forEach((doc) => {
        context.commit({
          type: "setFirestoreBasicInfo",
          data: { ...doc.data(), docId: doc.id },
        });
      });
    },
  },
});
