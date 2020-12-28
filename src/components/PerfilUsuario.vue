<template>
     <div></div>
</template>

<script>
import { userSession } from "../store/store";
export default {
     name: "PerfilUsuario",

     beforeCreate: function() {
          console.log("perfilUsuario: " + userSession);
          if(!userSession){
               this.$router.push('/');
          }
     },
};
</script>
