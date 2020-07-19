<template>
  <form @submit.prevent="updateContact">
    <label for="url">Linkedin</label>
    <input name="url" type="text" v-model="linkedin" required />
    <label for="email">Email Address</label>
    <input name="email" type="email" v-model="email" required />
    <button>Submit</button>
  </form>
</template>

<script>
import { db } from "../firebase/init";

export default {
  data() {
    return {
      email: "",
      linkedin: ""
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