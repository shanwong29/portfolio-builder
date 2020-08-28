import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        background: "#f5f5f5",
        projectsBkg: "#becccf",
        text: "#2f5260",
        navbar: "fff",
        primary: "#44909d", //main buttons
        secondary: "#f59193", // projects url hover buttons
        success: "#c474c2", // add buttons in edit panel
        editBtn: "#ef9c88",
      },
      dark: {
        background: "#272727",
        projectsBkg: "#272727",
        text: "#e5e6ea",
        primary: "#b886f7",
        secondary: "#1dddca",
        success: "#1dddca",
        editBtn: "#1dddca",
      },
    },
    options: {
      customProperties: true,
    },
  },
});

export default vuetify;

// export default new Vuetify({
//   theme: {
//     primary: "fff",
//     // light: {
//     //   // primary: '#3f51b5',
//     //   // secondary: '#b0bec5',
//     //   // accent: '#8c9eff',
//     //   // error: '#b71c1c',
//     //   primary: "red",
//     //   secondary: '#b0bec5',
//     //   accent: '#8c-9eff',
//     //   error: '#b71c1c',;
//     // },
//     // dark: {
//     //   primary: "#b0bec5",
//     // },
//   }
// });
