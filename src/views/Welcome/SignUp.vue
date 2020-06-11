<template lang="pug">
  #SignUp
    p SignUp
    Button(@click="BackLogin") toLogin
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {};
  },
  methods: {
    BackLogin() {
      this.$router.push("/Welcome/SignIn");
    }
  }
};
</script>

<style lang="scss" scoped></style>
