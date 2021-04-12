<template>
  <v-snackbar
    @input="showSnackbarStateChanged"
    :value="value"
    :color="hasErr ? 'error' : ''"
    :text="hasErr"
    :top="top"
    :bottom="top ? false : true"
    multi-line
    :timeout="getTimeout"
  >
    <div style="white-space: pre-line;">{{ snackbarMsg }}</div>
    <template v-slot:action="{ attrs }">
      <v-btn :color="hasErr ? 'grey' : 'blue'" text v-bind="attrs" @click="showSnackbarStateChanged(false)">{{
        hasErr ? "close" : "ok"
      }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ["hasErr", "snackbarMsg", "value", "timeout", "top"],
  computed: {
    getTimeout() {
      if (this.hasErr) {
        return -1;
      }
      if (this.timeout) {
        return this.timeout;
      }
      return 3000;
    }
  },
  methods: {
    showSnackbarStateChanged(updatedValue) {
      this.$emit("input", updatedValue);
    }
  }
};
</script>

<style></style>
