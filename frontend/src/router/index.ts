import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Pokemon from '../views/Pokemon.vue'
import Pokedex from '../views/Pokedex.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Pokédex',
    component: Pokedex,
  },
  {
    path: '/favorites',
    name: 'Favorite Pokémon',
    component: Pokedex,
    props: { showOnlyFavorites: true },
  },
  {
    path: '/:name',
    name: 'Pokémon Details',
    component: Pokemon,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
