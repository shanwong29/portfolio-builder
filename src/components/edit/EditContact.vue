<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="linkedin" :rules="urlRules" label="Linkedin" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="email"></v-text-field>
      <div class="d-flex justify-end">
        <v-btn color="primary" class="ma-2" dark @click="updateContact">Save Changes</v-btn>
      </div>
    </v-form>

    <v-snackbar v-model="snackbar" multi-line :timeout="2000">
      Successfully updated Contact.
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { db } from "../../firebase/init";

export default {
  data() {
    const { linkedin, email } = this.$store.state.dbContactData;
    return {
      email: email || "",
      linkedin: linkedin || "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      urlRules: [v => !!v || "Url is required"],
      snackbar: false
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
          this.snackbar = true;
        } catch (err) {
          console.error();
        }
      }
    }
  }
};
</script>

<style></style>
