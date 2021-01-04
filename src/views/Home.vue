<template>
  <div class="background">
    <Inicio />
    
  </div>
</template>

<script>
// @ is an alias to /src
import Inicio from '@/components/Inicio.vue';

export default {
  name: 'Home',
  components: {
    Inicio
  }
}
</script>

<style lang="scss">
.background {
  background-image: url('../assets/img/woman.jpg');
  background-size: cover;
  height: 800px;
  max-width: 100%;
  background-repeat: no-repeat;
}
</style>
