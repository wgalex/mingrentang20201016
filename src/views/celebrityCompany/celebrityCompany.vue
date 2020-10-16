<template>
    <div>
        <div class="containers">
          <!-- 搜索栏 -->
          <div class="conts">
            <Searchs></Searchs>
            <div class="fff"></div>
          </div>
          <div style="padding-top:10px">
            <div class="img">
            <span class="divsty" @click="goInfo(item)" v-for="item in gufenList" :key="item.id">
              <span style="width:30px;height:30px;padding-right:10px">
                <img src="../../assets/touch.png" alt="">
              </span>
              <span class="arrow">
                {{item.categoryName}}
              </span>
            </span>
          </div>
          </div>
        </div>
    </div>
</template>
<script>
import Searchs from '@/components/search'
import { queryCategory } from './api'
export default {
  data () {
    return {
      gufenList: []
    };
  },
  created(){
    this.getCategory()
  },
  methods:{
    //获取股份奖项
    getCategory(){
      let queryData = {
        // orginCategoryCode:1002 
        // orginCategoryCode:localStorage.getItem('orgCode')
        // departmentId:1006,
        departmentId:localStorage.getItem('orgCode'),
        levelCode:2
      }
        queryCategory(queryData).then(res=>{
            this.gufenList = res.data
        })
    },
    goInfo(item){
      console.log(item)
      localStorage.setItem('categoryCode',item.id)
      this.$router.push({name:'celebrityPrize'})
    },
  },
  components:{
    Searchs
  }
}
</script>
<style lang="stylus" scoped>
  .containers{
    width 100%
    height 92vh
    .conts{
      position relative
      height 110px
      background-image: linear-gradient(#9c0202,#9c0202,rgba(255,255,255,0.5))
      border-bottom-left-radius 10%
      border-bottom-right-radius 10%
    }
    .fff{
      position absolute
      left 0
      top 45px
      height 52%
      width 95%
      margin 10px
      background-color #fff
      border-top-left-radius 6px
      border-top-right-radius 6px
    }
    .img{
      position relative
      width 100%
      height 150vh
      background url('../../assets/backgc.png') no-repeat
      background-size: 100% 100%
      .divsty{
        position absolute
        height 40px
        line-height 40px
        padding 0 10px 0 10px
        background url('../../assets/boxarrow.png') no-repeat
        background-size: 100% 100%
        color #fff
        text-align center
      }
      .divsty:nth-child(1){
        left 50%
        top 0
      }
      .divsty:nth-child(2){
        left 18%
        top 10vh
      }
      .divsty:nth-child(3){
        left 6%
        top 20vh
      }
      .divsty:nth-child(4){
        left 20%
        top 30vh
      }
      .divsty:nth-child(5){
        left 31%
        top 40vh
      }
      .divsty:nth-child(6){
        left 6%
        top 50vh
      }
      .divsty:nth-child(7){
        left 29%
        top 60vh
      }
      .divsty:nth-child(8){
        left 50%
        top 70vh
      }
      .divsty:nth-child(9){
        left 19%
        top 80vh
      }
      .divsty:nth-child(10){
        left 9%
        top 90vh
      }
      .divsty:nth-child(11){
        left 33%
        top 100vh
      }
      .divsty:nth-child(12){
        left 60%
        top 110vh
      }
      .divsty:nth-child(13){
        left 12%
        top 120vh
      }
      .divsty:nth-child(14){
        left 40%
        top 130vh
      }
      .divsty:nth-child(15){
        left 66%
        top 140vh
      }
      span{
        float left
        padding-left 3px
        img{
          height 30px
          width 30px
          vertical-align middle
          padding-left 10px
        }
      }
    }
  }
</style>