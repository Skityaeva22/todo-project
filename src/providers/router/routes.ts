import type { RouteRecordRaw } from 'vue-router'
import { ROUTER_NAMES } from '@/shared/router/routes'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTER_NAMES.MAIN,
    redirect: '/to-do',
    component: () => import('@/pages/Main'),
    children: [
      {
        path: '/to-do',
        name: ROUTER_NAMES.TODO,
        component: () => import('@/pages/ToDo'),
        meta: {
          title: 'ToDo',
        },
      },
      {
        path: '/profiles',
        name: ROUTER_NAMES.PROFILES,
        component: () => import('@/pages/Profiles'),
        meta: {
          title: 'Profiles',
        },
      },
    ],
  },
]

export default routes
