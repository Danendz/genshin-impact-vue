import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
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
    component: () => import('../views/CharactersView.vue')
  },
  {
    path: '/characters/:name',
    name: 'CharacterPage',
    component: () => import('../views/CharactersView.vue')
  }, {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/components/UI/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
