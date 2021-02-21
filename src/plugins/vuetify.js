import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        background: { base: "#e4e1e1", darken1: "#becccf", lighten1: "#f5f5f5" },
        text: "#2f5260",
        navbar: "fff",
        primary: "#44909d", //main buttons
        secondary: "#f59193", // projects url hover buttons
        success: "#c474c2", // add buttons in edit panel
        light: colors.blueGrey.lighten5,
        dark: colors.grey.darken3,
        editBtn: "#ef9c88"
      },
      dark: {
        background: { base: "#272727", darken1: "#272727", lighten1: "#272727" },
        text: "#e5e6ea",
        primary: "#b886f7",
        secondary: "#1dddca",
        success: "#1dddca",
        light: colors.blueGrey.lighten5,
        dark: colors.grey.darken3,
        editBtn: "#1dddca"
      }
    },
    options: {
      customProperties: true
    }
  }
});

export default vuetify;
