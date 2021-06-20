<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="name" :rules="nameRules" label="Display Name" required></v-text-field>

    <v-text-field v-model="bio" label="One-line Bio"></v-text-field>

    <v-textarea name="input-7-1" label="Self Introduction" :value="description" @input="modifyDescription"></v-textarea>

    <p class="subtitle-1 mb-2">Interests</p>
    <div v-for="(modifiedInterest, index) in modifiedInterests" :key="index" class="d-flex">
      <v-text-field
        data-test-id="added-interest-input"
        :style="{ width: '30%' }"
        :value="modifiedInterest"
        :background-color="!$vuetify.theme.dark ? 'light' : 'dark'"
        @input="modifyInterest($event, index)"
        hide-details
        solo
        rounded
        dense
        class="mb-2"
      ></v-text-field>

      <v-btn
        data-test-id="move-interest-up"
        icon
        @click.prevent="moveInterestUp(index)"
        class="ml-1"
        :disabled="index === 0"
      >
        <v-icon>mdi-arrow-up-bold-circle</v-icon>
      </v-btn>

      <v-btn
        data-test-id="move-interest-down"
        icon
        @click.prevent="moveInterestDown(index)"
        class="ml-1"
        :disabled="index === modifiedInterests.length - 1"
      >
        <v-icon>mdi-arrow-down-bold-circle</v-icon>
      </v-btn>

      <v-btn data-test-id="delete-interest-btn" icon color="error" @click="deleteInterest(index)" class="ml-1">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>

    <div class="input-wrapper">
      <v-text-field v-model="interestToBeAdded" label="Add Interest" v-on:keyup.enter="addInterest"></v-text-field>

      <v-btn data-test-id="add-interest-btn" icon color="success" @click="addInterest" class="mx-2">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>

    <v-row>
      <v-col md="4">
        <v-switch v-model="showContributions" color="secondary">
          <template v-slot:label>
            Contribution Section:
            <v-chip class="mx-2" label>
              <v-icon left>
                {{ showContributions ? "mdi-eye" : "mdi-eye-off" }}
              </v-icon>
              {{ showContributions ? "SHOW" : "HIDE" }}
            </v-chip>
          </template>
        </v-switch>
      </v-col>
    </v-row>

    <div class="d-flex justify-end">
      <v-btn color="primary" :class="[$vuetify.theme.dark ? 'black--text' : 'white--text', 'ma-2']" @click="updateAbout"
        >Save Changes</v-btn
      >
    </div>
    <snackbar v-model="snackbar" :hasErr="hasErr" :snackbarMsg="snackbarMsg" />
  </v-form>
</template>

<script>
import { db } from "../../firebase-config/init";
import Snackbar from "../Snackbar";

export default {
  components: { Snackbar },
  data() {
    const { name, bio, description, interests, showContributions } = this.$store.state.dbAboutData;

    return {
      valid: false,
      nameRules: [v => !!v || "Display name is required"],
      snackbar: false,
      snackbarMsg: "",
      hasErr: false,
      name: name,
      bio: bio || "",
      description: description || "",
      modifiedInterests: interests ? [...interests] : [],
      interestToBeAdded: "",
      showContributions: showContributions || false
    };
  },

  methods: {
    modifyDescription(input) {
      this.description = input;
    },

    modifyInterest(input, index) {
      this.modifiedInterests[index] = input;
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
            interests: this.modifiedInterests,
            showContributions: this.showContributions
          });

          this.snackbar = true;
          this.hasErr = false;
          this.snackbarMsg = "Successfully updated About.";
        }
      } catch (err) {
        console.error();
        this.snackbar = true;
        this.hasErr = true;
        this.snackbarMsg = `Something goes wrong! Cannot update About. \nError: ${err}`;
      }
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
