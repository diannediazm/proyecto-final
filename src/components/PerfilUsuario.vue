<template>
  <div class="py-5 background-profile text-center text-white">
    <b-container class="formulario text-center">
      <h1 class="mb-5">¡Hola {{ $store.state.nombreUser }} !</h1>
      <b-row>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3">
          <h5>Últimas fotos</h5>
          <div class="box py-5" v-for="(data, index) in listFotos" :key="index">
            <p>Nombre: {{ listFotos[index].name }}</p>
            <p>Desc: {{ listFotos[index].desc }}</p>
            <p>
              fecha foto:
              {{
                Intl.DateTimeFormat("es-CL").format(
                  listFotos[index].date1.toDate()
                )
              }}
            </p>
            <b-img :src="listFotos[index].photoURL" fluid></b-img>
          </div>
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3">
          <h5>Últimos videos</h5>
          <div
            class="box py-5"
            v-for="(data, index) in listVideos"
            :key="index"
          >
            <p>Nombre: {{ listVideos[index].name }}</p>
            <p>Descripcion: {{ listVideos[index].desc }}</p>
            <p>
              fecha:
              {{
                Intl.DateTimeFormat("es-CL").format(
                  listVideos[index].date1.toDate()
                )
              }}
            </p>
            <b-embed
              type="iframe"
              aspect="4by3"
              :src="listVideos[index].videoURL"
              allowfullscreen
            ></b-embed>
          </div>
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3">
          <h5>Últimas historias</h5>
          <div
            class="box py-5"
            v-for="(data, index) in listHistorias"
            :key="index"
          >
            <p>Titulo: {{ listHistorias[index].title }}</p>
            <p>Text: {{ listHistorias[index].text }}</p>
            <p>
              fecha:
              {{
                Intl.DateTimeFormat("es-CL").format(
                  listHistorias[index].fechaHora.toDate()
                )
              }}
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { db } from "../main";
import _ from "lodash";

export default {
  name: "PerfilUsuario",
  data() {
    return {
      historia: [],
      video: [],
      foto: [],
    };
  },

  methods: {
    cargaHistorias() {
      let variable = db
        .collection("historias")
        .where("idUser", "==", this.$store.state.userSession);
      //variable = variable.orderBy('fechaHora');
      variable
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach((doc) => {
            this.historia.push(doc.data());
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },

    cargaVideos() {
      let variableVideo = db
        .collection("videos")
        .where("userID", "==", this.$store.state.userSession);
      variableVideo
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach((doc) => {
            this.video.push(doc.data());
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },

    cargaFotos() {
         let variableVideo = db
        .collection("fotos")
        .where("userID", "==", this.$store.state.userSession);
      variableVideo
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach((doc) => {
            this.foto.push(doc.data());
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });

    },
  },

  computed: {
    listHistorias() {
      return _.orderBy(this.historia, "fechaHora", "desc");
    },
    listVideos() {
      return _.orderBy(this.video, "fechaHora", "desc");
    },
    listFotos() {
      return _.orderBy(this.foto, "fechaHora", "desc");
    },
  },

  mounted() {
    this.cargaHistorias();
    this.cargaVideos();
    this.cargaFotos();
  },
};
</script>

<style lang="scss">
.background-profile {
  padding-bottom: 50px;
  background-image: url("../assets/img/fondousuario.jpg");
  background-size: cover;
  height: 1000px;
  width: 100%;
  background-repeat: no-repeat;
}
</style>
