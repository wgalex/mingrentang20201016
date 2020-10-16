<template>
    <div>
        <!-- 搜索栏 -->
        <!-- <Searchs></Searchs> -->
        <div class="head">
          <i class="iconfont icon-sousuojieguo"></i>
          <span>
            搜索结果
          </span>
        </div>
        <div class="content" v-for="item in dataList" :key="item.id" @click="toDetail(item)">
            {{item.tittle}}
        </div>
        <div v-if="seeFlag">
            <div class="empty">
                <div class="emptyinfo">
                    <img class="emptyimg" src="../../assets/custom-empty-image.png" alt="">
                </div>
            </div>
            <div class="text">
                抱歉~没有搜索到您想要的内容哦~
            </div>
        </div>
    </div>
</template>
<script>
import { searchAny } from './api'
// import Searchs from '@/components/search'
export default {
  data () {
    return {
      dataList: [],
      seeFlag: false,
    };
  },
  created(){
    this.searchRes()
  },
  methods:{
    //搜索结果
    searchRes(){
      // console.log('11111')
      let searchres = localStorage.getItem('searchres')
      let queryData = {
        mobilecontent:searchres
      }
      searchAny(queryData).then(res=>{
        if(res.data == '' || res.data == null){
          this.seeFlag = true
        }else{
          this.dataList = res.data
        }
      })
    },
    //进入某一结果详情
    toDetail(item){
      // console.log(item)
      localStorage.setItem('detailId',item.id)
      this.$router.push({name:'celebrityDetail'})
    },
  },
  // components:{
  //   Searchs
  // }
}
</script>
<style lang="stylus" scoped>
  .head{
    padding 10px
    border-bottom 1px solid orange
    span{
      border-left 5px soild #f00
      font-weight 700
      color orange
    }
    .iconfont{
      color orange
    }
  }
  .content{
    padding 10px
    border-bottom 1px solid #eee
  }
  .empty{
     padding-top 10vh
     padding-left 40%
     text-align center
     .emptyinfo{
         width 25vw
         height 12vh
         .emptyimg{
             display block
             height 12vh
             line-height 7vh
         }
     }
  }
  .text{
    text-align center
    padding-top 10px
    font-size 13px
    color #ccc
  }
</style>