import Vue from "vue";
import Vuex from "vuex";
import { db } from "../main";
import firebase from "firebase";


Vue.use(Vuex);

const timeSave = firebase.firestore.FieldValue.serverTimestamp()

export default new Vuex.Store({
     state: {
          userSession: null,
          nombreUser: null,
          fotoPerfil: null,
     },
     getters: {
          mostrarData(state) {
               return state.userSession;
          }
     },
     mutations: {
          updateUserSessionMut(state, usuario){ 
               state.userSession = usuario;
          },
          updateUserNameMut(state, data){
               state.nombreUser = data.primerNombre;
               state.fotoPerfil = data.photoPerfil;
          }
     },
     actions: {

          updateUserSessionAct(context, data){
               context.commit('updateUserSessionMut', data)
          },
          
          updateUserNameAct(context, data){
               context.commit('updateUserNameMut', data)
          },

          creandoUsuarios(context, data) {
               db.collection("usuarios")
                    .doc(data.userID)
                    .set({
                         primerNombre: data.primerNombre,
                         segundoNombre: data.segundoNombre,
                         apellidoPaterno: data.apellidoPaterno,
                         apellidoMaterno: data.apellidoMaterno,
                         sexo: data.sexo,
                         fechaNacimiento: data.fechaNacimiento,
                         email: data.email,
                         userID: data.userID,
                         photoPerfil: data.photoPerfil,
                    });

                    this.userSession = data.userID;
          },

          editandoUsuario(context, data) {
               db.collection("usuarios")
                    .doc(data.userID)
                    .set({
                         primerNombre: data.primerNombre,
                         segundoNombre: data.segundoNombre,
                         apellidoPaterno: data.apellidoPaterno,
                         apellidoMaterno: data.apellidoMaterno,
                         sexo: data.sexo,
                         fechaNacimiento: data.fechaNacimiento,
                         photoPerfil: data.photoPerfil,
                         userID: data.userID,
                         email: data.email,
                    });
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
                    pais: data.pais,
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
                    videoURL: data.videoURL,
                    userID: data.userID,
                    pais: data.pais,
                    fechaHora: timeSave,
               });
          },
     },
     modules: {},
});
