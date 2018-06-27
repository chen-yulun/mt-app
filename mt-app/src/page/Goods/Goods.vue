<template>
  <div class="goods">
    <!--菜单栏-->
    <div class="menu" ref="menuScroll">
      <ul>
        <li class="menu-item"
            :class="{currentActive: currentIndex === 0}"
            @click="selectMenu(0)">
          <p class="menu-text">
            <img class="icon" :src="fieldData.tag_icon" v-if="fieldData.tag_icon">
            {{fieldData.tag_name}}
          </p>
        </li>
        <li class="menu-item"
            v-for="(food, index) in foodData"
            :key="index"
            :class="{currentActive: currentIndex === index+1}"
            @click="selectMenu(index+1)">
          <p class="menu-text">
            <img class="icon" :src="food.icon" v-if="food.icon">
            {{food.name}}
          </p>
          <!--使用方法代替计算属性，因为要传参-->
          <i class="num" v-show="calculateCount(food.spus)">
            {{calculateCount(food.spus)}}
          </i>
        </li>
      </ul>
    </div>
    <!--商品栏-->
    <div class="food" ref="foodScroll">
      <ul>
        <!--专场-->
        <li class="food-field-list food-list-hook">
          <div class="list-img" v-for="(field, index) in fieldData.operation_source_list" :key="index">
            <img :src="field.pic_url">
          </div>
        </li>
        <!--其余商品栏-->
        <li class="food-item food-list-hook" v-for="(column, index) in foodData" :key="index">
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
              <div class="food-control">
                <CarControl :food="food"></CarControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--购物车-->
    <GoodsShopCar :specialData="specialData" :selectFoods="selectFoods"></GoodsShopCar>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import GoodsShopCar from './GoodsShopCar'
import CarControl from '../../components/CarControl'
export default {
  data () {
    return {
      // 专场数据(注意，如果是要传给子组件，则数据类型要定义准确)
      fieldData: {},
      // 食品数据
      foodData: [],
      // 专属数据
      specialData: {},
      // 高度列表
      heightList: '',
      // 当前滚动高度
      scrollY: ''
    }
  },
  components: {
    GoodsShopCar,
    CarControl
  },
  computed: {
    // 判断当前所在商品区间
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        // 获取商品区间的范围
        let height1 = this.heightList[i]
        let height2 = this.heightList[i + 1]

        // 是否在上述区间中
        if (!height2 || (this.scrollY >= height1 && this.scrollY <= height2)) {
          return i
        }
      }
      return 0
    },
    // 所选择的商品
    selectFoods () {
      let foods = []
      this.foodData.forEach((myfoods) => {
        myfoods.spus.forEach((food) => {
          if (food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    // 计算属性是不能够接收参数，所以采用方法绑定图片属性
    foodImg (imgName) {
      return 'background-image: url(' + imgName + ');'
    },
    // 初始化滚动
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        probeType: 3 // 实时监控滚动距离
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算商品栏目高度
    calculateHeight () {
      let list = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      let heightList = []
      let height = 0
      heightList.push(height)
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight
        heightList.push(height)
      }
      this.heightList = heightList
    },
    // 菜单跳转
    selectMenu (index) {
      let list = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      let element = list[index]
      this.foodScroll.scrollToElement(element, 250)
    },
    // 所选商品数量
    calculateCount (item) {
      let count = 0
      item.forEach((food) => {
        if (food.count > 0) {
          count += food.count
        }
      })
      return count
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
        this.calculateHeight()
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
        position: relative;
      }
      .currentActive{
        background: #fff;
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
      .num{
        position: absolute;
        right: 5px;
        top: 5px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: red;
        color: #fff;
        text-align: center;
        font-size: 7px;
        line-height: 13px;
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
            position: relative;
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
            .food-control{
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
