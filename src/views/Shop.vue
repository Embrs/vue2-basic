<template lang="pug">
  #Shop
    p Shop
    Button(@click="EnterShop") Enter Shop
    router-view
</template>

<script>
export default {
  name: "Shop",
  data() {
    return {};
  },
  methods: {
    EnterShop() {
      this.$router.push("/Backstage");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
