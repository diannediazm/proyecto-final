import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";


Vue.use(Vuex);

export default new Vuex.Store({
     state: {
          userSession: null
     },
     mutations: {
          updateUserSessionMut(state, usuario){
               console.log('entrando en la mutacion'); 
               state.userSession = usuario;
               console.log(state.userSession);
          }
     },
     actions: {

          updateUserSessionAct(context, data){
               console.log('entrando a la accion')
               context.commit('updateUserSessionMut', data)
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

                    this.userSession = data.userID;

                    console.log(this.userSession);
          },
     },
     modules: {},
});
