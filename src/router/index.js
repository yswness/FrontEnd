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
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Register.vue')
  },
  {
    path: '/problem',
    name: 'Problem',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Problem.vue')
  },
  {
    path: '/problem/:problemID',
    name: 'problembody',
    component: () => import(/* webpackChunkName: "problem" */ '../components/problem/problemBody.vue')
  },
  {
    path: '/contest',
    name: 'Contest',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Contest.vue')
  },
  {
    path: '/contest/:contestID',
    component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestSubPage.vue'),
    children: [
      {
        path: '',
        name: 'contestsubpage',
        component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestproblemlist.vue')
      },
      {
        path: 'problem/:problemKey',
        name: 'contestproblem',
        component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestproblem.vue')
      },
      {
        path: 'my',
        name: 'mysubmission',
        component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestmysubmission.vue')
      },
      {
        path: 'submission',
        name: 'submission',
        component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestsubmission.vue')
      },
      {
        path: 'rank',
        name: 'rank',
        component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestrank.vue')
      }
    ]
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Status.vue')
  },
  {
    path: '/rating',
    name: 'Rating',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Rating.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
