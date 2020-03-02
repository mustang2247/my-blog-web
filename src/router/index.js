import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Article from '@/page/Article'
import About from '@/page/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/Article',
      name: 'Article',
      component: Article
    },{
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
