<template>
<<<<<<< HEAD
    <div>
        <h1>hola</h1>
    </div>
=======
     <div></div>
>>>>>>> 23a3867c904c2bac60da3fd3938f0470b9f15b1e
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
