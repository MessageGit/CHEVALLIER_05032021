import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/auth.vue'
import store from '../modules/store.json'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: { requiresAuth: false }
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/board.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('TokenJWT');
  if(userToken) { // User have token (Auth)
    fetch(store.host_api + '/auth/verify', {
      method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken }
    })
    .then(response => response.json())
    .then(data => { 
      if(data.success == 0) { localStorage.setItem('TokenJWT', '') }
      if(to.matched.some(record => record.meta.requiresAuth)) { // Auth required
        if(data.success == 0) { next({path: '/'}) }
      } else {
        if(data.success == 1 && to.path == '/') { next({path: '/board'}) }
      }
      next()
    })
    .catch((error) => { console.log(error) });
  } else { // User don't have token (Auth)
    if(to.matched.some(record => record.meta.requiresAuth)) {
      next({path: '/'})
    }
    next()
  }
})

export default router
