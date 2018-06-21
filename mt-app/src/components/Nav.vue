<template>
  <div class="nav">
    <router-link class="goods" to="/goods">
      点菜
      <i class="line"></i>
    </router-link>
    <router-link class="ratings" to="/ratings">
      评价
      <i class="line"></i>
    </router-link>
    <router-link class="seller" to="/seller">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
  .nav{
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid #e4e4e4;
    .goods,.ratings,.seller{
      width: 0;
      flex-grow: 1;
      text-align: center;
      text-decoration: none;
      color: #666;
      font-size: 16px;
      line-height: 40px;
    }
    .router-link-active{
      position: relative;
      color: #ffbb22;
      .line{
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -10px;
        width: 20px;
        height: 2px;
        background: #ffbb22;
      }
    }
  }
</style>
