<template>
  <div class="background-registro text-white">
    <h1 class="title-registro text-center mb-5">Edita tus datos</h1>
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

      <b-form @submit.prevent="editUser">
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
        <div class="text-center mt-4">
          <b-button type="submit" variant="light">Actualizar</b-button>
          <b-button variant="light" class="mx-5" :to="{ name: 'Home' }"
            >Volver Inicio</b-button
          >
        </div>
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
import { db } from "../main";
export default {
  data() {
    return {
      imageUrl: "",
      form: {
        primerNombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        sexo: null,
        fechaNacimiento: "",
        userID: "",
        photoPerfil: "",
        email: "",
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
    cargarInfoUser() {
      setTimeout(() => {
        let variable = db
          .collection("usuarios")
          .where("userID", "==", this.$store.state.userSession);
        variable
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              console.log("No matching documents.");
              return;
            }
            snapshot.forEach((doc) => {
              this.form.userID = this.$store.state.userSession;
              this.form.primerNombre = doc.data().primerNombre;
              this.form.segundoNombre = doc.data().segundoNombre;
              this.form.apellidoPaterno = doc.data().apellidoPaterno;
              this.form.apellidoMaterno = doc.data().apellidoMaterno;
              this.form.sexo = doc.data().sexo;
              this.form.fechaNacimiento = doc.data().fechaNacimiento;
              this.form.photoPerfil = doc.data().photoPerfil;
              this.form.email = doc.data().email;
            });
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });
      }, 1500);
    },

    editUser() {
      this.$store.dispatch("editandoUsuario", this.form);
      this.$notify({
        title: "¡Editar Usuario!",
        message: "Haz editado tus datos con éxito",
        type: "success",
      });
      console.log('estoy aqui')
      this.$store.dispatch("updateUserNameAct", this.form);
      setTimeout(() => {
        this.$router.push("/usuario");
      }, 1000);
    },
  },

  mounted() {
    this.cargarInfoUser();
  },
};
</script>

<style lang="scss">
.background-registro {
  padding-bottom: 300px;
  background-image: url("../assets/img/pastel.jpg");
  background-size: cover;
  height: 900px;
  width: 100%;
  background-repeat: no-repeat;
}
.title-registro {
  padding-top: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fae0df;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-icon-plus,
.avatar-uploader-icon {
  line-height: 160px !important;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin: auto;
}
</style>
