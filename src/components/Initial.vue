<template>
  <v-container class="pt-8 mt-16">
    <h2>Welcome to use this Portfolio Starter.</h2>
    <p class="mb-5">
      By submitting this initial form, your email will be set as an Admin user in
      your related firebase project.
      <br />Before doing this step, make sure the security setting in
      firebase have been set to that only Admin user can write.
    </p>

    <v-card class="mx-auto my-auto py-8 px-8" width="450px" height="400px">
      <v-form ref="form" v-model="valid" class="d-flex flex-column form">
        <div class="mb-4">
          <v-text-field
            v-model="userDisplayName"
            label="Your Display Name"
            :rules="requiredRule"
            clearable
          ></v-text-field>

          <v-text-field v-model="email" label="Email" :rules="emailRules" clearable></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            :counter="8"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="reenteredPassword"
            :append-icon="showReenteredPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="reenteredPasswordRules"
            :type="showReenteredPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Re-enter Password"
            :counter="8"
            @click:append="showReenteredPassword = !showReenteredPassword"
          ></v-text-field>
        </div>
        <long-loading-btn
          color="primary"
          class="mt-auto"
          @click="signup"
          :loading="isLoading"
          label="Initial App"
        ></long-loading-btn>
      </v-form>
    </v-card>
    <snackbar
      @input="redirectToLogin"
      :value="showSnackbar"
      :hasErr="hasErr"
      :snackbarMsg="snackbarMsg"
      :timeout="-1"
      :top="true"
    />
  </v-container>
</template>

<script>
import { auth, db, functions } from "../firebase/init";
import LongLoadingBtn from "./LongLoadingBtn";
import Snackbar from "./Snackbar";

export default {
  components: { LongLoadingBtn, Snackbar },
  data() {
    return {
      userDisplayName: "",
      email: "",
      password: "",
      reenteredPassword: "",
      snackbarMsg: "",
      showSnackbar: false,
      hasErr: false,
      isLoading: false,
      showPassword: false,
      showReenteredPassword: false,
      valid: false,
      requiredRule: [v => !!v || "This field is required"],
      emailRules: [v => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      passwordRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length >= 8) ||
          "Password should to have at least 8 characters"
      ],
      reenteredPasswordRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length >= 8) ||
          "Password should to have at least 8 characters",
        v => (v && this.passwordCheck()) || "Passwords need to be matched"
      ]
    };
  },

  async created() {
    try {
      const docRef = db.collection("personalInfo").doc("about");
      const doc = await docRef.get();
      if (doc.exists) {
        this.$router.push({ name: "mainPage" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    passwordCheck() {
      return this.password === this.reenteredPassword;
    },

    redirectToLogin() {
      this.showSnackbar = false;
      if (!this.hasErr) {
        this.$router.push({ name: "admin" });
      }
    },
    async signup() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.isLoading = true;
        try {
          // get our deployed fn from firebase
          const addAdminRole = functions.httpsCallable(
            "addAdminRole" /* need to be same as the name of fn */
          );

          //  const AddAdminRole return a function
          //  use this fn to set this user as admin and create "about" doc
          const { data } = await addAdminRole({
            displayName: this.userDisplayName,
            email: this.email,
            password: this.password
          });

          if (data.message) {
            await auth.signOut();
            this.isLoading = false;
            this.hasErr = false;
            this.snackbarMsg = `${data.message}\nApp has been initialized.\nYou will be redirected to Login page.`;
          } else if (data.error) {
            this.isLoading = false;
            this.hasErr = true;
            this.snackbarMsg = `${data.error}`;
            this.$refs.form.resetValidation();
          }

          this.showSnackbar = true;
        } catch (err) {
          console.log(err);
          this.isLoading = false;
          this.hasErr = true;
          this.snackbarMsg = `${err}`;
          this.$refs.form.resetValidation();
        }
      }
    }
  }
};
</script>

<style>
</style>
