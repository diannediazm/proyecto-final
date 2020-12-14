<template>
  <div>
    <Navbar />
    <Home />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Home from '@/views/Home.vue';
export default {
  name: 'App',
  components: {
    Navbar,
    Home
  }
}
</script>

<style lang="scss">

</style>
