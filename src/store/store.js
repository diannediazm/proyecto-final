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
               console.log('entrando en la mutacion'); 
               state.userSession = usuario;
               console.log(state.userSession);
          },
          updateUserNameMut(state, data){
               console.log('entrando en la mutacion'); 
               console.log(data);
               state.nombreUser = data.primerNombre;
               state.fotoPerfil = data.photoPerfil;
               console.log(state.userSession);
               console.log(state.fotoPerfil);
          }
     },
     actions: {

          updateUserSessionAct(context, data){
               console.log('entrando a la accion')
               context.commit('updateUserSessionMut', data)
          },
          
          updateUserNameAct(context, data){
               console.log('entrando a la accion')
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
