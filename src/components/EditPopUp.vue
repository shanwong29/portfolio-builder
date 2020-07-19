<template>
  <div>
    <nav>
      <button @click="setDisplayEditCmp('EditAbout')">About</button>
      <!-- <button @click="setDisplayEditCmp('EditProjects')">Projects</button> -->
      <button @click="setDisplayEditCmp('EditContact')">Contact</button>
    </nav>
    <component :is="displayEditCmp" :firestoreBasicInfo="firestoreBasicInfo"></component>
  </div>
</template>

<script>
import EditAbout from "./EditAbout";
import EditContact from "./EditContact";

export default {
  components: { EditAbout, EditContact },
  props: ["firestoreBasicInfo"],
  data() {
    return {
      displayEditCmp: "EditAbout"
    };
  },
  methods: {
    setDisplayEditCmp(targetCmp) {
      return (this.displayEditCmp = targetCmp);
    }
  }
};
</script>

<style>
</style>