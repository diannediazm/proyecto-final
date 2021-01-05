<template>
  <div class="background-home">
    <header class="title-home container text-center text-white">
      <h1>¿Quieres revivir tus recuerdos con la misma intensidad en cualquier momento de tu vida?</h1>
      <b-button pill variant="light" :to="{ name: 'Registro' }">¡Crea tu cuenta!</b-button>
    </header>
    <div id="login" class="background-inicio">
      <b-container class="bv-example-row">
        <b-row>
          <b-col class="texto-home mr-4">
          <div class="mt-3">
            <b-card-group deck>
              <b-card bg-variant="info" header="HOKU: Diario de vida digital y heredable" class="text-center text-white">
                <b-card-text>Se estima que 35 millones de personas sufren Alzheimer en el mundo, proyectándose en 135 millones al año 2050 (Alzheimer's Disease International, 2013)</b-card-text>
                <b-card-text>¿Si te pasara a ti?</b-card-text>
                <b-card-text>Con HUKO deja un registro digital de cada momento importante, datos médicos, bancarios e incluso secretos familiares.</b-card-text>
                <b-card-text>¡Tú elige a quién heredar tu historia!</b-card-text>
              </b-card>
            </b-card-group>
          </div>
          </b-col>
          <b-col>
            <b-form @submit.prevent="login" class="form-home">
                <h4>Inicia sesión</h4>
              <b-form-group
                  id="input-group-1"
                  label="Correo electrónico"
                  label-for="input-1"
              >
                  <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Escribe tu correo electrónico"
                  ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
                  <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Escribe tu contraseña"
                  ></b-form-input>
              </b-form-group>

              <b-button pill type="submit" variant="info">Iniciar Sesión</b-button>
              
              </b-form>
          </b-col>
        </b-row>
      </b-container>  

      <b-container class="cards-home">
      <b-card-group deck >
      <b-card title="Fotografías">
        <img src="../assets/img/camarawoman.jpg" alt="image" img-top width="100%">
        <b-card-text class="my-3">
          A diario nuestros dispositivos se llenan de fotos. Elige cuáles son las que quieres recordar, agrúpalas por evento o persona especial.
        </b-card-text>
        <b-button pill href="/fotos" variant="info">Sube tus fotos</b-button>
      </b-card>

      <b-card title="Videos">
        <img src="../assets/img/video.jpg" alt="image" img-top width="100%">
        <b-card-text class="my-3">
          Respalda los videos más importantes, esos que buscas para ver nuevamente.
        </b-card-text>
        <b-button pill href="/videos" variant="info" class="mt-5">Sube tus videos</b-button>
      </b-card>

      <b-card title="Historias">
        <img src="../assets/img/story.jpg" alt="image" img-top width="100%">
        <b-card-text class="my-3">
          ¿Recuerdas tu primer beso? La memoria es frágil. Escribe acá eso que no le cuentas a nadie.
        </b-card-text>
        <b-button pill href="/historias" variant="info" class="mt-4">Sube tus historias</b-button>
      </b-card>
    </b-card-group>
    <b-container class="casos my-5">
      <b-row>
        <b-col>
          <img src="../assets/img/pareja.jpg" alt="" class="avatar" rounded="circle">
        </b-col>
        <b-col>
          <h5 class="casos-text">"Mi marido falleció repentinamente. Fue un dolor tremendo. Luego de pasar el schock empecé a re ordenar la vida y recordé la cuenta de criptomonedas donde él había estado invirtiendo para el futuro familiar. Me comuniqué con ellos, pero no pudieron darme acceso. Solo logré entrar gracias a que Jorge me heredó su información en HOKU."</h5>  
          <p>Carolina, 30 años.</p>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="casos my-5">
      <b-row class="casos-linea">
        <b-col>
          <img src="../assets/img/abuelo.jpg" alt="" class="avatar" rounded="circle">
        </b-col>
        <b-col>
          <h5 class="casos-text">"Me detectaron Alzheimer y antes de que se me empiecen a olvidar las cosas, quiero dejar un legado para mis nietas. Aún están muy pequeñas, pero podré heredarles mis historias para cuando sean mayores. Hoku es fácil de usar y será mi respaldo de memoria para cuando mi mente se vaya"</h5>
          <p>Fernando, 75 años.</p>  
        </b-col>
      </b-row>
    </b-container>
       </b-container>
    </div>
    <footer class="bg-dark text-white">
      <h2 class="text-footer text-center font-weight-bold">HOKU</h2>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Inicio',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    
    methods: {
      login(){
          if (this.form.email && this.form.password && this.form.password.length >= 6){
              firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
              .then(() => {

                  this.$router.push('/usuario');
              })
              .catch(error => {
                  console.error(error.code);
                  console.error(error.message);
                if (error.code == "auth/wrong-password") {
                    this.$notify.error({
                    title: 'Error',
                    message: 'Contraseña inválida'
                });
                } else if (error.code == "auth/user-not-found") {
                    this.$notify.error({
                    title: 'Error',
                    message: 'Usuario no encontrado, favor registrarse'
                });
                this.$router.push('/registro')
                }                   
              })
          }
          else {
              console.log("No ingresa");
          }
      }
    },
    beforeCreate() {
      console.log("inicio: " + this.$store.state.userSession)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.background-home {
    background-image: url('../assets/img/woman.jpg');
    background-size: cover;
    height: 800px;
    max-width: 100%;
    background-repeat: no-repeat;
  }
</style>
