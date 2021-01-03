import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";
import firebase from "firebase";


Vue.use(Vuex);

const timeSave = firebase.firestore.FieldValue.serverTimestamp()

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
          },

          cargandoHistorias(context, data){
               db.collection("historias")
                    .doc()
                    .set({
                         title: data.title,
                         text: data.text,
                         idUser: data.idUser,
                         fechaHora: timeSave,
                    });
          },

          cargandoFotos(context, data){
               db.collection("fotos")
               .doc()
               .set({
                    name: data.name,
                    date1: data.date1,
                    desc: data.desc,
                    photoURL: data.photoURL,
                    userID: data.userID,
                    fechaHora: timeSave,
               });
          },
          cargandoVideos(context, data){
               db.collection("videos")
               .doc()
               .set({
                    name: data.name,
                    date1: data.date1,
                    desc: data.desc,
                    photoURL: data.photoURL,
                    userID: data.userID,
                    fechaHora: timeSave,
               });
          },
     },
     modules: {},
});
