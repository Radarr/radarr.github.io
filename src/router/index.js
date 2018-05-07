import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('./Home')
    },
    {
      path: '/issue',
      component: () => import('./Issue'),
      props: (route) => (
        {
          query: route.query
        }
      ),
      children: [
        {
          path: '',
          component: () => import('./Issue/info.vue'),
          props: (route) => (
            {
              query: route.query
            }
          )
        },
        {
          name: 'Issues',
          path: 'related',
          component: () => import('./Issue/related.vue'),
          props: (route) => (
            {
              query: route.query
            }
          )
        },
        {
          path: 'common',
          component: () => import('./Issue/common.vue'),
          props: (route) => (
            {
              query: route.query
            }
          )
        },
        {
          path: 'submit',
          component: () => import('./Issue/submit.vue'),
          props: (route) => (
            {
              query: route.query
            }
          )
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (from.query.token && !to.query.token) {
    if (to.path === from.path) {
      // console.log('Identical routes detected')
      return // This is a no-no via the documentation, but a bug in routing to identical routes strips query params, and this prevents that
    }
    next({path: to.path, query: {token: from.query.token}})
  }

  next()
})

export default router
