import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registro from "../views/Registro.vue";
import About from "../views/About.vue";
import Fotos from "../views/Fotos.vue";
import Videos from "../views/Videos.vue";
import Historias from "../views/Historias.vue";
import Usuario from "../views/Usuario.vue";
// import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
     {
          path: "/",
          name: "Home",
          component: Home,
     },
     {
          path: "/registro",
          name: "Registro",
          component: Registro,
     },
     {
          path: "/fotos",
          name: "Fotos",
          component: Fotos,
     },
     {
          path: "/videos",
          name: "Videos",
          component: Videos,
     },
     {
          path: "/historias",
          name: "Historias",
          component: Historias,
     },
     {
          path: "/usuario",
          name: "Usuario",
          component: Usuario,
     },
     {
          path: "/about",
          name: "About",
          component: About,
     },
];

const router = new VueRouter({
     mode: "history",
     base: process.env.BASE_URL,
     routes,
});

// router.beforeEach((to, from, next) => {
//      var usuario = firebase.auth().currentUser;

//      let registroRequerido = to.matched.some((ruta) => ruta.meta.login);
//      console.log(registroRequerido);

//      if (registroRequerido && !usuario) {
//           next("/login");
//      } else {
//           next();
//      }
// });

export default router;
