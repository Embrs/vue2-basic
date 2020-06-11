<template lang="pug">
  #Backstage
    p Backstage
    transition(name="slide-fade" mode="out-in")
      router-view
</template>

<script>
export default {
  name: "Backstage"
};
</script>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
