<template>
  <div id="app">
    <app-header></app-header>
    <app-nav></app-nav>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
import Nav from '@/components/Nav'
export default {
  name: 'App',
  data () {
    return {
      // 商品数据
      goodsData: {}
    }
  },
  components: {
    'app-header': Header,
    'app-nav': Nav
  },
  created () {
    // 获取商品数据
  }
}
</script>

<style>
#app {
}
</style>
