<template>
  <div>
    <Navbar />
     <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>

<style lang="scss">
@import "./style/sass/main.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
