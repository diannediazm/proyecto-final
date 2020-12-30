<template>
  <div class="about">
    <h1>This is an about page</h1>

    
  </div>
</template>

<script>

export default {
  name: 'About',


 beforeCreate: function(){
      console.log("about: " + this.$store.state.userSession);
      console.log(this.$firebase.auth().currentUser)
    }
 
}
</script>
