<template>
  <div class="star">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>

// 星星长度
const LENGTH = 5

// 星星状态
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  data () {
    return {
    }
  },
  props: {
    score: {
      type: Number
    }
  },
  components: {},
  computed: {
    itemClasses () {
      let result = []

      // 4.7 如果小数大于或等于0.5则变为0.5，否则为0
      let score = Math.floor(this.score * 2) / 2

      // 全星
      let integer = Math.floor(score)

      // 半星
      let hasHalf = score % 1 !== 0

      // 遍历全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }

      // 处理半星
      if (hasHalf) {
        result.push(CLS_HALF)
      }

      // 补齐，如果星数小于5，则一直循环判断填入数据，直到满足条件
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  methods: {},
  created () {
  },
  mounted () {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-repeat: no-repeat;
      background-size: 10px 10px;
      &:last-child{
        margin-right: 0;
      }
    }
    /* 三种图片类型*/
    .on{
      background-image: url(../assets/img/star24_on@2x.png);
    }
    .half{
      background-image: url(../assets/img/star24_half@2x.png);
    }
    .off{
      background-image: url(../assets/img/star24_off@2x.png);
    }
  }
</style>
