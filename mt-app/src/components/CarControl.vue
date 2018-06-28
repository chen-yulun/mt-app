<template>
  <div class="carcontrol">
    <transition name="move">
      <div class="car-decrease icon-remove_circle_outline"
           v-show="food.count"
           @click.stop.prevent="decreaseCar">
      </div>
    </transition>
    <div class="car-count" v-show="food.count">{{food.count}}</div>
    <div class="car-add icon-add_circle" @click.stop.prevent="increaseCar">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {},
  computed: {},
  methods: {
    decreaseCar () {
      this.food.count--
    },
    increaseCar () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
@import url(../assets/css/icon.css);
  .carcontrol{
    font-size: 0;
    .car-decrease{
      display: inline-block;
      width: 26px;
      height: 26px;
      font-size: 26px;
      color: #b4b4b4;
    }
    .car-count{
      display: inline-block;
      width: 25px;
      text-align: center;
      font-size: 12px;
      line-height: 26px;
      vertical-align: top;
    }
    .car-add{
      display: inline-block;
      width: 26px;
      height: 26px;
      font-size: 26px;
      color: #ffd161;
      position: relative;
      .bg{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: black;
        position: absolute;
        left: 3px;
        top: 3px;
        z-index: -1;
      }
    }
    .move-enter-active,.move-leave-active{
      transition: all 0.5s linear;
    }
    .move-enter,.move-leave-to{
      transform: translateX(20px) rotate(180deg);
    }
  }
</style>
