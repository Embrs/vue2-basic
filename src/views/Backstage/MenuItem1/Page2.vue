<template lang="pug">
  #Page2
    Button(@click="Next") Page1
</template>

<script>
export default {
  name: "Page2",
  data() {
    return {};
  },
  methods: {
    Next() {
      this.$router.push("/Backstage/MenuItem1/Page1");
    }
  }
};
</script>

<style lang="scss" scoped></style>
