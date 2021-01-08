<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand class="font-weight-bold" :to="{ name: 'Home' }"
        >HOKU</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!uid" href="/#login">Iniciar Sesión</b-nav-item>
          <b-nav-item v-if="!uid" :to="{ name: 'Registro' }"
            >Crear Cuenta</b-nav-item
          >
          <b-nav-item class="my-auto" v-if="uid" :to="{ name: 'Usuario' }"
            ><b-icon icon="house-door"></b-icon> Inicio</b-nav-item
          >
          <b-nav-item class="my-auto" v-if="uid" :to="{ name: 'Fotos' }"
            ><b-icon icon="plus-circle"></b-icon> Fotos</b-nav-item
          >
          <b-nav-item class="my-auto" v-if="uid" :to="{ name: 'Videos' }"
            ><b-icon icon="plus-circle"></b-icon> Videos</b-nav-item
          >
          <b-nav-item class="my-auto" v-if="uid" :to="{ name: 'Historias' }"
            ><b-icon icon="plus-circle"></b-icon> Historias</b-nav-item
          >
          <!-- <b-nav-item v-if="uid" :to="{name: 'About'}">About</b-nav-item> -->
          <b-nav-item-dropdown v-if="uid" class="my-auto" right>
            <template #button-content>
              <span class="my-auto" v-if="usuario[0]">
                Hola {{ $store.state.nombreUser }}
              </span>
              <b-img
                v-bind="mainProps"
                v-if="usuario[0]"
                :src="$store.state.fotoPerfil"
                rounded="circle"
                alt="Circle image"
              ></b-img>
            </template>
            <b-dropdown-item :to="{ name: 'EditRegistro' }"
              ><b-icon icon="pencil-square"></b-icon> Editar
              Perfil</b-dropdown-item
            >
            <b-dropdown-item href="#" @click="salir"
              ><b-icon icon="x-circle"></b-icon> Cerrar Sesión</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "./main";

export default {
  name: "App",
  data() {
    return {
      uid: "",
      usuario: [],
      mainProps: {
        // blank: true,
        // blankColor: "#777",
        width: 40,
        height: 40,
      },
    };
  },
  methods: {
    salir() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.usuario = "";
          this.$router.replace("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },

    consultaAutenticacion() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //console.log(user.displayName);
          this.uid = user.uid;
          this.$store.dispatch("updateUserSessionAct", user.uid);
          setTimeout(() => {
            let variable = db
              .collection("usuarios")
              .where("userID", "==", user.uid)
              .get();
            variable
              .then((snapshot) => {
                if (snapshot.empty) {
                  console.log("No matching documents.");
                  return;
                }
                snapshot.forEach((doc) => {
                  this.usuario.push(doc.data());
                });
                this.$store.dispatch("updateUserNameAct", this.usuario[0]);
              })
              .catch((err) => {
                console.log("Error getting documents", err);
              });
          }, 5000);
          // console.log("Si hay usuario con sesión activa");
        } else {
          //  console.log("No hay usuario con sesión activa...");
          this.uid = "";
          let sesionUsuario = null;
          this.$store.dispatch("updateUserSessionAct", sesionUsuario);
        }
      });
    },
  },

  async created() {
    await this.consultaAutenticacion();
  },
};
</script>

<style lang="scss">
@import "./style/sass/main.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
