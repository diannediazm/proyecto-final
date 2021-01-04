<template>
  <div class="about">
    <h1>historias</h1>
    <div v-for="(data, index) in historia" :key="index">
      <p>Titulo: {{ historia[index].title }}</p>
      <p>Text: {{ historia[index].text }}</p>
      <p>fecha: {{ historia[index].fechaHora }}</p>
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
        :src= video[index].videoURL 
        allowfullscreen
      ></b-embed>
    </div>

    <h1>fotos</h1>
    <div v-for="(data, index) in foto" :key="index">
      <p>Nombre: {{ foto[index].name }}</p>
      <p>Desc: {{ foto[index].desc }}</p>
      <p>fecha foto: {{ foto[index].date1 }}</p>
      <b-img :src= foto[index].photoURL></b-img>
    </div>

  </div>
</template>

<script>
import { db } from "../main";
//  let today = Date.now();
export default {
  name: "About",
  data() {
    return {
      historia: [],
      video: [],
      foto:[],
    };
  },

  beforeCreate: function () {
    db.collection("videos")
      .where("userID", "==", this.$store.state.userSession)
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

  mounted(){
      db.collection("fotos")
      .where("userID", "==", this.$store.state.userSession)
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
  created() {
    db.collection("historias")
      .where("idUser", "==", this.$store.state.userSession)
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
};
</script>
