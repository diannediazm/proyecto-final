<template>
     <div class="py-5 background-profile text-center text-white">
          <b-container class="formulario">
               <h1 class="mb-5">¡Hola  !</h1>
               <b-row>
                    <b-col>
                         <h5>Últimas fotos</h5>
                         <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
                    </b-col>
                    <b-col>
                         <h5>Últimos videos</h5>
                         <b-embed
                         type="iframe"
                         aspect="16by9"
                         src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                         allowfullscreen
                         ></b-embed>
                    </b-col>
                    <b-col>
                         <h5>Últimas historias</h5>
                         <b-card bg-variant="light" header="Light" class="text-center text-dark">
                         <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                         </b-card>
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
     
</style>
