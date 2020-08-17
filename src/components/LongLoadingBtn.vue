<template>
  <v-btn
    color="primary"
    @click="emitOnClickEvent"
    :disabled="loading || disabled"
    :loading="loading"
  >
    {{label}}
    <template v-slot:loader>
      <span class="custom-loader">
        <v-icon>mdi-cached</v-icon>
      </span>
    </template>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      loader: this.loading
    };
  },
  props: {
    color: String,
    label: String,
    loading: Boolean,
    disabled: Boolean
  },

  watch: {
    loading() {
      this.loader = this.loading;
    }
  },
  methods: {
    emitOnClickEvent() {
      this.$emit("click");
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>