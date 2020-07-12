<template>
  <form @submit.prevent="login">
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" v-model="password" />
    <button>Login</button>
  </form>
</template>

<script>
import { auth } from "../firebase/init";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const cred = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        console.log(cred);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>