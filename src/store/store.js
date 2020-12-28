import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";

Vue.use(Vuex);


export let userid ="no user";
console.log(userid);
export default new Vuex.Store({
     state: {},
     mutations: {},
     actions: {
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

                    userid = data.userID;

                    console.log(userid);
          },
     },
     modules: {},
});
