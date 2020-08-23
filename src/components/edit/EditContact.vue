<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="linkedin" :rules="urlRules" label="Linkedin" required></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="email"></v-text-field>
    <div class="d-flex justify-end">
      <v-btn color="primary" class="ma-2" dark @click="updateContact">Save Changes</v-btn>
    </div>
    <snackbar v-model="showSnackbar" :hasErr="hasErr" :snackbarMsg="snackbarMsg" />
  </v-form>
</template>

<script>
import { db } from "../../firebase/init";
import Snackbar from "../Snackbar";

export default {
  components: { Snackbar },
  data() {
    const { linkedin, email } = this.$store.state.dbContactData;
    return {
      email: email || "",
      linkedin: linkedin || "",
      hasErr: false,
      showSnackbar: false,
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      urlRules: [v => !!v || "Url is required"]
    };
  },

  methods: {
    async updateContact() {
      await this.$refs.form.validate();
      if (this.valid) {
        const docRef = db.collection("personalInfo").doc("contact");
        try {
          await docRef.set({
            linkedin: this.linkedin,
            email: this.email
          });
          this.showSnackbar = true;
          this.snackbarMsg = "Successfully updated Contact.";
          this.hasErr = false;
        } catch (err) {
          console.error();
          this.showSnackbar = true;
          this.snackbarMsg = "Something goes wrong! Cannot update contact.";
          this.hasErr = true;
        }
      }
    }
  }
};
</script>

<style></style>
