/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const admin = require("firebase-admin");

let initialized = false;
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("task", {
    createAdminUser({ email, password, displayName }) {
      console.log(initialized, "djaskjd");
      if (!initialized) {
        admin.initializeApp({ projectId: "shanwong" });
        initialized = true;
      }
      console.log("hehehehehehe");

      admin
        .auth()
        .createUser({
          email,
          password,
          displayName
        })
        .then(user => {
          console.log(user);
          admin.auth().setCustomUserClaims(user.uid, { admin: true });
        });

      return null;
    }
  });
};
