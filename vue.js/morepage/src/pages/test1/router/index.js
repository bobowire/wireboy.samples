import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test1.html',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
