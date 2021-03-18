import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/auth.vue'
import store from '../modules/store.json'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: { requireAuth: false }
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/board.vue'),
    meta: { 
      requireAuth: true,
      userData: ''
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('TokenJWT');
  if(userToken) { // User have token (Auth)
    fetch(store.host_api + '/auth/userdata', {
      method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken }
    })
    .then(response => response.json())
    .then(data => {
      if(!data.success) { // Authentication is invalid
        localStorage.removeItem('TokenJWT') 
      } else { // Authentication is valid
        to.meta.userData = data.data;
        if(to.path == '/') { next({path: '/board'}) }
      }
      if(to.matched.some(record => record.meta.requireAuth)) { // Auth required
        if(!data.success) { next({path: '/'}) }
      }
      next()
    })
    .catch(() => { 
      localStorage.removeItem('TokenJWT')
      window.location.reload()
    });
  } else { // User don't have token (Auth)
    if(to.matched.some(record => record.meta.requireAuth)) {
      next({path: '/'})
    }
    next()
  }
})

export default router
