<template>
  <div class="seller" ref="sellerView">
    <div class="seller-wrapper">
      <Split></Split>
      <div class="seller-view">
        <!--地址-->
        <div class="address-wrapper">
          <div class="address-left">
            {{seller.address}}
          </div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <!--图片-->
        <div class="pics-wrapper" v-if="seller.poi_env" ref="picsView">
          <ul class="pics-list" ref="picsList">
            <li ref="picsItem" class="pics-item" v-for="(imgurl,index) in seller.poi_env.thumbnails_url_list" :key="index">
              <img :src="imgurl">
            </li>
          </ul>
        </div>
        <!--档案-->
        <div class="safety-wrapper">
          查看食品安全档案
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <Split></Split>
      <!--配送-->
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
          配送服务: {{seller.app_delivery_tip}}
        </div>
        <div class="shipping-wrapper">
          配送时间: {{seller.shipping_time}}
        </div>
      </div>
      <Split></Split>
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <div class="poi-server" v-for="(item,index) in seller.poi_service" :key="index">
            <img :src="item.icon" > {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item,index) in seller.discounts2" :key="index">
            <div class="icon">
              <img :src="item.icon_url">
            </div>
            <div class="text">
              {{item.info}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Split from '../../components/Split'
export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    BScroll,
    Split
  },
  computed: {},
  methods: {},
  created () {
    // 获取商品数据
    this.$axios.get('/api/seller').then((res) => {
      this.seller = res.data.data
      this.$nextTick(() => {
        if (this.seller.poi_env.thumbnails_url_list) {
          let imgW = this.$refs.picsItem[0].clientWidth
          let marginR = 11
          let width = (imgW + marginR) * this.seller.poi_env.thumbnails_url_list.length
          this.$refs.picsList.style.width = width + 'px'
          this.scroll = new BScroll(this.$refs.picsView, {
            scrollX: true
          })
        }
        this.sellerView = new BScroll(this.$refs.sellerView)
      })
    })
  },
  mounted () {
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .seller{
    position: absolute;
    left: 0;
    top: 191px;
    bottom: 0;
    width: 100%;
    background: #F4F4F4;
    overflow: hidden;
    .seller-wrapper{
      background: #fff;
      .seller-view{
        padding-left: 15px;
        .address-wrapper{
          display: flex;
          padding: 16px 0;
          border-bottom: 1px solid #F4F4F4;
          .address-left{
            flex: 1;
            background: url(../../assets/img/address.png) no-repeat left center;
            padding-left: 26px;
            padding-right: 31px;
            background-size: 14px 16px;
            font-size: 14px;
            line-height: 19px;
          }
          .address-right{
            flex: 0 0 60px;
            background: url(../../assets/img/line.png) no-repeat left center;
            background-size: 1px 15px;
            .content{
              width: 100%;
              height: 100%;
              background: url(../../assets/img/phone.png) no-repeat center center;
              background-size: 18px 18px;
            }
          }
        }
        .pics-wrapper{
          padding: 10px 0;
          overflow: hidden;
          border-bottom: 1px solid #F4F4F4;
          white-space: nowrap;
          .pics-list{
            .pics-item{
              display: inline-block;
              margin-right: 11px;
              width: 93px;
              height: 75px;
              img{
                width: 100%;
                height: 100%;
                border-radius: 2px;
              }
            }
          }
        }
        .safety-wrapper{
          padding: 15px 14px 15px 25px;
          background: url(../../assets/img/safety.png) no-repeat left center;
          background-size: 14px 16px;
          font-size: 14px;
          span{
            float: right;
            font-size: 14px;
          }
        }
      }
      .tip-wrapper{
        padding-left: 15px;
        .delivery-wrapper{
          background: url(../../assets/img/delivery.png) no-repeat left center;
          background-size: 14px 16px;
          padding: 15px 0 15px 25px;
          font-size: 14px;
          border-bottom: 1px solid #F4F4F4;
        }
        .shipping-wrapper{
          background: url(../../assets/img/time.png) no-repeat left center;
          padding: 15px 17px 15px 25px;
          background-size: 15px 15px;
          font-size: 14px;
          line-height: 18px;
        }
      }
      .other-wrapper{
        padding-left: 15px;
        .server-wrapper{
          background: url(../../assets/img/server.png) no-repeat left center;
          background-size: 15px 15px;
          padding: 15px 0 17px 25px;
          font-size: 14px;
          border-bottom: 1px solid #F4F4F4;
          .poi-server{
            display: inline-block;
            margin-left: 17px;
            img{
              width: 15px;
              height: 15px;
              margin-right: 6px;
              vertical-align: middle;
            }
          }
        }
        .discounts-wrapper{
          padding: 17px 24px 19px 0;
          .discounts-item{
            display: flex;
            .icon{
              flex: 0 0 25px;
              img{
                width: 15px;
                height: 15px;
              }
            }
            .text{
              flex: 1;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
