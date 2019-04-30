import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/base/projectcategory.html',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
