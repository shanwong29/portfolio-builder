<template>
  <form id="updateAbout">
    <label for="name">Display Name</label>
    <input type="text" id="name" v-model="name" />

    <label for="name">One-line Bio</label>
    <input type="text" id="bio" v-model="bio" />

    <label for="name">Description</label>
    <input type="text" id="description" v-model="description" />

    <label for="text" id="interests">Interest</label>
    <div v-for="(modifiedInterest, index) in modifiedInterests" :key="index">
      <input type="text" :value="modifiedInterest" />

      <button @click.prevent="moveInterestUp(index)">up</button>
      <button @click.prevent="moveInterestDown(index)">down</button>
      <button @click.prevent="deleteInterest(index)">del</button>
    </div>

    <input type="text" v-model="interestToBeAdded" />
    <button @click.prevent="addInterest">Add Interest</button>

    <button @click.prevent="updateAbout">Submit</button>
  </form>
</template>

<script>
import { db } from "../firebase/init";
export default {
  data() {
    return {
      name: this.firestoreBasicInfo.name,
      bio: this.firestoreBasicInfo.bio,
      description: this.firestoreBasicInfo.description,
      modifiedInterests: [...this.firestoreBasicInfo.interests],
      docId: this.firestoreBasicInfo.docId,
      interestToBeAdded: ""
    };
  },
  props: ["firestoreBasicInfo"],

  methods: {
    updateAbout() {
      const docRef = db.collection("about").doc(this.docId);

      return docRef
        .set(
          {
            name: this.name,
            bio: this.bio,
            description: this.description,
            interests: this.modifiedInterests
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
    }
  }
};
</script>

<style>
</style>