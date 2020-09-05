import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase-config/init";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    githubData: [], //unlike react, all states need to be initialized here before used
    dbAboutData: {},
    dbProjectsData: {},
    dbContactData: {},
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
      return state.dbContactData.linkedin;
    },
  },

  mutations: {
    setGithubData: (state, payload) => {
      state.githubData = payload.data;
    },
    setIsAdmin: (state, payload) => {
      state.isAdmin = payload.isAdmin;
    },
    toogleEditPopUp: (state) => {
      state.openEditPopUp = !state.openEditPopUp;
    },
    setDbProjectsData: (state, payload) => {
      state.dbProjectsData = payload.data;
    },
    setDbAboutData: (state, payload) => {
      state.dbAboutData = payload.data;
    },
    setContactData: (state, payload) => {
      state.dbContactData = payload.data;
    },
  },

  actions: {
    getDbProjects(context) {
      const projectsData = {};
      db.collection("projects").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          projectsData[doc.id] = doc.data();
        });

        context.commit({
          type: "setDbProjectsData",
          data: { ...projectsData },
        });
      });
    },

    getDbAbout(context) {
      db.collection("personalInfo")
        .doc("about")
        .onSnapshot((doc) => {
          context.commit({
            type: "setDbAboutData",
            data: { ...doc.data() },
          });
        });
    },
    getDbContact(context) {
      db.collection("personalInfo")
        .doc("contact")
        .onSnapshot((doc) => {
          context.commit({
            type: "setContactData",
            data: doc.data(),
          });
        });
    },
  },
});
