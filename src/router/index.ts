import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('../views/EventView.vue')
  },
  {
    path: '/wish',
    name: 'wish',
    component: () => import('../views/WishView.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('../views/InventoryView.vue')
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('../views/Characters/CharactersView.vue')
  },
  {
    path: '/characters/:name',
    name: 'CharacterPage',
    component: () => import('../views/Characters/CharactersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
