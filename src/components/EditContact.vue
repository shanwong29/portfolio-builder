<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="linkedin" :rules="urlRules" label="Linkedin" required></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="email"></v-text-field>

    <v-btn color="primary" class="ma-2" dark @click="updateContact">Save Changes</v-btn>
  </v-form>
</template>

<script>
import { db } from "../firebase/init";

export default {
  data() {
    return {
      email: "",
      linkedin: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      urlRules: [v => !!v || "Url is required"]
    };
  },
  props: ["firestoreBasicInfo"],
  async created() {
    this.linkedin = this.firestoreBasicInfo.linkedin;
    this.email = this.firestoreBasicInfo.email;
    this.docId = this.firestoreBasicInfo.docId;
  },
  methods: {
    updateContact() {
      const docRef = db.collection("about").doc(this.docId);

      return docRef
        .set(
          {
            linkedin: this.linkedin,
            email: this.email
          },
          { merge: true }
        )
        .then(() => {
          console.log("successfully updated");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style>
</style>