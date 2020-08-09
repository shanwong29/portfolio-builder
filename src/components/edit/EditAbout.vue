<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Display Name"
      required
    ></v-text-field>

    <v-text-field v-model="bio" label="One-line Bio"></v-text-field>

    <v-textarea
      name="input-7-1"
      label="Self introduction"
      :value="description"
    ></v-textarea>

    <label for="text" id="interests">Interest</label>
    <div v-for="(modifiedInterest, index) in modifiedInterests" :key="index">
      <input type="text" :value="modifiedInterest" />

      <button @click.prevent="moveInterestUp(index)">up</button>
      <button @click.prevent="moveInterestDown(index)">down</button>

      <v-btn icon color="error" @click="deleteInterest" class="mx-2">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>

    <div class="input-wrapper">
      <v-text-field
        v-model="interestToBeAdded"
        label="Add Interest"
      ></v-text-field>

      <v-btn icon color="success" @click="addInterest" class="mx-2">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <v-btn color="primary" class="ma-2" dark @click="updateAbout"
      >Save Changes</v-btn
    >
  </v-form>
</template>

<script>
import { db } from "../../firebase/init";

export default {
  data() {
    const {
      name,
      bio,
      description,
      interests,
      docId,
    } = this.$store.state.firestoreBasicInfo;
    return {
      valid: false,
      nameRules: [(v) => !!v || "Password is required"],
      name,
      bio,
      description,
      modifiedInterests: [...interests],
      docId,
      interestToBeAdded: "",
    };
  },
  methods: {
    updateAbout() {
      const docRef = db.collection("about").doc(this.docId);

      return docRef
        .set(
          {
            name: this.name,
            bio: this.bio,
            description: this.description,
            interests: this.modifiedInterests,
          },
          { merge: true }
        )
        .then(() => {
          console.log("successfully updated");
        });
    },

    moveInterestUp(index) {
      if (index === 0) {
        return;
      }
      const currentItem = this.modifiedInterests[index];
      this.modifiedInterests.splice(index, 1);
      this.modifiedInterests.splice(index - 1, 0, currentItem);
    },
    moveInterestDown(index) {
      if (index === this.modifiedInterests.length) {
        return;
      }
      const currentItem = this.modifiedInterests[index];
      this.modifiedInterests.splice(index, 1);
      this.modifiedInterests.splice(index + 1, 0, currentItem);
    },
    deleteInterest(index) {
      this.modifiedInterests.splice(index, 1);
    },
    addInterest() {
      this.modifiedInterests.push(this.interestToBeAdded);
      this.interestToBeAdded = "";
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
}
</style>
