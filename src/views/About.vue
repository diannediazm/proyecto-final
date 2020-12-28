<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { userSession } from '../store/store'
export default {
  name: 'About',


 beforeCreate: function(){
    console.log("about:" + userSession)
    if(!userSession){
               this.$router.push('/');
          }
    }
 
}
</script>
