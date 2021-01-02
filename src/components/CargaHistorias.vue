<template>
    <div class="background-historias">
        <div class="text-videos text-center text-white">
            <h1>Cuántas historias que contar</h1>
            <p>Con el tiempo vamos olvidando los detalles de nuestros momentos memorables, ¡Escríbelos ahora!</p>
        </div>
        <b-container>
            <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Título">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <b-form-textarea
            id="textarea"
            v-model="form.text"
            placeholder="Empieza a escribir..."
            rows="3"
            max-rows="6"
            ></b-form-textarea>
            <el-form-item class="my-5 text-center">
                <el-button type="light" @click.prevent="cargarHistoria">Guardar</el-button>
                <el-button>Cancelar</el-button>
            </el-form-item>
            </el-form>
        </b-container>
    </div>
</template>

<script>
//import firebase from 'firebase';

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

let fecha = `${day}-${month}-${year} ${hora}`
//let timestamp = firebase.firestore.FieldValue.serverTimestamp()



export default {
    name: 'CargaHistorias',
    data() {
      return {
        form: {
          title: '',
          text: '',
          idUser: '',
          //fechaHora: timestamp,
        }
      }
    },
    methods: {
      cargarHistoria() {
        try {
          setTimeout(() => {
            this.form.idUser = this.$store.state.userSession;
            this.$store.dispatch("cargandoHistorias", this.form);
            alert("historia cargada")
          }, 2500)
        } catch (error) {
          alert("Error", error)
        }

        console.log('submit!');
      }
    },
    
    created() {
      console.log("historias: " + fecha );
      setTimeout(() => {
        console.log("historias: " + this.$store.state.userSession);
      },1000)
      
    }
}
</script>

<style lang="scss">
.background-historias {
    padding-bottom: 300px;
    background-image: url('../assets/img/abuelos.jpg');
    background-size: cover;
    height: 800px;
    width: 100%;
    background-repeat: no-repeat;
}

    
</style>