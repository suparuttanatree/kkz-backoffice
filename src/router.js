import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        // {
        //   name: 'Dashboard',
        //   path: '',
        //   component: () => import('./pages/Dashboard.vue'),
        // },
        // Pages
        {
          name: 'Admin',
          path: '',
          component: () => import('./pages/Admin.vue'),
        },
        {
          name: 'Users',
          path: '/users',
          component: () => import('./pages/Users.vue'),
        },
        {
          name: 'Animals',
          path: '/animals',
          component: () => import('./pages/Animal.vue'),
        },
        {
          name: 'Highlight',
          path: '/highlight',
          component: () => import('./pages/Highlight.vue'),
        },
        {
          name: 'Rooms',
          path: '/rooms',
          component: () => import('./pages/Rooms.vue'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
      ],
    },
    {
      path : '/signin',
      component: () => import('./pages/Signin.vue'),
    }
  ],
})
