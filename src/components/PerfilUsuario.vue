<template>
     <div class="background-profile text-center">
          <b-container class="py-5">
               <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left>
                    <b-card-text>
                    Some quick example text to build on the card and make up the bulk of the card's content.
                    </b-card-text>
               </b-card>
               <h2 class="my-5 text-white">¡Construye tu respaldo digital!</h2>
               <b-row>
                    <b-col>
                         <b-button href="/fotos" variant="light" class="mr-4">Sube tus fotos</b-button>
                         <b-button href="/videos" variant="light" class="mr-4">Sube tus videos</b-button>
                         <b-button href="/historias" variant="light" class="mr-4">Sube tus historias</b-button>
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
};
</script>

<style lang="scss">
.background-profile {
    padding-bottom: 50px;
    background-image: url('../assets/img/cartu.jpg');
    background-size: cover;
    height: 1000px;
    width: 100%;
    background-repeat: no-repeat;
}
     
</style>
