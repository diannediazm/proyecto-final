<template>
    <div class="background-fotos">
        <b-container>
            <div class="title-fotos text-center mb-5 text-white">
                <h1>¡Sube tus fotografías!</h1>
                <p>No dejes que tus fotos más importantes se pierdan en dispositivos. Selecciónalas y guárdalas según fecha, significado o historia memorable.</p>
            </div>
            <b-row>
                <b-col class="text-center text-white">
                    <h3 text-left>¡Diseña tu galería!</h3>
                    <p class="text-left">Elige un nombre que identifique a las fotografías: un día especial, una persona o tu mascota.</p>
                    <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="Nombre">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <p class="text-left">¿Recuerdas la fecha de las fotografías?</p>
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
                        <el-button type="primary" @click="onSubmit">Crear</el-button>
                        <el-button>Cancelar</el-button>
                    </el-form-item>
                    </el-form>
                </b-col>
                <b-col class="text-center">
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
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'CargaFotos',
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
    .title-fotos {
        padding-top: 50px;
    }
    .background-fotos {
        background-image: url('../assets/img/cargafotos.jpg');
        background-size: cover;
        height: 800px;
        width: 100%;
        background-repeat: no-repeat;
    }
    .foto {
        width: 40%;
        border-radius: 50px;
    }
    .share {
        justify-content: center;
    }
</style>