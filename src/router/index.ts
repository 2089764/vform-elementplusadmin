import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
// import { getParentLayout } from './helper'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

/* Layout */
const Layout = () => import('@/layout/Layout.vue')

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path*',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  }
]

// export const asyncRouterMap: AppRouteRecordRaw[] = [
//   {
//     path: '/level',
//     component: Layout,
//     redirect: '/level/menu1/menu1-1/menu1-1-1',
//     name: 'Level',
//     meta: {
//       title: t('router.level')
//     },
//     children: [
//       {
//         path: 'menu1',
//         name: 'Menu1',
//         component: getParentLayout('Menu1'),
//         redirect: '/level/menu1/menu1-1/menu1-1-1',
//         meta: {
//           title: `${t('router.menu')}1`
//         },
//         children: [
//           {
//             path: 'menu1-1',
//             name: 'Menu11',
//             component: getParentLayout('Menu11Demo'),
//             redirect: '/level/menu1/menu1-1/menu1-1-1',
//             meta: {
//               title: `${t('router.menu')}1-1`,
//               alwaysShow: true
//             },
//             children: [
//               {
//                 path: 'menu1-1-1',
//                 name: 'Menu111',
//                 component: () => import('@/views/Level/Menu111.vue'),
//                 meta: {
//                   title: `${t('router.menu')}1-1-1`
//                 }
//               }
//             ]
//           },
//           {
//             path: 'menu1-2',
//             name: 'Menu12',
//             component: () => import('@/views/Level/Menu12.vue'),
//             meta: {
//               title: `${t('router.menu')}1-2`
//             }
//           }
//         ]
//       },
//       {
//         path: 'menu2',
//         name: 'Menu2Demo',
//         component: () => import('@/views/Level/Menu2.vue'),
//         meta: {
//           title: `${t('router.menu')}2`
//         }
//       }
//     ]
//   }
// ]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter(): void {
  const resetWhiteNameList = ['RedirectRoot', 'Redirect', 'Login', 'Root', 'Dashboard', 'Page404']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router