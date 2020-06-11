<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC");

html {
  letter-spacing: 1.2px;
  @include size;
  @extend %init;
  body {
    font-size: 1rem;
    // background: $bgc_base;
    // background-image: radial-gradient(
    //   ellipse at center,
    //   $bgc_base2 0%,
    //   $bgc_base 100%
    // );
    @include size;
    #app {
      font-family: "Noto Sans TC,Din,Microsoft JhengHei,Avenir,Helvetica,Arial,sans-serif";
      @extend body;
    }
  }
}
</style>
