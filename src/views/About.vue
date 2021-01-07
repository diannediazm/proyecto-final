<template>
  <div class="about">
    <h1>historias</h1>
    <div v-for="(data, index) in listHistorias" :key="index">
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

      <b-button id="show-btn" @click="$bvModal.show('id'+index)"
        >{{index}}</b-button
      >

      <b-modal v-bind:id="'id'+index" hide-footer>
        <template #modal-title> Using <code>$bvModal</code> Methods </template>
        <div class="d-block text-center">
          <h3>Hello From This Modal! {{index}}</h3>
        </div>

        <b-button class="mt-3" block @click="$bvModal.hide('id'+index)"
          >Close Me</b-button
        >
      </b-modal>
    </div>
    <h1>videos</h1>
    <div v-for="(data, index) in video" :key="index">
      <p>Nombre: {{ video[index].name }}</p>
      <p>Descripcion: {{ video[index].desc }}</p>
      <p>fecha: {{ video[index].date1 }}</p>
      <p>videoURL: {{ video[index].videoURL }}</p>
      <b-embed
        type="iframe"
        aspect="4by3"
        :src="video[index].videoURL"
        allowfullscreen
      ></b-embed>
    </div>

    <h1>fotos</h1>
    <div v-for="(data, index) in foto" :key="index">
      <p>Nombre: {{ foto[index].name }}</p>
      <p>Desc: {{ foto[index].desc }}</p>
      <p>fecha foto: {{ foto[index].date1 }}</p>
      <b-img :src="foto[index].photoURL"></b-img>
    </div>

    <div></div>
  </div>
</template>

<script>
import { db } from "../main";
import _ from "lodash";
//  let today = Date.now();
export default {
  name: "About",
  data() {
    return {
      historia: [],
      video: [],
      foto: [],
    };
  },
  computed: {
    listHistorias() {
      return _.orderBy(this.historia, "fechaHora", "desc");
    },
  },

  // beforeCreate: function () {
  //   db.collection("videos")
  //     .where("userID", "==", this.$store.state.userSession)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.empty) {
  //         console.log("No matching documents.");
  //         return;
  //       }
  //       snapshot.forEach((doc) => {
  //         this.video.push(doc.data());
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Error getting documents", err);
  //     });
  // },

  // mounted(){
  //     db.collection("fotos")
  //     .where("userID", "==", this.$store.state.userSession)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.empty) {
  //         console.log("No matching documents.");
  //         return;
  //       }
  //       snapshot.forEach((doc) => {
  //         this.foto.push(doc.data());
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Error getting documents", err);
  //     });
  // },
  mounted() {
    setTimeout(() => {
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
    }, 2000);
  },
};
</script>
