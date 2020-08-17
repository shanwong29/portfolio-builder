<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="name" :rules="nameRules" label="Display Name" required></v-text-field>

    <v-text-field v-model="bio" label="One-line Bio"></v-text-field>

    <v-textarea
      name="input-7-1"
      label="Self introduction"
      :value="description"
      @input="modifyDescription"
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
      <v-text-field v-model="interestToBeAdded" label="Add Interest" v-on:keyup.enter="addInterest"></v-text-field>

      <v-btn icon color="success" @click="addInterest" class="mx-2">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-end">
      <v-btn color="primary" class="ma-2" @click="updateAbout">Save Changes</v-btn>
    </div>
    <v-snackbar
      v-model="snackbar"
      :color="hasErr? 'error': ''"
      :text="hasErr"
      bottom
      multi-line
      :timeout="hasErr? -1: 2000"
    >
      {{snackbarMsg}}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="hasErr? 'grey': 'blue'"
          text
          v-bind="attrs"
          @click="snackbar = false; hasErr=false"
        >Close</v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import { db } from "../../firebase/init";

export default {
  data() {
    const { name, bio, description, interests } = this.$store.state.dbAboutData;
    return {
      valid: false,
      nameRules: [v => !!v || "Display name is required"],
      snackbar: false,
      snackbarMsg: "",
      hasErr: false,
      name: name,
      bio: bio || "",
      description: description || "",
      modifiedInterests: [...interests],
      interestToBeAdded: ""
    };
  },

  methods: {
    modifyDescription(input) {
      this.description = input;
    },
    async updateAbout() {
      try {
        await this.$refs.form.validate();
        if (this.valid) {
          const docRef = db.collection("personalInfo").doc("about");

          await docRef.set({
            name: this.name,
            bio: this.bio,
            description: this.description,
            interests: this.modifiedInterests
          });

          this.snackbar = true;
          this.hasErr = false;
          this.snackbarMsg = "Successfully updated About.";
        }
      } catch (err) {
        console.error();
        this.snackbar = true;
        this.hasErr = false;
        this.snackbarMsg = "Something goes wrong! Cannot update About.";
      }
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
      if (!this.interestToBeAdded) {
        return;
      }
      this.modifiedInterests.push(this.interestToBeAdded);
      this.interestToBeAdded = "";
    }
  }
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
}
</style>
