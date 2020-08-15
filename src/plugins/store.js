import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/init";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    githubData: [], //unlike react, all states need to be initialized here before used
    firestoreBasicInfo: {},
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
      return state.dbContactData?.linkedin;
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
    setFirestoreBasicInfo: (state, payload) => {
      state.firestoreBasicInfo = payload.data;
    },
    setContactData: (state, payload) => {
      state.dbContactData = payload.data;
    },
  },

  actions: {
    async getDbProjects(context) {
      const projectsData = {};
      await db.collection("projects").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          projectsData[doc.id] = doc.data();
        });

        context.commit({
          type: "setDbProjectsData",
          data: { ...projectsData },
        });
      });
    },

    async getDbBasicInfo(context) {
      await db
        .collection("personalInfo")
        .doc("about")
        .onSnapshot((doc) => {
          context.commit({
            type: "setFirestoreBasicInfo",
            data: { ...doc.data() },
          });
        });
    },
    async getDbContact(context) {
      await db
        .collection("personalInfo")
        .doc("contact")
        .onSnapshot((doc) => {
          context.commit({
            type: "setContactData",
            data: { ...doc.data() },
          });
        });
    },
  },
});
