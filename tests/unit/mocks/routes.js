import Home from '@/views/Home.vue'
import Usuario from '@/views/Usuario.vue'

export default {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: Usuario
    }
  ]
}