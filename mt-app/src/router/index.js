import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/page/Goods/Goods'
import Ratings from '@/page/Ratings/Ratings'
import Seller from '@/page/Seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: Goods
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
