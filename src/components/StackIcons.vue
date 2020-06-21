<template>
  <div>
    <img width="35" height="35" v-for="(imgUrl, index) in imgUrls" :key="index" :src="imgUrl" />
  </div>
</template>

<script>
export default {
  name: "StackIcons",
  props: ["imgUrls"]
};
</script>

<style>
img {
  object-fit: cover;
  border-radius: 5px;
}
</style>