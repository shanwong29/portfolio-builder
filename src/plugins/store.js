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
    loadingDbProjectData: true,
    loadingGithubData: true,
    loadingDbAbout: true
  },
  getters: {
    filteredGithubData: state => {
      return state.githubData.filter(el => el.fork === false);
    },
    profilePicUrl: state => {
      return state.githubData.length ? state.githubData[state.githubData.length - 1].owner.avatar_url : "";
    },
    linkedinUrl: state => {
      return state.dbContactData.linkedin;
    },
    getAreProjectsLoading: state => {
      return state.loadingDbProjectData || state.loadingGithubData;
    }
  },

  mutations: {
    setGithubData: (state, payload) => {
      state.githubData = payload.data;
      state.loadingGithubData = false;
    },
    setIsAdmin: (state, payload) => {
      state.isAdmin = payload.isAdmin;
    },
    toogleEditPopUp: state => {
      state.openEditPopUp = !state.openEditPopUp;
    },
    setDbProjectsData: (state, payload) => {
      state.dbProjectsData = payload.data;
      state.loadingDbProjectData = false;
    },
    setDbAboutData: (state, payload) => {
      state.dbAboutData = payload.data;
      state.loadingDbAbout = false;
    },
    setContactData: (state, payload) => {
      state.dbContactData = payload.data;
    }
  },

  actions: {
    getDbProjects(context) {
      const projectsData = {};
      db.collection("projects").onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          projectsData[doc.id] = doc.data();
        });

        context.commit({
          type: "setDbProjectsData",
          data: { ...projectsData }
        });
      });
    },

    getDbAbout(context) {
      db.collection("personalInfo")
        .doc("about")
        .onSnapshot(doc => {
          context.commit({
            type: "setDbAboutData",
            data: { ...doc.data() }
          });
        });
    },
    getDbContact(context) {
      db.collection("personalInfo")
        .doc("contact")
        .onSnapshot(doc => {
          if (doc.exists) {
            context.commit({
              type: "setContactData",
              data: doc.data()
            });
          }
        });
    }
  }
});
