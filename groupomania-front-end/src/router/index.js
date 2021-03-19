import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/auth.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/board.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
