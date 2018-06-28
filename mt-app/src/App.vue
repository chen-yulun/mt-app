<template>
  <div id="app">
    <app-header></app-header>
    <app-nav :commentNum="commentNum"></app-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
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
      commentNum: 0
    }
  },
  components: {
    'app-header': Header,
    'app-nav': Nav
  },
  created () {
    // 获取商品数据
    this.$axios.get('/api/ratings').then((res) => {
      this.commentNum = res.data.data.comment_num
    })
  }
}
</script>

<style>
#app {
}
</style>
