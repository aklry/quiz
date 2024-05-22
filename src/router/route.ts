import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import NotFound from '@/views/error-page/not-found.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页',
          isMenu: true
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/layout/UserLayout.vue'),
    children: [
      {
        path: '/user/login',
        name: 'Login',
        component: () => import('@/views/user/login/index.vue')
      },
      {
        path: '/user/register',
        name: 'Register',
        component: () => import('@/views/user/register/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/noAuth',
    name: 'NoAuth',
    component: () => import('@/views/error-page/no-auth.vue')
  }
]
