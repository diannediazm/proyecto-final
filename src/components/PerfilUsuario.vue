<template>
  <div class="py-5 background-profile text-center">
    <b-container class="formulario text-center">
      <h1 class="mb-5 text-white">¡Hola {{ $store.state.nombreUser }}!</h1>
      <b-row>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3 scrollbar scrollbar-young-passion"
           id="nav-scroller"
           ref="content"
           style="position:relative; height:680px; overflow-y:scroll;">
          <b-card v-for="(data, index) in listFotos" :key="index" class="mb-3 force-overflow"> 
               {{ listFotos[index].name }}
               <img :src="listFotos[index].photoURL" fluid img-alt="Image" img-top width="100%" @click="$bvModal.show('id'+index)">          
               <b-modal v-bind:id="'id'+index" hide-footer>
                  <template #modal-title> {{ listFotos[index].name }} </template>
                  <div class="d-block text-center">
                    {{ listFotos[index].desc }}
                    <img :src="listFotos[index].photoURL" fluid img-alt="Image" img-top width="100%" class="my-2">
                  </div>
                  <b-button pill class="mt-3" block @click="$bvModal.hide('id'+index)"
                    >Cerrar</b-button
                  >
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
              }},
              {{listFotos[index].pais}}
               </small>
               </template>
          </b-card>          
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3"
          id="nav-scroller"
          ref="content"
          style="position:relative; height:680px; overflow-y:scroll;">
          <b-card v-for="(data, index) in listVideos" :key="index" class="mb-3" @click="$bvModal.show('idVideo'+index)"> 
               {{ listVideos[index].name }}
               <b-embed
                    type="iframe"
                    aspect="4by3"
                    :src="listVideos[index].videoURL"
                    allowfullscreen
               ></b-embed>
               <b-modal v-bind:id="'idVideo'+index" hide-footer>
                  <template #modal-title> {{ listVideos[index].name }} </template>
                  <div class="d-block text-center">
                    {{ listVideos[index].desc }}
                  <b-embed
                    type="iframe"
                    aspect="4by3"
                    :src="listVideos[index].videoURL"
                    allowfullscreen
                  ></b-embed>
                  </div>
                  <b-button pill class="mt-3" block @click="$bvModal.hide('idVideo'+index)"
                    >Cerrar</b-button
                  >
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
              }},
              {{listVideos[index].pais}}
               </small>
               </template>
          </b-card>          
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3"
          id="nav-scroller"
          ref="content"
          style="position:relative; height:680px; overflow-y:scroll;">
         <b-card v-for="(data, index) in listHistorias" :key="index" class="card-historia mb-3" header-tag="header" footer-tag="footer" @click="$bvModal.show('idHistoria'+index)">
               <b-modal v-bind:id="'idHistoria'+index" hide-footer>
                  <template #modal-title> {{ listHistorias[index].title }} </template>
                  <div class="d-block text-center">
                    {{ listHistorias[index].text}}
                  </div>
                  <b-button pill class="mt-3" block @click="$bvModal.hide('idHistoria'+index)"
                    >Cerrar</b-button
                  >
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
import { mdbRow, mdbCol } from 'mdbvue';

export default {
  name: "PerfilUsuario",
  data() {
    return {
      historia: [],
      video: [],
      foto: [],
    }
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
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
}
.force-overflow {
    min-height: 450px;
  }
.scrollbar {
    float: left;
    height: 300px;
    width: 150px;
    background: #fff;
    overflow-y: scroll;
    margin-bottom: 25px;
  }
.scrollbar-young-passion::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #F5F5F5;
    border-radius: 10px;
  }

  .scrollbar-young-passion::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }

  .scrollbar-young-passion::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-image: -webkit-gradient(linear, left top, right top, from(#ff8177), color-stop(0%, #ff867a),
      color-stop(21%, #ff8c7f), color-stop(52%, #f99185), color-stop(78%, #cf556c), to(#b12a5b));
    background-image: -webkit-linear-gradient(left, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%,
      #b12a5b 100%);
    background-image: linear-gradient(to bottom, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%,
      #b12a5b 100%);
  }
@media (min-width: 1200px){
     .container, .container-lg, .container-md, .container-sm, .container-xl {
    max-width: 1440px !important;
     }
}
</style>
