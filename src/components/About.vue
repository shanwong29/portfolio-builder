<template>
  <div id="about">
    <h1>Hi, I am {{ name }}</h1>
    <p>{{ bio }}</p>
    <p>{{ description }}</p>

    <h4>Interest</h4>
    <ul>
      <li v-for="(interest, index) in interests" :key="index">{{ interest }}</li>
    </ul>

    <img width="300" height="300" :src="profilePicUrl" alt="Shan Wong" />

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
  </div>
</template>

<script>
import { db } from "../firebase/init";
export default {
  name: "About",
  props: {
    profilePicUrl: { type: String, required: true }
  },
  data() {
    return {
      docId: "",
      name: "",
      bio: "",
      description: "",
      interestToBeAdded: "",
      modifiedInterests: [],
      interests: []
    };
  },

  async created() {
    const snapshot = await db.collection("about").get();

    snapshot.forEach(doc => {
      const { name, bio, description, interests } = doc.data();

      this.name = name;
      this.bio = bio;
      this.description = description;
      this.interests = interests;
      this.modifiedInterests = [...interests];
      this.docId = doc.id;
    });
  },

  methods: {
    updateAbout() {
      const docRef = db.collection("about").doc(this.docId);

      return docRef
        .set({
          name: this.name,
          bio: this.bio,
          description: this.description,
          interests: this.modifiedInterests
        })
        .then(() => {
          console.log("successs");
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

<style></style>
