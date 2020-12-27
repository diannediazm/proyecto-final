<template>
    <div class="background-historias">
        <div class="text-videos text-center">
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
            v-model="text"
            placeholder="Empieza a escribir..."
            rows="3"
            max-rows="6"
            ></b-form-textarea>

            <pre class="mt-3 mb-0">{{ text }}</pre>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Guardar</el-button>
                <el-button>Cancelar</el-button>
            </el-form-item>
            </el-form>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'CargaHistorias',
    data() {
      return {
        form: {
          title: '',
          text: '',
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
.background-historias {
    background-color: #fae0df;
    padding-bottom: 300px;
}
    
</style>