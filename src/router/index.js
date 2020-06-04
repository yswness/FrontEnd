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
    component: () => import(/* webpackChunkName: "problem" */ '../components/problem/problemdetail.vue'),
    children: [
      {
        path: '',
        name: 'problembody',
        component: () => import(/* webpackChunkName: "problem" */ '../components/problem/problemBody.vue')
      },
      {
        path: 'my',
        name: 'problemmysubmission',
        component: () => import(/* webpackChunkName: "problem" */ '../components/problem/problemmysubmission.vue')
      },
      {
        path: 'statistics',
        name: 'problemstatistics',
        component: () => import(/* webpackChunkName: "problem" */ '../components/problem/problemstatistics.vue')
      }
    ]
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
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import(/* webpackChunkName: "contest" */ '../components/contest/contestcomment.vue')
      }
    ]
  },
  {
    path: '/submission',
    name: 'Status',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Status.vue')
  },
  {
    path: '/submission/:submissionID',
    name: 'globlesubmission',
    component: () => import(/* webpackChunkName: "mainPage" */ '../components/status/submission.vue')
  },
  {
    path: '/rating',
    name: 'Rating',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Rating.vue')
  },
  {
    path: '/profile/:userID',
    name: 'User',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Userprofile.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "mainPage" */ '../views/Usersetting.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '../components/Admin/adminpage.vue'),
    children: [
      {
        path: '',
        name: 'adminaddproblem',
        component: () => import(/* webpackChunkName: "admin" */ '../components/Admin/adminaddproblem.vue')
      },
      {
        path: 'addcontest',
        name: 'adminaddcontest',
        component: () => import(/* webpackChunkName: "mainPage" */ '../components/Admin/adminaddcontest.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(from, to);
  if (  to.name !== 'Home' &&
        to.name !== 'Register' &&
        to.name !== 'Login' &&
        to.name !== 'Problem' &&
        to.name !== 'Rating' &&
        (!window.sessionStorage.getItem('userName')) &&
        (window.sessionStorage.getItem('userName') !== '') ) next({ name: 'Login' });
  else if ( to.name === 'contestproblem' &&
            from.name !== 'contestsubpage' ) next({ name: 'Contest' }); //必须从比赛界面跳转
  else {
    next();
  }
})

export default router
