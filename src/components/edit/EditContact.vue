<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="linkedin"
      :rules="urlRules"
      label="Linkedin"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="email"
    ></v-text-field>

    <v-btn color="primary" class="ma-2" dark @click="updateContact"
      >Save Changes</v-btn
    >
  </v-form>
</template>

<script>
import { db } from "../../firebase/init";

export default {
  data() {
    const { docId, linkedin, email } = this.$store.state.firestoreBasicInfo;
    return {
      docId,
      email: email || "",
      linkedin: linkedin || "",
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      urlRules: [(v) => !!v || "Url is required"],
    };
  },

  methods: {
    async updateContact() {
      const docRef = db.collection("about").doc(this.docId);
      try {
        await docRef.set(
          {
            linkedin: this.linkedin,
            email: this.email,
          },
          { merge: true }
        );
        console.log("successfully updated");
        this.$store.dispatch("getDbBasicInfo");
      } catch (err) {
        console.error();
      }
    },
  },
};
</script>

<style></style>
