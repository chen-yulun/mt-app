<template>
  <div class="header" :style="header_background">
    <!--搜索栏-->
    <div class="search">
      <div class="search-left">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-box">
        <span class="search-box-icon"></span>
        <input class="search-box-bar" type="text" placeholder="搜索店内商品">
      </form>
      <div class="search-right">
        <a href="#" class="search-right-piece">拼单</a>
        <div class="search-right-more">
          <i class="search-right-more-point"></i>
          <i class="search-right-more-point"></i>
          <i class="search-right-more-point"></i>
        </div>
      </div>
    </div>
    <!--主题内容-->
    <div class="theme">
      <div class="theme-img" :style="theme_background"></div>
      <div class="theme-name">{{goodsData.name}}</div>
      <div class="theme-collect">
        <img class="theme-collect-img" src="../assets/img/star.png" alt="">
        <span class="theme-collect-name">收藏</span>
      </div>
    </div>
    <!--公告-->
    <div class="notice">
      <img class="notice-img" v-if="goodsData.discounts2" :src="goodsData.discounts2[0].icon_url" />
      <div class="notice-name" v-if="goodsData.discounts2">{{goodsData.discounts2[0].info}}</div>
      <div class="notice-activity-box">
        <a href="#"
           class="notice-activity"
           v-if="goodsData.discounts2"
           @click="toShow">
          {{goodsData.discounts2.length}}个活动</a>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!--公告详情-->
    <transition name="bulletin-detail">
      <div class="detail" v-show="isShow">
        <div class="detail-box">
          <div class="detail-content" :style="detail_background">
            <div class="detail-img" :style="theme_background"></div>
            <div class="detail-name">{{goodsData.name}}</div>
            <div class="detail-star">
              <app-star :score="goodsData.wm_poi_score"></app-star>
              <span>{{goodsData.wm_poi_score}}</span>
            </div>
            <div class="detail-tip">
              {{goodsData.min_price_tip}} <i>|</i> {{goodsData.shipping_fee_tip}} <i>|</i> {{goodsData.delivery_time_tip}}
            </div>
            <div class="detail-time">
              配送时间: {{goodsData.shipping_time}}
            </div>
            <div class="detail-discounts" v-if="goodsData.discounts2">
              <p>
                <img :src="goodsData.discounts2[0].icon_url" />
                <span>{{goodsData.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="detail-close" @click="toClose">
            <span class="icon-close"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from './Star'
export default {
  data () {
    return {
      // 商品数据
      goodsData: {},
      // 公告详情显示状态
      isShow: false
    }
  },
  props: {},
  components: {
    'app-star': Star
  },
  computed: {
    // 头部背景图
    header_background () {
      return `background-image: url('${this.goodsData.head_pic_url}');`
    },
    // 店面图标
    theme_background () {
      return `background-image: url('${this.goodsData.pic_url}');`
    },
    // 公告详情背景图
    detail_background () {
      return `background-image: url('${this.goodsData.poi_back_pic_url}');`
    }
  },
  methods: {
    // 公告详情显示
    toShow () {
      this.isShow = true
    },
    // 公告详情关闭
    toClose () {
      this.isShow = false
    }
  },
  created () {
    // 获取商品数据
    this.$axios.get('/api/goods').then((res) => {
      console.log(res.data.data.poi_info)
      this.goodsData = res.data.data.poi_info
    })
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
@import url(../assets/css/icon.css);
  .header{
    width: 100%;
    height: 150px;
    background-size: 100% 135%;
    background-position: center -12px;
    overflow: hidden;
    /*搜索栏*/
    .search{
      margin-top: 20px;
      position: relative;
      .search-left{
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        span{
          display: inline-block;
          color: #fff;
        }
      }
      .search-box{
        width: 100%;
        padding: 0 105px 0 50px;
        height: 30px;
        box-sizing: border-box;
        .search-box-icon{
          width: 28px;
          height: 30px;
          background: url(../assets/img/search.png) no-repeat 11px center;
          background-size: 13px 13px;
          position: absolute;
        }
        .search-box-bar{
          width: 100%;
          height: 30px;
          line-height: 30px;
          border-radius: 25px;
          background: #cdcdcc;
          border: 0;
          outline: none;
          padding-left: 28px;
          box-sizing: border-box;
        }
      }
      .search-right{
        position: absolute;
        right: 0;
        top: 0;
        width: 105px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .search-right-piece{
          display: block;
          text-decoration: none;
          font-size: 12px;
          color: #fff;
          border: 1px solid #fff;
          padding: 3px;
        }
        .search-right-more{
          margin-left: 10px;
          display: flex;
          justify-content: center;
          .search-right-more-point{
            margin-left: 1px;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            border: 1px solid #fff;
            display: block;
          }
        }
      }
    }
    /*主题内容*/
    .theme{
      margin-top: 18px;
      height: 50px;
      overflow: hidden;
      .theme-img{
        float: left;
        margin-left: 10px;
        width: 50px;
        height: 50px;
        background-size: 135% 100%;
        background-position: center;
        border-radius: 5px;
      }
      .theme-name{
        float: left;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        line-height: 50px;
        margin-left: 10px;
      }
      .theme-collect{
        float: right;
        width: 24px;
        height: 50px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        .theme-collect-img{
          width: 20px;
          height: 20px;
          margin-bottom: 3px;
        }
        .theme-collect-name{
          font-size: 12px;
          text-align: center;
        }
      }
    }
    /*公告*/
    .notice{
      overflow: hidden;
      height: 16px;
      margin-top: 10px;
      .notice-img{
        float: left;
        margin: 0 6px 0 10px;
        width: 16px;
        height: 16px;
      }
      .notice-name{
        float: left;
        font-size: 12px;
        line-height: 16px;
        color: #fff;
      }
      .notice-activity-box{
        float: right;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .notice-activity{
          text-decoration: none;
          font-size: 12px;
          color: #fff;
        }
        span{
          font-size: 16px;
          line-height: 16px;
          color: #fff;
        }
      }
    }
    /*公告详情*/
    .detail{
      width: 100%;
      height: 100%;
      z-index: 999;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      background: rgba(98, 98, 98, 0.8);
      .detail-box{
        width: 100%;
        height: 100%;
        padding: 45px 20px 130px;
        box-sizing: border-box;
        .detail-content{
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          border-radius: 10px;
          text-align: center;
          overflow: hidden;
          .detail-img{
            width: 60px;
            height: 60px;
            background-size: 135% 100%;
            background-position: center;
            margin: auto;
            margin-top: 40px;
            border-radius: 5px;
          }
          .detail-name{
            font-size: 15px;
            color: #fff;
            margin-top: 13px;
          }
          .detail-star{
            height: 10px;
            margin-top: 6px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            .star{
              display: block;
              margin-right: 7px;
            }
            span{
              font-size: 10px;
              color: #fff;
            }
          }
          .detail-tip{
            font-size: 11px;
            color: #bababc;
            margin-top: 8px;
            i{
              margin: 0 7px;
            }
          }
          .detail-time{
            font-size: 11px;
            color: #bababc;
            margin-top: 13px;
          }
          .detail-discounts{
            margin-top: 20px;
            padding: 0 20px;
            p{
              padding-top: 20px;
              border-top: 1px solid #BABABC;
              img{
                width: 16px;
                height: 16px;
                vertical-align: middle;
              }
              span{
                font-size: 11px;
                line-height: 16px;
                color: white;
              }
            }
          }
        }
        .detail-close{
          padding-top: 20px;
          height: 40px;
          text-align: center;
          span{
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            font-size: 14px;
            color: #fff;
            display: inline-block;
            background: rgba(118, 118, 118, 0.7);
            border: 1px solid rgba(140, 140, 140, 0.9);
          }
        }
      }
    }
    /* 动画效果 */
    .bulletin-detail-enter-active,
    .bulletin-detail-leave-active {
      transition: 2s all;
    }

    .bulletin-detail-enter,
    .bulletin-detail-leave-to {
      opacity: 0;
    }

    .bulletin-detail-enter-to,
    .bulletin-detail-leave {
      opacity: 1;
    }
  }
</style>
