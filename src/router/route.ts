import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

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
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于',
          isMenu: true
        }
      }
    ]
  }
]
