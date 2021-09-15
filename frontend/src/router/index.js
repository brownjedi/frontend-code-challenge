import Vue from 'vue'
import VueRouter from 'vue-router'
import Details from '../views/Details.vue'
import Pokedex from '../views/Pokedex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pokédex',
    component: Pokedex,
  },
  {
    path: '/:id',
    name: 'Pokémon Details',
    component: Details,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
