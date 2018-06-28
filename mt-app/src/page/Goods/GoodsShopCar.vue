<template>
  <div class="goodsshopcar">
    <div class="shop-wrapper">
      <!--购物车左侧-->
      <div class="shop-left">
        <div class="logo-wrapper" :class="{hightLigh: totalCount > 0}" @click="showList">
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
      <div class="car-list" :class="{listBlock: listShow}" v-show="listShow">
        <div class="list-top" v-if="specialData.discounts2">{{specialData.discounts2[0].info}}</div>
        <div class="list-header">
          <h3 class="header-left">1号口袋</h3>
          <div class="header-right" @click="clearAll">
            <img src="../../assets/img/ash_bin.png" alt="">
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="content" v-for="(select, index) in selectFoods" :key="index">
              <div class="con-left">
                <div class="des-left">
                  <p class="name">{{select.name}}</p>
                  <p class="unit" v-show="!select.description">{{select.unit}}</p>
                  <p class="description" v-show="!select.unit">{{select.description}}</p>
                </div>
                <div class="des-right">
                  ￥{{select.min_price}}
                </div>
              </div>
              <div class="con-right">
                <CarControl :food="select"></CarControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--背景遮罩-->
    <div class="cover" v-show="listShow" @click="hideCover"></div>
  </div>
</template>

<script>
import CarControl from '../../components/CarControl'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      show: false
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
  components: {
    CarControl
  },
  computed: {
    // 商品总数
    totalCount () {
      let num = 0
      this.selectFoods.forEach((food) => {
        num += food.count
      })
      return num
    },
    // 商品总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.min_price * food.count
      })
      return total
    },
    // 是否选有商品的不同显示值
    payStr () {
      if (this.totalCount > 0) {
        return '去结算'
      } else {
        return this.specialData.min_price_tip
      }
    },
    // 商品列表显示状态
    listShow () {
      // 如果没有选择商品，则不会显示
      if (!this.totalCount) {
        return false
      }
      // 根据当前状态设置列表滚动
      if (this.show) {
        this.$nextTick(() => {
          if (!this.listScroll) {
            this.listScroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.listScroll.refresh()
          }
        })
      }
      // 如果有选择商品，则根据是否点击了购物车的状态来判断是否显示列表
      return this.show
    }
  },
  methods: {
    // 展示购物车列表
    showList () {
      // 判断购物车个数是否为空
      if (!this.totalCount) {
        return
      }
      this.show = !this.show
    },
    // 隐藏遮罩
    hideCover () {
      this.show = false
    },
    // 清空购物车
    clearAll () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    }
  },
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
      z-index: -1;
      .list-top{
        height: 30px;
        text-align: center;
        font-size: 11px;
        background: #f3e6c6;
        line-height: 30px;
        color: #646158;
      }
      .list-header{
        height: 30px;
        width: 100%;
        background: #F4F4F4;
        .header-left{
          float: left;
          line-height: 30px;
          font-size: 12px;
          border-left: 4px solid #53c123;
          padding-left: 6px;
        }
        .header-right{
          float: right;
          line-height: 30px;
          margin-right: 10px;
          font-size: 0;
          img{
            height: 14px;
            margin-right: 9px;
            vertical-align: middle;
          }
          span{
            font-size: 12px;
            vertical-align: middle;
          }
        }
      }
      .list-content{
        max-height: 360px;
        overflow: hidden;
        background: #fff;
        .content{
          overflow: hidden;
          height: 38px;
          padding: 12px 12px 11px 12px;
          border-bottom: 1px solid #F4F4F4;
          .con-left{
            overflow: hidden;
            float: left;
            width: 240px;
            .des-left{
              float: left;
              width: 170px;
              .name{
                font-size: 16px;
                margin-bottom: 8px;
                /* 超出部分隐藏*/
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 16px;
              }
              .unit,.description{
                font-size: 12px;
                color: #B4B4B4;
              }
            }
            .des-right{
              float: right;
            }
          }
          .con-right{
            float: right;
            margin-top: 6px;
          }
        }
      }
    }
    .listBlock{
      transform: translateY(-100%);
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
