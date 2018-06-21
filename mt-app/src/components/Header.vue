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
        <a href="#" class="notice-activity" v-if="goodsData.discounts2">{{goodsData.discounts2.length}}个活动</a>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!--公告详情-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsData: {}
    }
  },
  props: {},
  components: {},
  computed: {
    header_background () {
      return `background-image: url('${this.goodsData.head_pic_url}');`
    },
    theme_background () {
      return `background-image: url('${this.goodsData.pic_url}');`
    }
  },
  methods: {},
  created () {
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
  }
</style>
