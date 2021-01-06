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
    path: '/add',
    name: 'add',
    component: () => import('../components/UserCreate')
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
    component: () => import('../components/TierList')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router