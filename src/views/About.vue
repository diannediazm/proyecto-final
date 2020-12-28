<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { userid } from '../store/store'
export default {
  name: 'About',


 beforeCreate: function(){
    console.log("Hola:" + userid)
    }
 
}
</script>
