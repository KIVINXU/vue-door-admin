import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
   { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  //{ path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/main',
    children: [{
      path: 'main',
      component: () => import('@/views/main/index'),
    }],
    hidden: true,
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/cabDevice',
    name: 'device',
    meta: { title: '设备管理'},
    children: [
      //{
      //  path: 'acsDevice',
      //  component: () => import('@/views/acs/01-acsDevice'),
      //  name: 'acsDevice',
      //  meta: { title: '门禁'}
      //},
      //{
      //  path: 'envDevice',
      //  component: () => import('@/views/env/03-envDevice'),
      //  name: 'envDevice',
      //  meta: { title: '环境' },
      //},
      {
        path: 'cabDevice',
        component: () => import('@/views/cab/cabChildren/index'),
        name: 'cabDevice',
        redirect: '/device/cabDevice/index',
        meta: { title: '云储柜' },
        children: [
          {
            path: 'index',
            component: () => import('@/views/cab/cabChildren/01-cabDevice'),
            name: 'index',
            meta: { title: '设备'}
          },
          {
            path: 'relays',
            component: () => import('@/views/cab/cabChildren/02-relays'),
            name: 'relays',
            meta: { title: '控制器' },
          },
          {
            path: 'cabinets',
            component: () => import('@/views/cab/cabChildren/03-cabinets'),
            name: 'cabinets',
            meta: { title: '储物柜' },
          },
          {
            path: 'boxes',
            component: () => import('@/views/cab/cabChildren/04-boxes'),
            name: 'boxes',
            meta: { title: '箱号分配' },
          },
        ]
      },
    ]
  },
  //{
  //  path: '/acs',
  //  component: Layout,
  //  redirect: '/acs/doorControl',
  //  name: 'acs',
  //  meta: { title: '门禁系统'},
  //  children: [
  //    {
  //      path: 'doorControl',
  //      component: () => import('@/views/acs/02-doorControl'),
  //      name: 'doorControl',
  //      meta: { title: '门禁用户'}
  //    },
  //    {
  //      path: 'permission',
  //      component: () => import('@/views/acs/03-permission'),
  //      name: 'permission',
  //      meta: { title: '权限设置'}
  //    },
  //    {
  //      path: 'database',
  //      component: () => import('@/views/acs/04-database'),
  //      name: 'database',
  //      meta: { title: '数据信息'}
  //    },
  //    {
  //      path: 'acsUser',
  //      component: () => import('@/views/acs/05-acsUser'),
  //      name: 'acsUser',
  //      meta: { title: '系统用户'}
  //    },
  //  ]
  //},
  //{
  //  path: '/env',
  //  component: Layout,
  //  redirect: '/env/index',
  //  name: 'env',
  //  meta: { title: '环境监测'},
  //  children: [
  //    {
  //      path: 'index',
  //      component: () => import('@/views/env/01-index'),
  //      name: 'index',
  //      meta: { title: '首页' },
  //      hidden: true
  //    },
  //    {
  //      path: 'machineRoom',
  //      component: () => import('@/views/env/02-machineRoom'),
  //      name: 'machineRoom',
  //      meta: { title: '机房检测' },
  //    },
  //    {
  //      path: 'channel',
  //      component: () => import('@/views/env/04-channel'),
  //      name: 'channel',
  //      meta: { title: '通道管理' },
  //    },
  //    {
  //      path: 'envSetting',
  //      component: () => import('@/views/env/06-envSetting'),
  //      name: 'envSetting',
  //      meta: { title: '个人管理' },
  //    },
  //  ]
  //},
  {
    path: '/cab',
    component: Layout,
    redirect: '/cab/uses',
    name: 'cab',
    meta: { title: '云储柜'},
    children: [
      {
        path: 'uses',
        component: () => import('@/views/cab/02-uses'),
        name: 'uses',
        meta: { title: '箱子使用' },
      },
      {
        path: 'records',
        component: () => import('@/views/cab/01-records'),
        name: 'records',
        meta: { title: '开箱记录' },
      },
     
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [{
      path: 'index',
      component: () => import('@/views/acs/05-acsUser'),
      meta: { title: '用户设置' }
    }]
  },

  //{ path: '*', redirect: '/404', hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [];
