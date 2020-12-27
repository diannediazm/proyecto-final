<template>
    <div class="background-videos text-white">
        <div class="text-videos text-center">
            <h1>¿Cuáles son los videos que miras una y otra vez?</h1>
            <p>Estamos subiendo videos a redes sociales, recibiendo desde chats familiares, pero ¿tienes a mano los realmente importantes?</p>
        </div>
        <b-container>
            <b-row>
                <b-col>
                    <el-upload
                    class="upload-demo my-5"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Suelta tu archivo aquí o <em>haz clic para cargar</em></div>
                    <div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div>
                    </el-upload>
                    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
                </b-col>
                <b-col class="my-4">
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
                        <el-button type="primary" @click="onSubmit">Subir</el-button>
                        <el-button>Cancelar</el-button>
                    </el-form-item>
                    </el-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'CargaVideos',
    data() {
      return {
        form: {
          name: '',
          date1: '',
          date2: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style lang="scss">
.background-videos {
    background-color: #16a596;
    padding-bottom: 50px;
}
.text-videos {
    padding-top: 50px;
}
    
</style>