<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input v-rut v-model="rut">


  </div>
</template>

<script>

export default {
  name: 'About',
  data() {
    return {
      rut: ''
      }

  },

 beforeCreate: function(){
      console.log("about: " + this.$store.state.userSession);
    }
 
}
</script>
