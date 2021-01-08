<template>
  <div class="py-5 background-profile text-center">
    <b-container class="formulario text-center">
      <h1 class="mb-5 text-white">¡Hola {{ $store.state.nombreUser }}!</h1>
      <b-row>
        
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3">
          <vuescroll :ops="ops">
          <b-card v-for="(data, index) in listFotos" :key="index" class="mb-3"> 
               {{ listFotos[index].name }}
               <img :src="listFotos[index].photoURL" fluid img-alt="Image" img-top width="100%" @click="$bvModal.show('id'+index)">          
               <b-modal v-bind:id="'id'+index" hide-footer>
                  <template #modal-title> {{ listFotos[index].name }} </template>
                  <div class="d-block text-center">
                    {{ listFotos[index].desc }}
                    <b-button pill variant="outline-secondary">Secondary</b-button>
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
          </vuescroll>         
        </b-col>
        
        
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3">
          <vuescroll :ops="ops">
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
          </vuescroll>  
        </b-col>
        <b-col xl="4" lg="4" md="4" xs="12" class="my-3">
          <vuescroll :ops="ops">
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
          </vuescroll>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { db } from "../main";
import _ from "lodash";
import vuescroll from 'vuescroll';

export default {
  name: "PerfilUsuario",
  data() {
    return {
      historia: [],
      video: [],
      foto: [],
      ops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {},
          bar: {
            showDelay: 500,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#c1c1c1',
            opacity: 1,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: 0,
            size: '6px',
            disable: false,
           },
        }
    }
  },
  components: {
    vuescroll
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

@media (min-width: 1200px){
     .container, .container-lg, .container-md, .container-sm, .container-xl {
    max-width: 1440px !important;
     }
}
</style>
