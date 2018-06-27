<template>
  <div class="goodsshopcar">
    <div class="shop-wrapper">
      <!--购物车左侧-->
      <div class="shop-left">
        <div class="logo-wrapper" :class="{hightLigh: totalCount > 0}">
          <span class="icon-shopping_cart shop-logo" :class="{hightLigh: totalCount > 0}"></span>
          <i class="shop-num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="shop-des">
          <div class="total-price" v-show="totalPrice"> ￥{{totalPrice}}</div>
          <div class="tip" :class="{tiphightLigh: totalCount > 0}">另需{{specialData.shipping_fee_tip}}</div>
        </div>
      </div>
      <!--购物车右侧-->
      <div class="shop-right" :class="{hightLigh: totalCount > 0}">{{payStr}}</div>
      <!--购物车列表-->
      <div class="car-list">
        <div class="list-top">{{specialData.discounts2[0].info}}</div>
        <div class="list-header">
          <h3 class="header-left">1号口袋</h3>
          <div class="header-right">
            <img src="../../assets/img/ash_bin.png" alt="">
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <!--背景遮罩-->
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    specialData: {
      type: Object
    },
    selectFoods: {
      type: Array
    }
  },
  components: {},
  computed: {
    totalCount () {
      let num = 0
      this.selectFoods.forEach((food) => {
        num += food.count
      })
      return num
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.min_price * food.count
      })
      return total
    },
    payStr () {
      if (this.totalCount > 0) {
        return '去结算'
      } else {
        return this.specialData.min_price_tip
      }
    }
  },
  methods: {},
  created () {},
  mounted () {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import url(../../assets/css/icon.css);
  .shop-wrapper{
    z-index: 99;
    width: 100%;
    height: 51px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #514f4f;
    display: flex;
    .shop-left{
      flex: 1;
      .logo-wrapper{
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #666;
        position: relative;
        left: 10px;
        top: -14px;
        text-align: center;
        .shop-logo{
          font-size: 28px;
          color: #c4c4c4;
          line-height: 50px;
        }
        .hightLigh{
          color: #2D2B2A;
        }
        .shop-num{
          display: block;
          position: absolute;
          right: 0;
          top: 0;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: red;
          font-size: 9px;
          line-height: 15px;
          color: #fff;
        }
      }
      .hightLigh{
        background: #ffd161;
      }
      .shop-des{
        float: left;
        margin-left: 13px;
        .total-price{
          font-size: 18px;
          line-height: 33px;
          color: white;
        }
        .tip{
          font-size: 12px;
          color: #bab9b9;
          line-height: 51px;
        }
        .tiphightLigh{
          line-height: 12px;
        }
      }
    }
    .shop-right{
      flex: 0 0 110px;
      font-size: 15px;
      color: #BAB9B9;
      line-height: 51px;
      text-align: center;
      font-weight: bold;
    }
    .hightLigh{
      background: #ffd161;
      color: #2D2B2A;
    }
    .car-list{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      .list-top{
        height: 30px;
        text-align: center;
        font-size: 11px;
        background: #f3e6c6;
        line-height: 30px;
        color: #646158;
      }
      .list-header{}
      .list-content{}
    }
  }
  .cover{
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background: rgba(7,17,27,0.6);
  }
</style>
