import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

/* 针对3.1.2 promise 的处理 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/problem',
    name: 'Problem',
    component: () => import(/* webpackChunkName: "problem" */ '../views/Problem.vue')
  },
  {
    path: '/problembody/:problemID',
    name: 'problembody',
    component: () => import(/* webpackChunkName: "problembody" */ '../components/problem/problemBody.vue')
  },
  {
    path: '/contest',
    name: 'Contest',
    component: () => import(/* webpackChunkName: "contest" */ '../views/Contest.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import(/* webpackChunkName: "status" */ '../views/Status.vue')
  },
  {
    path: '/rating',
    name: 'Rating',
    component: () => import(/* webpackChunkName: "rating" */ '../views/Rating.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
