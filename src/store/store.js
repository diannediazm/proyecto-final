import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";

Vue.use(Vuex);
export let userSession ="no user";

console.log(userSession);
export default new Vuex.Store({
     state: {},
     mutations: {},
     actions: {

          actualizarUserSession(context, data){
               userSession = data;
               console.log('actualizarUserSession: ' + userSession);
          },

          creandoUsuarios(context, data) {
               db.collection("usuarios")
                    .doc(data.userID)
                    .set({
                         rut: data.rut,
                         primerNombre: data.primerNombre,
                         segundoNombre: data.segundoNombre,
                         apellidoPaterno: data.apellidoPaterno,
                         apellidoMaterno: data.apellidoMaterno,
                         sexo: data.sexo,
                         fechaNacimiento: data.fechaNacimiento,
                         email: data.email,
                         userID: data.userID,
                    });

                    userSession = data.userID;

                    console.log(userSession);
          },
     },
     modules: {},
});
