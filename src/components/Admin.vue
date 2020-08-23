<template>
  <v-container>
    <h2>Admin Login</h2>
    <v-card class="mx-auto mt-8 py-8 px-8" width="450px" height="400px">
      <v-form ref="form" v-model="valid" class="d-flex flex-column form">
        <div>
          <v-text-field v-model="email" label="Email" :rules="emailRules" clearable class="mb-4"></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="showPassword = !showPassword"
            v-on:keyup.enter="login"
          ></v-text-field>
        </div>

        <long-loading-btn
          color="primary"
          class="mt-auto"
          @click="login"
          :loading="isLoading"
          label="Login"
        ></long-loading-btn>
      </v-form>
    </v-card>
    <snackbar v-model="showSnackbar" :hasErr="hasErr" :snackbarMsg="snackbarMsg" />
  </v-container>
</template>

<script>
import LongLoadingBtn from "./LongLoadingBtn";
import Snackbar from "./Snackbar";
import { auth } from "../firebase/init";
export default {
  components: { LongLoadingBtn, Snackbar },
  data() {
    return {
      isLoading: false,
      hasErr: false,
      showSnackbar: false,
      showPassword: false,
      valid: false,
      email: "",
      password: "",
      snackbarMsg: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    async login() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.isLoading = true;
        try {
          const cred = await auth.signInWithEmailAndPassword(
            this.email,
            this.password
          );
          console.log(cred);
          this.$router.push("/");
          this.showSnackbar = false;
          this.hasErr = false;
        } catch (err) {
          console.log(err);
          this.$refs.form.resetValidation();
          this.showSnackbar = true;
          this.snackbarMsg = "Invalid credential";
          this.hasErr = true;
        }
        this.isLoading = false;
      }
    }
  }
};
</script>

<style>
.form {
  height: 100%;
}
</style>
