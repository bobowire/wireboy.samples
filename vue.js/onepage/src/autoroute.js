import router from './router'
const _import = require('./router/import')// 获取组件的方法

router.beforeEach(async (to, from, next) => {
  // 默认的首页页面
  if (to.fullPath === '/') {
    next('/home/index')
  } else if (to.matched.length === 0) {
    // 获取组件路径
    let componentpath = to.fullPath.substring(1) + '/' + to.fullPath.substring(to.fullPath.lastIndexOf('/') + 1)
    // 添加路由
    router.addRoutes([{
      path: to.fullPath,
      name: to.fullPath.substring(to.fullPath.lastIndexOf('/') + 1),
      component: _import(componentpath)
    }])
    // 路由重匹配
    next({ ...to, replace: true })
  } else {
    next()
  }
})
