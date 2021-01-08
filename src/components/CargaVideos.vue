<template>
  <div class="background-videos text-white">
    <div class="text-videos text-center">
      <h1>¿Cuáles son los videos que miras una y otra vez?</h1>
      <p class="bajada-title">
        Estamos subiendo videos a redes sociales, recibiendo desde chats
        familiares, pero ¿tienes a mano los realmente importantes?
      </p>
    </div>
    <b-container>
      <b-row class="formulario">
        <b-col class="text-center my-4">
          <h3 text-left>¡Sube tus videos!</h3>
          <p class="text-left">
            Elige un nombre para el video: un día o alguien especial
          </p>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Nombre">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <p class="text-left">¿Recuerdas la fecha?</p>
            <el-form-item label="Rango de fecha">
              <el-col>
                <el-date-picker
                  type="date"
                  placeholder="Pick a date"
                  v-model="form.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <p class="text-left">
              ¿Lugar del video?
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
              Escribe alguna anécdota, historia o incluso algún secreto
              relacionado.
            </p>
            <el-form-item label="Descripción">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </b-col>
        <b-col class="carga my-5 text-center">
<<<<<<< HEAD
          <b-form-group label="Opciones de carga" v-slot="{ ariaDescribedby }">
=======
          <b-form-group label="Elige tu opción de video" v-slot="{ ariaDescribedby }">
>>>>>>> 06700317a8f61523b18c2b4f31000b88471c95f8
            <b-form-radio
              @change="clickLink"
              :model="selected"
              :aria-describedby="ariaDescribedby"
              :checked="'A'"
              name="some-radios"
              value="A"
<<<<<<< HEAD
              >Desde Youtube</b-form-radio
=======
              >Link de YouTube</b-form-radio
>>>>>>> 06700317a8f61523b18c2b4f31000b88471c95f8
            >
            <b-form-radio
              @change="clickVideo"
              :model="selected"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="B"
<<<<<<< HEAD
              >Desde tu dispositivo</b-form-radio
=======
              >Carga tu propio Video</b-form-radio
>>>>>>> 06700317a8f61523b18c2b4f31000b88471c95f8
            >
          </b-form-group>
          <el-form ref="form" :model="form">
            <el-form-item v-show="isShowLink" label="Link Youtube">
              <el-input v-model="form.videoURL"></el-input>
            </el-form-item>
            <el-form-item>
              <el-upload
                v-show="isShowVideo"
                class="upload-demo"
                drag
                :http-request="upload"
                action="cargaArchivo"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                accept="video/mp4"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  Suelta tu archivo aquí o
                  <em>haz clic para cargar</em>
                </div>
                <div slot="tip" class="el-upload__tip text-white">
                  Solo archivos jpg/png con un tamaño menor de 500kb
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="light" round @click="onSubmit">Subir</el-button>
              <el-button type="danger" round @click="volver">Volver</el-button>
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
  name: "CargaVideos",
  data() {
    return {
      country: [],
      loading: false,
      isShowLink: true,
      isShowVideo: false,
      form: {
        name: "",
        date1: "",
        desc: "",
        videoURL: "",
        userID: "",
        pais: "",
      },
      selected: "",
      rules: [
        (value) =>
          !value ||
          value.size < 100000000 ||
          "El tamaño del video debe ser inferior a 1GB",
      ],
      fileList: [],
      archivo: {},
    };
  },
  methods: {
    clickLink() {
      this.isShowLink = !this.isShowLink;
      this.isShowVideo = !this.isShowVideo;
      this.selected = "A";
    },
    clickVideo() {
      this.isShowLink = !this.isShowLink;
      this.isShowVideo = !this.isShowVideo;
      this.selected = "B";
    },
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
        } archivos esta vez, añade hasta ${files.length + fileList.length}`
      );
    },
    upload(file) {
      this.archivo = file.file;
      this.videoURL = this.archivo.name;
    },
    onSubmit(event) {
      console.log(event);
      if(this.form.name == "" || this.form.date1 == "" || this.form.desc == "" || this.form.pais == "" || this.form.videoURL == ""){
        this.$notify({
                         title: "Todos los campos son requeridos!",
                         message: "Favor completar los campos vacios",
                         type: "warning",
                         });
                    return false;
      }else if (this.selected == 'B') {
        let userid = this.$store.state.userSession;
        let storageRef = firebase
          .storage()
          .ref(userid + "/videos/" + this.archivo.name);
        storageRef
          .put(this.archivo)
          .then((snapshot) => {
            console.warn(snapshot.bytesTransferred / snapshot.totalBytes);
          })
          .then(() => {
            setTimeout(() => {
              this.subiendo = 0;
            }, 1500);
            storageRef.getDownloadURL().then((downloadURL) => {
              this.form.videoURL = downloadURL;
              this.form.userID = this.$store.state.userSession;
              this.$store.dispatch("cargandoVideos", this.form);
              this.$router.push("/usuario");
            });

            this.$notify({
              title: "¡Subida exitosa!",
              message: "Tu video se subió",
              type: "success",
            });
          });
      }else{
           this.form.videoURL = this.form.videoURL.replace('watch?v=','embed/');
           this.form.userID = this.$store.state.userSession;
           this.$store.dispatch("cargandoVideos", this.form);
           this.$notify({
              title: "¡Subida exitosa!",
              message: "Tu video se subió",
              type: "success",
            });
           this.$router.push("/usuario");
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
.background-videos {
  padding-bottom: 50px;
  background-image: url("../assets/img/playa.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
}
</style>
