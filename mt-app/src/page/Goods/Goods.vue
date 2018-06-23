<template>
  <div class="goods">
    <!--菜单栏-->
    <div class="menu" ref="menuScroll">
      <ul>
        <li class="menu-item">
          <p class="menu-text">
            <img class="icon" :src="fieldData.tag_icon" v-if="fieldData.tag_icon">
            {{fieldData.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(food, index) in foodData" :key="index">
          <p class="menu-text">
            <img class="icon" :src="food.icon" v-if="food.icon">
            {{food.name}}
          </p>
        </li>
      </ul>
    </div>
    <!--商品栏-->
    <div class="food" ref="foodScroll">
      <ul>
        <!--专场-->
        <li class="food-field-list">
          <div class="list-img" v-for="(field, index) in fieldData.operation_source_list" :key="index">
            <img :src="field.pic_url">
          </div>
        </li>
        <!--其余商品栏-->
        <li class="food-item" v-for="(column, index) in foodData" :key="index">
          <h3 class="food-title">{{column.name}}</h3>
          <!--具体商品列表-->
          <ul>
            <li class="food-list" v-for="(food, index) in column.spus" :key="index">
              <div class="food-picture" :style="foodImg(food.picture)"></div>
              <div class="food-describe">
                <h3 class="food-name">{{food.name}}</h3>
                <div class="des" v-if="food.description">{{food.description}}</div>
                <div class="food-extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="food-product" :src="food.product_label_picture" alt="">
                <p class="food-price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="food-number"></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      // 专场数据
      fieldData: '',
      // 食品数据
      foodData: '',
      // 专属数据
      specialData: ''
    }
  },
  components: {},
  computed: {
  },
  methods: {
    // 计算属性是不能够接收参数，所以采用方法绑定图片属性
    foodImg (imgName) {
      return 'background-image: url(' + imgName + ');'
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true
      })
    }
  },
  created () {
    // 获取商品数据
    this.$axios.get('/api/goods').then((res) => {
      this.fieldData = res.data.data.container_operation_source
      this.foodData = res.data.data.food_spu_tags
      this.specialData = res.data.data.poi_info
      this.$nextTick(() => {
        this.initScroll()
      })
    })
  },
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
    overflow: hidden;
    /*菜单栏*/
    .menu{
      flex: 0 0 85px;
      background: #f4f4f4;
      border-bottom: 1px solid #E4E4E4;
      position: relative;
      .menu-item{
        padding: 16px 23px 15px 10px;
        border-bottom: 1px solid #E4E4E4;
      }
      .menu-text{
        font-size: 13px;
        color: #333;
        line-height: 17px;
        vertical-align: middle;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        .icon{
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
      }
    }
    /*商品栏*/
    .food{
      flex: 1;
      .food-field-list{
        padding: 11px 11px 0 11px;
        border-bottom: 1px solid #E4E4E4;
        .list-img{
          img{
            width: 100%;
            margin-bottom: 11px;
            border-radius: 5px;
          }
        }
      }
      /*商品类*/
      .food-item{
        padding: 11px;
        .food-title{
          height: 13px;
          font-size: 13px;
          background: url(../../assets/img/btn_yellow_highlighted@2x.png) no-repeat left center;
          background-size: 2px 10px;
          padding-left: 7px;
          margin-bottom: 12px;
        }
        /*具体类商品*/
        ul{
          .food-list{
            display: flex;
            margin-bottom: 25px;
            .food-picture{
              flex: 0 0 63px;
              background-position: center;
              background-size: 120% 100%;
              background-repeat: no-repeat;
              margin-right: 11px;
              height: 75px;
            }
            .food-describe{
              flex: 1;
              .food-name{
                font-size: 16px;
                line-height: 21px;
                color: #333;
                margin-bottom: 10px;
                padding-right: 27px;
              }
              .des{
                font-size: 10px;
                line-height: 19px;
                color: #bfbfbf;
                margin-bottom: 8px;
                /* 超出部分显示省略号*/
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .food-extra{
                font-size: 10px;
                color: #BFBFBF;
                margin-bottom: 7px;
                .saled{
                  margin-right: 14px;
                }
                .praise{}
              }
              .food-product{
                height: 15px;
                margin-bottom: 6px;

              }
              .food-price{
                .text{
                  font-size: 14px;
                  color: #fb4e44;
                }
                .unit{
                  font-size: 12px;
                  color: #BFBFBF;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
