<template>
  <transition name="food-detail">
    <div ref="foodView" class="goodsdetail" v-show="detailShow">
      <!--需要加上一层，否则无法滚动-->
      <div class="wrapper">
        <!--头部图片-->
        <div class="img-wrapper">
          <img class="food-img" :src="food.picture"/>
          <span class="close icon-close" @click="close"></span>
          <img class="jump" src="../../assets/img/share.png" alt="">
          <img class="more" src="../../assets/img/more.png" alt="">
        </div>
        <!--商品介绍-->
        <div class="content-wrapper">
          <h3 class="name">{{food.name}}</h3>
          <p class="saled">{{food.month_saled_content}}</p>
          <img class="product" v-show="food.product_label_picture" :src="food.product_label_picture"/>
          <p class="price">
            <span class="text">￥{{food.min_price}}</span>
            <span class="unit">/{{food.unit}}</span>
          </p>
          <div class="cartcontrol-wrapper">
            <CarControl :food="food"></CarControl>
          </div>
          <div class="buy" @click="addProduct" v-show="!food.count || food.count == 0">选规格</div>
        </div>
        <!--间隔线-->
        <Split></Split>
        <!--外卖评价-->
        <div class="rating-wrapper">
          <!--评价头部-->
          <div class="rating-title">
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{food.rating.title}}</span>
              <span class="retio">( {{food.rating.like_ratio_desc}} <i>{{food.rating.like_ratio}}</i> )</span>
            </div>
            <div class="snd-title" v-if="food.rating">
              <span class="text">{{food.rating.snd_title}}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <!--评价内容-->
          <ul class="rating-content" v-if="food.rating">
            <li v-for="(comment, index) in food.rating.comment_list" :key="index" class="comment-item">
              <div class="comment-header">
                <img :src="comment.user_icon" v-if="comment.user_icon" />
                <img src="../../assets/img/anonymity.png" v-if="!comment.user_icon"  />
              </div>
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="time">
                  {{comment.comment_time}}
                </div>
                <div class="content">
                  {{comment.comment_content}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CarControl from '../../components/CarControl'
import Split from '../../components/Split'
import Vue from 'vue'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    CarControl,
    Split
  },
  computed: {},
  methods: {
    show () {
      this.detailShow = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodView, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    addProduct () {
      Vue.set(this.food, 'count', 1)
    },
    close () {
      this.detailShow = false
    }
  },
  created () {},
  mounted () {},
  watch: {}
}
</script>

<style lang="scss" scoped>
@import url(../../assets/css/icon.css);
  .goodsdetail{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 51px;
    width: 100%;
    background: #fff;
    z-index: 90;
    .wrapper{
      .img-wrapper{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .food-img{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
        .close{
          position: absolute;
          left: 10px;
          top: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #7f7f7f;
          font-size: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        .jump{
          position: absolute;
          top: 10px;
          right: 50px;
          width: 30px;
          height: 30px;
        }
        .more{
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
        }
      }
      .content-wrapper{
        padding: 0 0 16px 16px;
        position: relative;
        .name{
          font-size: 15px;
          color: #333333;
          line-height: 30px;
          font-weight: bold;
        }
        .saled{
          font-size: 11px;
          color: #9d9d9d;
          margin-bottom: 6px;
        }
        .product{
          height: 15px;
          margin-bottom: 16px;
        }
        .price{
          font-size: 0;
          .text{
            font-size: 17px;
            color: #FB4E44;
          }
          .unit{
            font-size: 11px;
            color: #9D9D9D;
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 12px;
          bottom: 10px;
          padding: 2px;
        }
        .buy{
          width: 64px;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          background: #FFD161;
          border-radius: 30px;
          position: absolute;
          right: 12px;
          bottom: 10px;
        }
      }
      .rating-wrapper{
        padding-left: 16px;
        .rating-title{
          padding: 16px 16px 16px 0;
          .like-ratio{
            float: left;
            font-size: 0;
            .title{
              font-size: 13px;
            }
            .ratio{
              font-size: 11px;
              i{
                color: #FB4E44;
                font-size: 11px;
              }
            }
          }
          .snd-title{
            float: right;
            font-size: 0;
            .text,.icon{
              font-size: 13px;
              color: #9D9D9D;
              display: inline-block;
            }
            .icon{
              margin-left: 12px;
            }
          }
        }
        .rating-content{
          .comment-item{
            padding: 15px 14px 17px 0;
            border-bottom: 1px solid #F4F4F4;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            .comment-header{
              flex: 0 0 41px;
              margin-right: 10px;
              img{
                width: 41px;
                height: 41px;
                border-radius: 50%;
              }
            }
            .comment-main{
              flex: 1;
              margin-top: 6px;
              .user{
                width: 50%;
                float: left;
                font-size: 12px;
                color: #333;
              }
              .time{
                width: 50%;
                float: right;
                text-align: right;
                font-size: 10px;
                color: #666;
              }
              .content{
                margin-top: 17px;
                font-size: 13px;
                line-height: 19px;
              }
            }
          }
        }
      }
    }
  }
.food-detail-enter-active, .food-detail-leave-active {
  transition:  1.0s
}
.food-detail-enter, .food-detail-leave-to {
  transform: translateX(100%);
}
</style>
