<template>
     <div class="container my-5">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                              <b-form-group
                                   id="input-group-1"
                                   label="Primer Nombre"
                                   label-for="input-1"
                              >
                                   <b-form-input
                                        id="input-1"
                                        v-model="form.primerNombre"
                                        placeholder="Ingrese su Primer Nombre"
                                        required
                                   ></b-form-input>
                              </b-form-group>
                              <b-form-group
                                   id="input-group-1"
                                   label="Segundo Nombre"
                                   label-for="input-1"
                              >
                                   <b-form-input
                                        id="input-1"
                                        v-model="form.segundoNombre"
                                        placeholder="Ingrese su Segundo Nombre"
                                        required
                                   ></b-form-input>
                              </b-form-group>

                         <b-form-group
                              id="input-group-2"
                              label="Apellido Paterno"
                              label-for="input-2"
                         >
                              <b-form-input
                                   id="input-2"
                                   v-model="form.apellidoPaterno"
                                   placeholder="Ingrese su Apellido Paterno"
                                   required
                              ></b-form-input>
                         </b-form-group>

                         <b-form-group
                              id="input-group-2"
                              label="Apellido Materno"
                              label-for="input-2"
                         >
                              <b-form-input
                                   id="input-2"
                                   v-model="form.apellidoMaterno"
                                   placeholder="Ingrese su Apellido Materno"
                                   required
                              ></b-form-input>
                         </b-form-group>

                         <b-form-group
                              id="input-group-3"
                              label="Sexo:"
                              label-for="input-3"
                         >
                              <b-form-select
                                   id="input-3"
                                   v-model="form.sexo"
                                   :options="opcion"
                                   required
                              ></b-form-select>
                         </b-form-group>

                         <b-form-group
                              id="input-group-1"
                              label="Email"
                              label-for="input-1"
                         >
                              <b-form-input
                                   id="input-1"
                                   v-model="form.email"
                                   type="email"
                                   placeholder="Ingrese su Email"
                                   required
                              ></b-form-input>
                         </b-form-group>

                         <b-form-group
                              id="input-group-1"
                              label="Contraseña"
                              label-for="input-1"
                         >
                              <b-form-input
                                   id="input-1"
                                   v-model="form.password"
                                   type="password"
                                   placeholder="Ingrese su Contraseña"
                                   required
                              ></b-form-input>
                         </b-form-group>

                         <b-button type="submit" variant="primary"
                              >Submit</b-button
                         >
                         <b-button
                              class="btn-outline-dark"
                              :to="{ name: 'Home' }"
                              >Submit</b-button
                         >
                    </b-form>
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
