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
  background-image: url('../assets/img/flecha-azul.jpg');
  background-size: cover;
  height: 665px;
  width: 100%;
  background-repeat: no-repeat;
  background-position-y: -120px;
}
</style>
