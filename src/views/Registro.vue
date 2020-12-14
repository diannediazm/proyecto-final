<template>
     <div class="my-5">
          <b-container fluid class="px-5">
               <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-row class="my-1">
                         <b-col sm="2">
                              <label for="input-default">Primer Nombre:</label>
                         </b-col>
                         <b-col sm="4">
                              <b-form-input
                                   id="input-default"
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
                                   id="input-default"
                                   placeholder="Ingresa Segundo Nombre"
                                   v-model="form.segundoNombre"
                                   required
                                   type="text"
                              ></b-form-input>
                         </b-col>
                    </b-row>

                    <b-row class="my-1">
                         <b-col sm="2">
                              <label for="input-default"
                                   >Apellido Paterno:</label
                              >
                         </b-col>
                         <b-col sm="4">
                              <b-form-input
                                   id="input-default"
                                   placeholder="Ingresa Apellido Paterno"
                                   v-model="form.apellidoPaterno"
                                   required
                                   type="text"
                              ></b-form-input>
                         </b-col>

                         <b-col sm="2">
                              <label for="input-default"
                                   >Apellido Materno:</label
                              >
                         </b-col>
                         <b-col sm="4">
                              <b-form-input
                                   id="input-default"
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
                                   id="input-3"
                                   v-model="form.sexo"
                                   :options="opcion"
                                   required
                              ></b-form-select>
                         </b-col>
                    </b-row>

                    <b-row class="my-1">
                         <b-col sm="2">
                              <label for="input-default">Email:</label>
                         </b-col>
                         <b-col sm="4">
                              <b-form-input
                                   id="input-default"
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
                                   id="input-default"
                                   placeholder="Ingresa Contraseña"
                                   v-model="form.password"
                                   required
                                   type="password"
                              ></b-form-input>
                         </b-col>
                    </b-row>
                    <div class="text-center mt-4">
                         <b-button type="submit" variant="primary"
                              >Registrarse</b-button
                         >
                         <b-button
                              variant="info"
                              class="mx-5"
                              :to="{ name: 'Home' }"
                              >Volver Inicio</b-button
                         >
                    </div>
               </b-form>
          </b-container>
     </div>
</template>

<script>
export default {
     data() {
          return {
               form: {
                    primerNombre: "",
                    segundoNombre: "",
                    apellidoPaterno: "",
                    apellidoMaterno: "",
                    sexo: null,
                    email: "",
                    password: "",
               },
               opcion: [
                    { text: "Seleccione una opción", value: null },
                    "Femenino",
                    "Masculino",
               ],
               show: true,
          };
     },
     methods: {
          onSubmit(event) {
               event.preventDefault();
               alert(JSON.stringify(this.form));
          },
          //  onReset(event) {
          //    event.preventDefault()
          //    // Reset our form values
          //    this.form.primerNombre = ''
          //    this.form.segundoNombre = ''
          //    this.form.apellidoPaterno = ''
          //    this.form.apellidoMaterno = ''
          //    this.form.sexo = null
          //    this.form.email = ''
          //    this.form.password = ''
          //    // Trick to reset/clear native browser form validation state
          //    this.show = false
          //    this.$nextTick(() => {
          //      this.show = true
          //    })
          //  }
     },
};
</script>
