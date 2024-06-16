import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import NotFound from '@/views/error-page/not-found.vue'
import AUTH_ENUM from '@/permission/permission'

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
        path: '/user/center/:userId',
        name: 'Center',
        component: () => import('@/views/user/center/index.vue'),
        props: true,
        meta: {
          auth: AUTH_ENUM.LOGIN,
          isMenu: false
        }
      },
      {
        path: '/app/detail/:appId',
        name: 'AppDetail',
        component: () => import('@/views/app-detail/index.vue'),
        meta: {
          isMenu: false
        },
        props: true
      },
      {
        path: '/add/app',
        name: 'AddApp',
        component: () => import('@/views/add/add-app/index.vue'),
        meta: {
          isMenu: true,
          title: '创建应用'
        }
      },
      {
        path: '/add/app/:appId',
        name: 'EditApp',
        component: () => import('@/views/add/add-app/index.vue'),
        props: true
      },
      {
        path: '/add/question/:appId',
        name: 'AddQuestion',
        component: () => import('@/views/add/add-question/index.vue'),
        props: true,
        meta: {
          isMenu: false
        }
      },
      {
        path: '/add/scoring-result/:appId',
        name: 'AddScoringResult',
        component: () => import('@/views/add/add-scoring-result/index.vue'),
        props: true,
        meta: {
          isMenu: false
        }
      },
      {
        path: '/answer/doAnswer/:appId',
        name: 'DoAnswer',
        component: () => import('@/views/answer/do-answer.vue'),
        props: true,
        meta: {
          isMenu: false,
          auth: AUTH_ENUM.USER
        }
      },
      {
        path: '/answer/answerResult/:id',
        name: 'AnswerResult',
        component: () => import('@/views/answer/answer-result.vue'),
        props: true,
        meta: {
          isMenu: false,
          auth: AUTH_ENUM.USER
        }
      },
      {
        path: '/answer/myAnswer',
        name: 'MyAnswer',
        component: () => import('@/views/answer/my-answer.vue'),
        meta: {
          isMenu: true,
          title: '我的答题',
          auth: AUTH_ENUM.USER
        }
      },
      {
        path: '/admin/user',
        component: () => import('@/views/admin/user/index.vue'),
        name: 'AdminUser',
        meta: {
          title: '用户管理',
          isMenu: true,
          auth: AUTH_ENUM.ADMIN
        }
      },
      {
        path: '/admin/app',
        component: () => import('@/views/admin/app/index.vue'),
        name: 'AdminApp',
        meta: {
          title: '应用管理',
          isMenu: true,
          auth: AUTH_ENUM.ADMIN
        }
      },
      {
        path: '/admin/question',
        component: () => import('@/views/admin/question/index.vue'),
        name: 'AdminQuestion',
        meta: {
          title: '题目管理',
          isMenu: true,
          auth: AUTH_ENUM.ADMIN
        }
      },
      {
        path: '/admin/scoringResult',
        component: () => import('@/views/admin/scoring-result/index.vue'),
        name: 'AdminScoringResult',
        meta: {
          title: '评分结果管理',
          isMenu: true,
          auth: AUTH_ENUM.ADMIN
        }
      },
      {
        path: '/admin/userAnswer',
        component: () => import('@/views/admin/user-answer/index.vue'),
        name: 'AdminUserAnswer',
        meta: {
          title: '回答管理',
          isMenu: true,
          auth: AUTH_ENUM.ADMIN
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
