<template>
  <div class="py-5 background-profile text-center">
    <b-container class="formulario text-center">
      <h1 class="mb-5 text-white">¡Hola {{ $store.state.nombreUser }}!</h1>
      <b-row>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3"
           id="nav-scroller"
           ref="content"
           style="position:relative; height:680px; overflow-y:scroll;">
          <b-card v-for="(data, index) in listFotos" :key="index" class="mb-3"> 
               {{ listFotos[index].name }}
               <img :src="listFotos[index].photoURL" fluid img-alt="Image" img-top width="100%" v-b-modal.modal-1>
               <b-modal id="modal-1" title="Últimas fotos">
                    <img :src="listFotos[index].photoURL" fluid img-alt="Image" img-top width="100%">
               </b-modal>
               <b-card-text>
               {{ listFotos[index].desc }}
               </b-card-text>
               <template #footer>
               <small class="text-muted">
                    {{
                Intl.DateTimeFormat("es-CL").format(
                  listFotos[index].date1.toDate()
                )
              }}
               </small>
               </template>
          </b-card>          
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3"
          id="nav-scroller"
          ref="content"
          style="position:relative; height:680px; overflow-y:scroll;">
          <b-card v-for="(data, index) in listVideos" :key="index" class="mb-3" v-b-modal.modal-2> 
               {{ listVideos[index].name }}
               <b-embed
                    type="iframe"
                    aspect="4by3"
                    :src="listVideos[index].videoURL"
                    allowfullscreen
               ></b-embed>
               <b-modal id="modal-2" title="Últimos videos">
                    <b-embed
                    type="iframe"
                    aspect="4by3"
                    :src="listVideos[index].videoURL"
                    allowfullscreen
               ></b-embed>
               </b-modal>
               <b-card-text>
               {{ listVideos[index].desc }}
               </b-card-text>
               <template #footer>
               <small class="text-muted">
                    {{
                Intl.DateTimeFormat("es-CL").format(
                  listVideos[index].date1.toDate()
                )
              }}
               </small>
               </template>
          </b-card>          
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3"
          id="nav-scroller"
          ref="content"
          style="position:relative; height:680px; overflow-y:scroll;">
         <b-card v-for="(data, index) in listHistorias" :key="index" class="mb-3" header-tag="header" footer-tag="footer" v-b-modal.modal-3>
              <b-modal id="modal-3" title="Últimas historias">
                    <template #header>
                    <h6 class="mb-0">{{ listHistorias[index].title }}</h6>
                    </template>
                    <b-card-text>
                         {{ listHistorias[index].text}}
                    </b-card-text>
               </b-modal>
               <template #header>
               <h6 class="mb-0">{{ listHistorias[index].title }}</h6>
               </template>
               <b-card-text>
                    {{ listHistorias[index].text}}
               </b-card-text>
               <template #footer>
               <em>{{
                Intl.DateTimeFormat("es-CL").format(
                  listHistorias[index].fechaHora.toDate()
                )
              }}</em>
               </template>
          </b-card>
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
       setTimeout(() =>{
            this.cargaHistorias();
            this.cargaVideos();
            this.cargaFotos();
       },1500)
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
@media (min-width: 1200px){
     .container, .container-lg, .container-md, .container-sm, .container-xl {
    max-width: 1440px !important;
     }
}
</style>
