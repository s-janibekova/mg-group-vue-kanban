import Vue from 'vue'
import Router from 'vue-router'
import Board from './views/Board.vue'
import Task from './views/Task.vue'
import RegisterUser from './views/RegisterUser.vue'
import LoginUser from './views/LoginUser.vue'
// import Create from './views/Customer/Create.vue'
import Show from './views/Customer/Show.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/board',
      name: 'board',
      component: Board,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/task/:id',
          name: 'task',
          component: Task
        }]
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    },
    // {
    //   path: '/create',
    //   name: 'create',
    //   component: Create
    // },

    {
      path: '/customer/:id',
      name: 'customer-show',
      component: Show,
      props: true,
      beforeEnter (routeTo, routeFrom, next) {
        store
          .dispatch('fetchCustomer', routeTo.params.id)
          .then(task => {
            routeTo.params.task = task
            next()
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              next({ name: '404', params: { resource: 'task' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router
