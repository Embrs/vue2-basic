<template lang="pug">
  #Welcome
    p Welcome
    transition(name="slide-fade" mode="out-in")
    router-view
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
