<template>
     <div class="py-5 background-profile text-center text-white">
          <b-container class="formulario text-center">
               <h1 class="mb-5">¡Hola  !</h1>
               <b-row>
                    <b-col class="my-3">
                         <h5>Últimas fotos</h5>
                         <div class="box py-5"></div>
                    </b-col>
                    <b-col class="my-3">
                         <h5>Últimos videos</h5>
                         <div class="box py-5"></div>
                    </b-col>
                    <b-col class="my-3">
                         <h5>Últimas historias</h5>
                         <div class="box py-5"></div>
                    </b-col>
               </b-row>
          </b-container>
     </div>
</template>

<script>

export default {
     name: "PerfilUsuario",
     

          beforeCreate: function() {
               console.log("perfilUsuario: " + this.$store.state.userSession);
               
          },
     }

</script>

<style lang="scss">
.background-profile {
    padding-bottom: 50px;
    background-image: url('../assets/img/fondousuario.jpg');
    background-size: cover;
    height: 1000px;
    width: 100%;
    background-repeat: no-repeat;
}
.box {
     background-color: darkmagenta;
     width: 90%;
     height: 90%;
}
     
</style>
