import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomepageView from '../views/home/home.view.vue'
import { authentificationGuard } from '@/guards/authentification.guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/connexion/connexion.view.vue'),
    meta: {
      hasMenu: false
    }
  },
  {
    path: '/',
    name: 'homepage',
    beforeEnter: authentificationGuard,
    component: HomepageView,
    meta: {
      hasMenu: true
    }
  },
  {
    path: '/my-articles',
    name: 'articles',
    beforeEnter: authentificationGuard,
    component: () => import('../views/articles/articles.view.vue'),
    meta: {
      hasMenu: true
    }
  },  
  {
    path: '/create-article',
    name: 'create-article',
    beforeEnter: authentificationGuard,
    component: () => import('../views/create-article/create-article.view.vue'),
    meta: {
      hasMenu: true
    }
  },
  {
    path: '/update-article/:id',
    name: 'update-article',
    beforeEnter: authentificationGuard,
    component: () => import('../views/update-article/update-article.view.vue'),
    meta: {
      hasMenu: true
    },
    props: true
  },
  {
    path: '/registration',
    name: 'registration',
        component: () => import('../views/registration/registration.view.vue'),
    meta: {
      hasMenu: false
    }
  },
  {
    path: '/change-password',
    name: 'changePassword',
        component: () => import('../views/change-password/change-password.view.vue'),
    meta: {
      hasMenu: false
    }
  },  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

