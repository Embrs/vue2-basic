<template lang="pug">
  #Page1
    Button(@click="Next2") Page2
    Button(@click="Next3" ) Page3
</template>

<script>
export default {
  name: "Page1",
  data() {
    return {};
  },
  methods: {
    Next2() {
      this.$router.push("/Backstage/MenuItem1/Page2");
    },
    Next3() {
      this.$router.push("/Backstage/MenuItem1/Page3");
    }
  }
};
</script>

<style lang="scss" scoped></style>
