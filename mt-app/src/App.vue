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
  components: {
    'app-header': Header,
    'app-nav': Nav
  },
  data () {
    return {
    }
  },
  created () {
    this.$axios.get('/api/goods').then((res) => {
      console.log(res)
    })
  }
}
</script>

<style>
#app {
}
</style>
