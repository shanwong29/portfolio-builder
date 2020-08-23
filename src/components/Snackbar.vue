<template>
  <v-snackbar
    @input="showSnackbarStateChanged"
    :value="value"
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
        @click="showSnackbarStateChanged(false)"
      >Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ["hasErr", "snackbarMsg", "value"],

  methods: {
    showSnackbarStateChanged(updatedValue) {
      this.$emit("input", updatedValue);
    }
  }
};
</script>

<style>
</style>