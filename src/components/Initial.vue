<template>
  <v-container class="pt-16">
    <h2>Welcome to use this Portfolio Starter.</h2>
    <p>
      By submitting this initial form, you email will be set as an Admin user in
      your firestore.
    </p>
    <p>
      When this step is done, remember to change the security setting in
      firebase.
    </p>

    <v-card class="mx-auto my-auto py-8 px-8" width="450px" height="400px">
      <v-form ref="form" v-model="valid" class="d-flex flex-column form">
        <div>
          <v-text-field
            v-model="userFullName"
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
        <v-btn color="primary" class="mt-auto" @click="signup">Initial App</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { auth, db, functions } from "../firebase/init";
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      reenteredPassword: "",
      userFullName: "",
      showPassword: false,
      showReenteredPassword: false,
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
      const querySnapshot = await db.collection("users").get();
      if (querySnapshot.docs.length) {
        // this.$router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    passwordCheck() {
      return this.password === this.reenteredPassword;
    },

    async signup() {
      this.$refs.form.validate();
      if (this.valid) {
        try {
          // Add user
          const cred = await auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );
          // here the user is already signuped & logined, and firebase assign a uuid to this user

          // create user collection
          await db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              fullName: this.userFullName
            });

          // set this user as admin
          const addAdminRole = functions.httpsCallable(
            "addAdminRole" /* need to be same as the name of fn */
          );
          //  const AddAdminRole return a function
          const result = await addAdminRole({ email: this.email });
          alert(
            `${result.data.message} \nApp has been initialized. \nRemember to change the firebase security setting.`
          );
          // redirect user to main page
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

<style></style>
