<template>
  <div class="background-registro text-white">
    <h1 class="title-registro text-center mb-5">¡Únete a HOKU!</h1>
    <b-container class="px-5">
      <el-upload
        class="avatar-uploader text-center"
        :http-request="upload"
        action="cargaArchivo"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="form.photoPerfil" :src="form.photoPerfil" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <b-form @submit.prevent="createUser">
        <h5 class="text-center mb-4">Sube tu foto de perfil</h5>
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
          <b-col>
          <div class="text-center mt-4">
          <b-button type="submit" variant="light">Registrarse</b-button>
          <b-button variant="light" class="mx-2" :to="{ name: 'Home' }"
            >Volver Inicio</b-button
          >
        </div>
        </b-col>
        </b-row>
        
      </b-form>
    </b-container>
    <b-container class="mt-5">
      <b-row>
        <b-col cols="4">
          <i class="el-icon-user-solid"></i>
        </b-col>
        <b-col cols="8">
          <h6>Tu perfil será completamente privado</h6>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <i class="el-icon-circle-plus"></i>
        </b-col>
        <b-col cols="8">
          <h6>Eliges con quién compartir información clave</h6>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <i class="el-icon-s-flag"></i>
        </b-col>
        <b-col cols="8">
          <h6>
            Tus datos más importantes y privados estarán respaldados en caso de
            emergencia
          </h6>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <i class="el-icon-s-comment"></i>
        </b-col>
        <b-col cols="8">
          <h6>
            ¡La memoria es frágil! Guarda hoy los detalles de tus momentos
            épicos
          </h6>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      imageUrl: "",
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
        photoPerfil: "",
      },
      opcion: [
        { text: "Seleccione una opción", value: null },
        "Femenino",
        "Masculino",
      ],
      fileList: [],
      archivo: {},
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("¡La imagen debe estar en formato JPG!");
      }
      if (!isLt2M) {
        this.$message.error("¡La imagen excede los 2MB!");
      }
      return isJPG && isLt2M;
    },
    upload(file) {
      console.log(file);
      this.archivo = file.file;
      let storageRef = firebase
        .storage()
        .ref("photosPerfiles/" + this.archivo.name);
      storageRef
        .put(this.archivo)
        .then((snapshot) => {
          console.log("funciona");
          console.warn(snapshot.bytesTransferred / snapshot.totalBytes);
        })
        .then(() => {
          setTimeout(() => {
            this.subiendo = 0;
          }, 1500);
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.form.photoPerfil = downloadURL;
          });
        });
    },

    createUser() {
      if (this.form.email && this.form.password) {
        //console.log("entro");
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((resp) => {
            this.form.userID = resp.user.uid;
            this.$store.dispatch("creandoUsuarios", this.form);
            this.$router.push("/usuario");
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

<style lang="scss">
.background-registro {
  padding-bottom: 300px;
  background-image: url("../assets/img/pastel.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
}

</style>
