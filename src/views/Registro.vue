<template>
  <div class="mt-5">
    <b-container class="px-5">
      <b-form @submit.prevent="createUser">
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">Rut:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="rut"
              placeholder="Ingresa su RUT"
              v-model="form.rut"
              required
              type="text"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">Primer Nombre:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="primerNombre"
              placeholder="Ingresa Primer Nombre"
              v-model="form.primerNombre"
              required
              type="text"
            ></b-form-input>
          </b-col>

          <b-col sm="2">
            <label for="input-default">Segundo Nombre:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="segundoNombre"
              placeholder="Ingresa Segundo Nombre"
              v-model="form.segundoNombre"
              required
              type="text"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">Apellido Paterno:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="apellidoPaterno"
              placeholder="Ingresa Apellido Paterno"
              v-model="form.apellidoPaterno"
              required
              type="text"
            ></b-form-input>
          </b-col>

          <b-col sm="2">
            <label for="input-default">Apellido Materno:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="apellidoMaterno"
              placeholder="Ingresa Apellido Materno"
              v-model="form.apellidoMaterno"
              required
              type="text"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">Sexo:</label>
          </b-col>
          <b-col sm="4">
            <b-form-select
              id="sexo"
              v-model="form.sexo"
              :options="opcion"
              required
            ></b-form-select>
          </b-col>

          <b-col sm="2">
            <label for="input-default">Fecha de Nacimiento:</label>
          </b-col>
          <b-col sm="4">
            <b-form-datepicker
              id="fechaNacimiento"
              calendarLocale="es-CL"
              placeholder="Ingresa Fecha de Nacimiento"
              v-model="form.fechaNacimiento"
              class="mb-2"
            ></b-form-datepicker>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">Email:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="email"
              placeholder="Ingresa Email"
              v-model="form.email"
              required
              type="email"
            ></b-form-input>
          </b-col>

          <b-col sm="2">
            <label for="input-default">Contraseña:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              id="password"
              placeholder="Ingresa Contraseña"
              v-model="form.password"
              required
              type="password"
            ></b-form-input>
          </b-col>
        </b-row>
        <div class="text-center mt-4">
          <b-button type="submit" variant="primary">Registrarse</b-button>
          <b-button variant="info" class="mx-5" :to="{ name: 'Home' }"
            >Volver Inicio</b-button
          >
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        rut: "",
        primerNombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        sexo: null,
        fechaNacimiento: "",
        email: "",
        password: "",
        userID: "",
      },
      opcion: [
        { text: "Seleccione una opción", value: null },
        "Femenino",
        "Masculino",
      ],
    };
  },
  methods: {
    
    createUser() {
      if (this.form.email && this.form.password) {
        //console.log("entro");
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((resp) => {
            this.form.userID = resp.user.uid;
            try {
              this.$store.dispatch("creandoUsuarios", this.form);
              this.$router.push("/about");
            } catch (error) {
              console.log(`Error creando usuario: ${error}`);
            }
          })
          .catch((error) => {
            console.error(error.code);
            console.error(error.message);
            if (error.code == "auth/email-already-in-use") {
              this.errores(error);
            } else if (error.code == "auth/invalid-email") {
              this.errores(error);
            } else if (error.code == "auth/weak-password") {
              this.errores(error);
            } else {
              this.errores(error);
            }
          });
      } else {
        console.log("No se puede conectar");
      }
    },
    errores(error) {
      this.$notify.error({
        title: "Error",
        message: `${error.message}`,
      });
    },
  },
};
</script>
