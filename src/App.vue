<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{name: 'Home'}">HUKO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!uid" href="/#login">Iniciar Sesión</b-nav-item>
          <b-nav-item v-if="!uid" :to="{ name: 'Registro' }">Crear Cuenta</b-nav-item>
          <b-nav-item v-if="uid" :to="{name: 'Fotos'}">Fotos</b-nav-item>
          <b-nav-item v-if="uid" :to="{name: 'Historias'}">Historias</b-nav-item>
          <b-nav-item v-if="uid" :to="{name: 'About'}">About</b-nav-item>
          <b-nav-item v-if="uid" href="#" @click="salir">Salir</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <b-navbar toggleable type="dark" variant="dark">
            <b-navbar-brand href="/">HUKO</b-navbar-brand>

            <b-navbar-toggle target="navbar-toggle-collapse">
            <template #default="{ expanded }">
                <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                <b-icon v-else icon="chevron-bar-down"></b-icon>
            </template>
            </b-navbar-toggle>

            <b-collapse id="navbar-toggle-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
                <b-nav-item href="#">Link 1</b-nav-item>
                <b-nav-item href="#">Link 2</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar> -->
     
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'App',
  data() {
    return {
      uid: "",
    };
  },
  methods: {
    salir(){
        firebase.auth().signOut().then(() => {
            this.$router.replace('/');
        }).catch((error) => {
            console.error(error);
        });
      }
  },

 mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.displayName);
        this.uid = user.uid;
        this.$store.dispatch("updateUserSessionAct", user.uid);
        // console.log("Si hay usuario con sesión activa");
      } else {
        //  console.log("No hay usuario con sesión activa...");
        this.uid = "";
        let sesionUsuario = null
        this.$store.dispatch("updateUserSessionAct", sesionUsuario);
      }
    });
  },
  
}
</script>

<style lang="scss">
@import "./style/sass/main.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
