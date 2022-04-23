import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('../views/Login.vue') },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/webroom',
    name: 'webroom',
    component: () => import('../views/WebRoom.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        if (document.querySelector(to.hash)) {
          return {
            el: to.hash,
            behavior: "smooth",
          };
        }
        return false;
      } else {
        return {
          // 滚动到顶部
          top: 0,
          behavior: "smooth",
        };
      }
    }
  },
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
