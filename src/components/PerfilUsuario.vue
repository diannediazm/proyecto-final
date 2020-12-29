<template>
     <div></div>
</template>

<script>

export default {
     name: "PerfilUsuario",

     beforeCreate: function() {
          console.log("perfilUsuario: " + this.$store.state.userSession);
          
     },
};
</script>
