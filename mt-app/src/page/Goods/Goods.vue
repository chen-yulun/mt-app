<template>
  <div class="goods">
    <!--菜单栏-->
    <div class="menu">
    </div>
    <!--商品栏-->
    <div class="food"></div>
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
  .goods{
    display: flex;
    position: absolute;
    top: 190px;
    bottom: 51px;
    width: 100%;
    .menu{
      flex: 0 0 85px;
      background: blue;
    }
    .food{
      flex: 1;
      background: red;
    }
  }
</style>
