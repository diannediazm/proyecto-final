<template>
    <div class="background-videos text-white">
        <div class="text-videos text-center">
            <h1>¿Cuáles son los videos que miras una y otra vez?</h1>
            <p>Estamos subiendo videos a redes sociales, recibiendo desde chats familiares, pero ¿tienes a mano los realmente importantes?</p>
        </div>
        <b-container>
            <b-row>
                <b-col class="text-center my-4">
                    <h3 text-left>¡Sube tus videos!</h3>
                    <p class="text-left">Elige un nombre para el video: un día o alguien especial</p>
                    <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="Nombre">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <p class="text-left">¿Recuerdas la fecha?</p>
                    <el-form-item label="Rango de fecha">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <p class="text-left">Escribe alguna anécdota, historia o incluso algún secreto relacionado.</p>
                    <el-form-item label="Activity form">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                        class="upload-demo"
                        drag
                        :http-request="upload"
                        action="cargaArchivo"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
                        <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="light" @click="onSubmit">Subir</el-button>
                        <el-button>Cancelar</el-button>
                    </el-form-item>
                    </el-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'CargaVideos',
    data() {
      return {
        form: {
          name: '',
          date1: '',
          date2: '',
          desc: ''
        },
        rules: [
            value => !value || value.size < 100000000 || 'El tamaño del video debe ser inferior a 1GB'
        ],
        fileList: [],
        archivo: {}
      }
    },
    methods: {
      handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`El límite es 3, haz seleccionado ${files.length} archivos esta vez, añade hasta ${files.length + fileList.length}`);
        },
        upload(file){
            console.log(file);
            this.archivo = file.file;
        },
        onSubmit(event) {
          console.log(event);
          console.log(this.archivo);
          if (this.archivo) {
              let storageRef = firebase.storage().ref('videos'+ this.archivo.name);
              storageRef.put(this.archivo).then((snapshot) => {
                  console.log('funciona');
                  console.warn(snapshot.bytesTransferred / snapshot.totalBytes);
              }).then (() => {
              this.$notify({
                title: '¡Subida exitosa!',
                message: 'Tu video se subió',
                type: 'success'
              });
            });
        }  
    }
    }
}
</script>

<style lang="scss">
.background-videos {
    padding-bottom: 50px;
    background-image: url('../assets/img/playa.jpg');
    background-size: cover;
    height: 1000px;
    width: 100%;
    background-repeat: no-repeat;
}
.text-videos {
    padding-top: 50px;
}
    
</style>