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
          ></v-text-field>
        </div>
        <v-btn color="primary" class="mt-auto" @click="login">Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "../firebase/init";
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    async login() {
      this.$refs.form.validate();
      if (this.valid) {
        try {
          const cred = await auth.signInWithEmailAndPassword(
            this.email,
            this.password
          );
          console.log(cred);
          this.$router.push("/");
        } catch (err) {
          console.log(err);
          this.$refs.form.resetValidation();
        }
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
