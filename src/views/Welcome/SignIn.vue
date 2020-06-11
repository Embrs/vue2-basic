<template lang="pug">
  #SignIn
    p SignIn
    Button(@click="SignIn") SignIn
    Button(@click="SingUp") to Sign Up
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {};
  },
  methods: {
    async SignIn() {
      // const res = await this.$api.Login({ email: "harry", password: "111111" });
      // console.log("loginAPI", res);

      const user = {
        role: "bb"
      };
      localStorage.setObjectHash(window.userInfo, user);

      // rbacData 必寫
      const rbacData = {
        role: "bb",
        rule: {
          pages: ["Page1", "Page2", "SignUp"],
          components: ["component1"]
        }
      };
      localStorage.setObjectHash(window.rbacRule, rbacData);
      this.$router.push("/Shop");
      return;
    },
    SingUp() {
      this.$router.push("/Welcome/SignUp");
    }
  }
};
</script>

<style lang="scss" scoped></style>
