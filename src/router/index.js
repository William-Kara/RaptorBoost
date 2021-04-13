import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home')
  },
  {
    path: '/add-match',
    name: 'add',
    component: () => import('../components/AddMatches')
  },
  {
    path: '/view-matches',
    name: 'view',
    component: () => import('../components/ListMatches')
  },
  {
    path: '/matches',
    name: 'Matches',
    component: () => import('../components/Matches')
  },
  {
    path: '/list',
    name: 'Row',
    component: () => import('../components/MatchRow')
  },
  {
    path: '/framedata',
    name: 'framedata',
    component: () => import('../components/FrameData')
  },
  {
    path: '/tierlist',
    name: 'tierlist',
    component: () => import('../pages/TierList')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router