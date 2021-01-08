<template>
     <div class="background-fotos">
          <b-container class="pb-5">
               <div class="title-fotos text-center text-white">
                    <h1>¡Sube tus fotografías!</h1>
                    <p class="bajada-title">
                         No dejes que tus fotos más importantes se pierdan en
                         dispositivos. Selecciónalas y guárdalas según fecha,
                         significado o historia memorable.
                    </p>
               </div>
               <b-row class="formulario">
                    <b-col xl="6" lg="6" md="6" xs="12" class="text-center text-white">
                         <h3>Diseña tu galería</h3>
                         <p class="text-left">
                              Elige un nombre que identifique a las fotografías:
                              un día especial, una persona o tu mascota.
                         </p>
                         <el-form ref="form" :model="form" label-width="120px">
                              <el-form-item label="Nombre">
                                   <el-input v-model="form.name"></el-input>
                              </el-form-item>
                              <p class="text-left">
                                   ¿Recuerdas la fecha de las fotografías?
                              </p>
                              <el-form-item label="Rango de fecha">
                                   <el-col>
                                        <el-date-picker
                                             type="date"
                                             placeholder="Pick a date"
                                             v-model="form.date1"
                                             style="width: 100%;"
                                        ></el-date-picker>
                                   </el-col>
                              </el-form-item>
                              <p class="text-left">
                                   ¿Dónde sacaste las fotos?
                              <el-select
                                   v-model="form.pais"
                                   v-if="country"
                                   filterable
                                   remote
                                   reserve-keyword
                                   placeholder="Ingresa el país"
                                   :loading="loading"
                              >
                                   <el-option
                                        v-for="item in country"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                   >
                                   </el-option>
                              </el-select>
                              </p>
                              <p class="text-left">
                                   Escribe alguna anécdota, historia o incluso
                                   algún secreto relacionado.
                              </p>
                              <el-form-item label="Descripción">
                                   <el-input
                                        type="textarea"
                                        v-model="form.desc"
                                   ></el-input>
                              </el-form-item>
                         </el-form>
                    </b-col>
                    <b-col xl="6" lg="6" md="6" xs="12" class="carga my-5 text-center">
                         <el-form ref="form" :model="form">
                              <el-form-item>
                                   <el-upload
                                        class="upload-demo"
                                        drag
                                        :http-request="upload"
                                        action="cargaArchivo"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :file-list="fileList"
                                        multiple
                                   >
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">
                                             Suelta tu archivo aquí o
                                             <em>haz clic para cargar</em>
                                        </div>
                                        <div
                                             slot="tip"
                                             class="el-upload__tip text-white"
                                        >
                                             Solo archivos jpg/png con un tamaño
                                             menor de 500kb
                                        </div>
                                   </el-upload>
                              </el-form-item>
                              <el-form-item>
                                   <el-button
                                        type="light"
                                        round
                                        @click="onSubmit"
                                        >Subir</el-button
                                   >
                                   <el-button
                                        type="danger"
                                        round
                                        @click="volver"
                                        >Volver</el-button
                                   >
                              </el-form-item>
                         </el-form>
                    </b-col>
               </b-row>
          </b-container>
     </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
     name: "CargaFotos",
     data() {
          return {
               country: [],
               loading: false,
               form: {
                    name: "",
                    date1: "",
                    desc: "",
                    photoURL: "",
                    userID: "",
                    pais: "",
               },
               rules: {
                    name: [
                         {
                              required: true,
                              message: "Ingresa un nombre para tu fotografía",
                              trigger: "blur",
                         },
                         {
                              min: 3,
                              max: 5,
                              message:
                                   "El nombre debe tener de tres a 15 letras",
                              trigger: "blur",
                         },
                    ],
                    date1: [
                         {
                              type: "date",
                              required: true,
                              message: "Elige una fecha",
                              trigger: "change",
                         },
                    ],
                    desc: [
                         {
                              required: true,
                              message: "Por favor, escribe sobre la fotografía",
                              trigger: "blur",
                         },
                    ],
               },
               fileList: [],
               archivo: {},
          };
     },
     methods: {
          handleRemove(file, fileList) {
               console.log(file, fileList);
          },
          handlePreview(file) {
               console.log(file);
          },
          handleExceed(files, fileList) {
               this.$message.warning(
                    `El límite es 3, haz seleccionado ${
                         files.length
                    } archivos esta vez, añade hasta ${files.length +
                         fileList.length}`
               );
          },
          upload(file) {
               console.log(file);
               this.archivo = file.file;
          },
          onSubmit(event) {
               console.log(event);
               console.log(this.archivo);
               if (this.archivo) {
                    let userid = this.$store.state.userSession;
                    console.log(userid);
                    let storageRef = firebase
                         .storage()
                         .ref(userid + "/imagen/" + this.archivo.name);
                    storageRef
                         .put(this.archivo)
                         .then((snapshot) => {
                              console.log("funciona");
                              console.warn(
                                   snapshot.bytesTransferred /
                                        snapshot.totalBytes
                              );
                         })
                         .then(() => {
                              setTimeout(() => {
                                   this.subiendo = 0;
                              }, 1500);
                              storageRef
                                   .getDownloadURL()
                                   .then((downloadURL) => {
                                        console.log(
                                             "File available at",
                                             downloadURL
                                        );
                                        this.form.photoURL = downloadURL;
                                        this.form.userID = this.$store.state.userSession;
                                        this.$store.dispatch(
                                             "cargandoFotos",
                                             this.form
                                        );
                                        this.$router.push("/usuario");
                                   });
                              this.$notify({
                                   title: "¡Subida exitosa!",
                                   message: "Tu fotografía se subió",
                                   type: "success",
                              });
                         });
               }
          },
          volver() {
               this.$router.push("/usuario");
          },

          async cargarPaises() {
               let api = "https://restcountries.eu/rest/v2/all";
               let respuesta = await axios.get(api);
               respuesta.data.forEach((element) => {
                    this.country.push(element.name);
               });
          },
     },
     mounted() {
          this.cargarPaises();
     },
};
</script>

<style lang="scss">
.background-fotos {
     background-image: url("../assets/img/cargafotos.jpg");
     background-size: cover;
     height: 100%;
     width: 100%;
     background-repeat: no-repeat;
}

</style>
