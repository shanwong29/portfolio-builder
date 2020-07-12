<template>
  <div>
    <h3>Welcome to use this Portfolio Starter.</h3>
    <p>
      By submitting this initial form, you email will be set as an Admin user in
      your firestore. When this step is done, remember to change the security
      setting in firebase.
    </p>
    <form @submit.prevent="signup">
      <input type="email" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="passwordOne" />
      <input
        type="password"
        placeholder="Enter Password again"
        v-model="passwordTwo"
      />
      <input
        type="text"
        v-model="userFullName"
        placeholder="your display name"
      />
      <button>Initial App</button>
    </form>
  </div>
</template>

<script>
import { auth, db, functions } from "../firebase/init";
export default {
  data() {
    return {
      email: "",
      passwordOne: "",
      passwordTwo: "",
      userFullName: "",
    };
  },

  async created() {
    try {
      const querySnapshot = await db.collection("users").get();
      if (querySnapshot.docs.length) {
        this.$router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async signup() {
      if (this.passwordOne !== this.passwordTwo) {
        alert("password does not match");
        return;
      }
      try {
        // Add user
        const cred = await auth.createUserWithEmailAndPassword(
          this.email,
          this.passwordOne
        );
        // here the user is already signuped & logined, and firebase assign a uuid to this user

        // create user collection
        await db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            fullName: this.userFullName,
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
      }
    },
  },
};
</script>

<style></style>
