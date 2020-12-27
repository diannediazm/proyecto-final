<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col class="texto mr-4 text-white">
          <h1 >¿Quieres revivir tus recuerdos con la misma intensidad en cualquier momento de tu vida?</h1>
          <b-button variant="outline-light" :to="{ name: 'Registro' }">¡Crea tu cuenta!</b-button>
        </b-col>
        <b-col>
          <b-form @submit.prevent="login" class="form text-white">
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

            <b-button type="submit" variant="light">Iniciar Sesión</b-button>
            
            </b-form>
        </b-col>
      </b-row>
    </b-container>  

    <b-container>
    <b-card-group deck >
    <b-card title="Fotografías">
      <img src="../assets/img/camarawoman.jpg" alt="image" img-top width="100%">
      <b-card-text class="my-3">
        Elige cuáles son tus fotografías más importantes y cuál es la historia de cada una
      </b-card-text>
    </b-card>

    <b-card title="Videos">
      <img src="../assets/img/video.jpg" alt="image" img-top width="100%">
      <b-card-text class="my-3">
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
    </b-card>

    <b-card title="Historias">
      <img src="../assets/img/camarawoman.jpg" alt="image" img-top width="100%">
      <b-card-text class="my-3">
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
    </b-card>
  </b-card-group>
  </b-container>
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
              console.log("ingresa");
              firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
              .then(resp => {
                  console.log(resp.user);
                  this.$router.push('/user');
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
                    message: 'Usuario no encontrado'
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bv-example-row {
  padding: 200px;
  color: #393e46;
}

.form {
  width: 100%;
}
.texto{
  padding-left: 100px;
}
</style>
