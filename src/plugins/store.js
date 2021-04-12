import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase-config/init";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    githubOwnerData: {
      avatar_url: "",
      bio: "",
      email: "",
      id: "",
      name: ""
    },
    githubReposData: [], //unlike react, all states need to be initialized here before used
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
      return state.githubReposData.filter(el => el.fork === false);
    },
    profilePicUrl: state => {
      return state.githubOwnerData.avatar_url ? state.githubOwnerData.avatar_url : "";
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
      state.githubReposData = payload.data.repos;
      const { avatar_url, bio, email, id, name } = payload.data.owner;
      state.githubOwnerData = { avatar_url, bio, email, id, name };
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
