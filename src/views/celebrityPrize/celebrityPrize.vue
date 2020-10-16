<template>
    <div>
           <div class="contain">
                <!-- 搜索栏 -->
                <Searchs></Searchs>
           </div>
           <!-- banner部分 -->
            <div class="banner">
                <img :src="topList.headPath" alt="">
            </div>
          <!-- 描述部门 -->
          <div class="introduction">
            <div>荣誉简介</div>
            <p>评审条件 </p><p @click="more">{{topList.categorySelectionCondition}}</p>
            <p>评审时间 </p><p>{{topList.categorySelectionTime}}</p>
            <!-- <p>展现精神 </p><p>展现精神</p> -->
          </div>
          <!-- 标签页内容 -->
          <div class="content">
            <van-tabs v-model="active" title-active-color="#666" color="#f00" line-width="30px" @click="onClick">
                <van-tab :title="item.name" v-for="item in dataList" :key="item.id">
                    <!-- 没有小奖时的内容（年份下直接显示名人信息） -->
                    <div  v-for="sons in item.tCelebrityPersonEntities" :key="sons.id" v-if="sons.name == ''">
                        <div v-for="son in sons.tCelebrityPersonList" :key="son.id" @click="personInfoo(son)" class="soncontent">
                            <div class="info_left">
                                <img :src="son.headPath" alt="">
                            </div>
                            <div class="info_right">
                                <p>{{son.tittle}}</p>
                                <p v-html="son.personalDetails"></p>
                                <!-- <p>{{son.personalDetails}}</p> -->
                            </div>
                        </div>
                    </div>
                    <!-- 有小奖的内容 -->
                    <van-tabs v-model="activeChild" 
                    title-active-color="#666" 
                    color="#f00" 
                    line-width="30px"
                    >
                        <van-tab v-if="childs.name !== ''" :title="childs.name" v-for="childs in item.tCelebrityPersonEntities" :key="childs.id">
                            <div class="infocontent" @click="personInfo(child)" v-for="child in childs.tCelebrityPersonList" :key="child.id">
                                <div class="info_left">
                                    <img :src="child.headPath" alt="">
                                </div>
                                <div class="info_right">
                                    <p>{{child.tittle}}</p>
                                    <!-- <p>{{child.personalDetails}}</p> -->
                                    <p v-html="child.personalDetails"></p>
                                    <!-- <p>这里是描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p> -->
                                    <!-- <span>2020-6-25</span> -->
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                    <!-- 时间下面的内容（没有小奖的情况） -->
                    <!-- <van-tabs v-model="activeChild" 
                    title-active-color="#ccc" 
                    color="#f00" 
                    line-width="30px"

                    >
                        <van-tab :title="son.categoryName"
                        v-for="son in item.tCelebrityPersonEntities.tCelebrityPersonList" 
                        :key="son.id">
                            <div class="infocontent" @click="personInfo(child)">
                                <div class="info_left">
                                    <img :src="child.headPath" alt="">
                                </div>
                                <div class="info_right">
                                    <p>{{child.tittle}}</p>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs> -->
                    <!-- <div class="type" v-if="item.tCelebrityPersonList!=''"><span></span> 奖项类别</div> -->
                </van-tab>
            </van-tabs>
          </div>
    </div>
</template>
<script>
import Searchs from '@/components/search'
import { queryCategory,queryRules } from './api'
import { Tab,Tabs,Notify,Dialog } from 'vant'
export default {
  data () {
    return {
        active: 0,
        activeChild: 0,
        dataList: [], //年份、小奖、名人信息
        topList: {},
        isFirstEnter:false // 定义变量来判断是否第一次进入，默认false
    };
  },
  created(){
      this.isFirstEnter=true
    //   this.getDetail()
  },
  methods:{
    //获取奖项详情
    getDetail(){
        //判断钉钉消息拼接的参数id
        if( localStorage.getItem('categoryCode') == null){
            let queryData = {}
            queryData.id = this.$route.query.id
            queryData.bFlag = '1'
            // queryData.id = 154
            queryCategory(queryData).then(res=>{
                if(res.data == ''){
                    Notify({ type: 'warning', message: '该奖项还没有内容哦~' })
                }else{
                    for(var i in res.data){
                        var str = res.data[i].name
                        res.data[i].name = str.trim().split(/\s+/)[1]
                        // strList.push(str)
                    }
                    this.dataList = res.data
                    for ( let i = 0; i <= this.dataList.length-1; i++ ) {
                        for( let j=0;j < this.dataList.length-i-1;j++ ){
                            if(this.dataList[j].name < this.dataList[j+1].name){
                                let temp = this.dataList[j];
                                this.dataList[j] = this.dataList[j+1];
                                this.dataList[j+1] = temp;
                            }
                        }
                        
                    }
                    // console.log(this.dataList)
                }
                
            })
        }else{
            let queryData = {}
            queryData.id = localStorage.getItem('categoryCode')
            queryData.bFlag = '1'
            // queryData.id = 154
            queryCategory(queryData).then(res=>{
                if(res.data == ''){
                    Notify({ type: 'warning', message: '该奖项还没有内容哦~' })
                }else{
                    for(var i in res.data){
                        var str = res.data[i].name
                        res.data[i].name = str.trim().split(/\s+/)[1]
                        // strList.push(str)
                    }
                    this.dataList = res.data
                    for ( let i = 0; i <= this.dataList.length-1; i++ ) {
                        for( let j=0;j < this.dataList.length-i-1;j++ ){
                            if(this.dataList[j].name < this.dataList[j+1].name){
                                let temp = this.dataList[j];
                                this.dataList[j] = this.dataList[j+1];
                                this.dataList[j+1] = temp;
                            }
                        }
                        
                    }
                    // console.log(this.dataList)
                }
                
            })
        }
    },
    //获取奖项图片和评审时间条件
    getRules(){
        //判断钉钉消息拼接的参数id
        if( localStorage.getItem('categoryCode') == null){
            let queryData = {
                id:this.$route.query.id
            }
            queryRules(queryData).then(res=>{
                this.topList = res.data
            })
        }else{
            let queryData = {
                id:localStorage.getItem('categoryCode')
            }
            queryRules(queryData).then(res=>{
                this.topList = res.data
            })
        }
    },
    getObjFirst(obj){
        for(let i in obj) return obj[i];
    },
    //点击某一详情
    messageInfo(item){
        console.log(item)
    },
    //详情
    personInfo(child){
        console.log(child)
        localStorage.setItem('detailId',child.id)
        this.$router.push({name:'celebrityDetail'})
    },
    //详情
    personInfoo(son){
        console.log(son)
        localStorage.setItem('detailId',son.id)
        this.$router.push({name:'celebrityDetail'})
    },
    //点击某个年份
    onClick(name,title){
        console.log(name,title)
    },
    //查看更多
    more(){
        Dialog.alert({
            title: '评审条件',
            messageAlign: 'left',
            message: this.topList.categorySelectionCondition,
            }).then(() => {
            // on close
        })
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "celebrityDetail") {
      // 这个name是下一级页面的路由name
      to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
    }
    next();
  },
   activated() {
     if(!this.$route.meta.isBack || this.isFirstEnter){
         // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
         // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
        this.dataList = [],
        this.topList = {} // 把数据清空，可以稍微避免让用户看到之前缓存的数据
        //  this.getData();
        this.getDetail()
        this.getRules()
     }
     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
     this.$route.meta.isBack=false
     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
     this.isFirstEnter=false;
 
   },
  components:{
    Searchs
  }
}
</script>
<style lang="stylus" scoped>
    .contain{
        height 120px
        background-image: linear-gradient(#9c0202,#9c0202,rgba(255,255,255,0.5))
        border-bottom-left-radius 20px
        border-bottom-right-radius 20px
    }
    .banner{
        position relative
        top -65px
        left 0
        width 90%
        margin 0 auto
        height 120px
        background-color #9c0202
        img{
            display inline-block
            width 100%
            height 125%
            background-image 100% 100%
            border-radius 6px
        }
    }
    .introduction{
        width 95%
        line-height 25px
        margin 0 10px 5px 10px
        box-shadow: 0px 0px 5px #eee
        background url('../../assets/bgc.png')  no-repeat
        background-size: 100% 100%
        p:nth-child(3),
        p:nth-child(5),
        p:nth-child(7){
            color #666
            font-size 12px
            padding-bottom 5px
            overflow hidden
            // white-space wrap
            display -webkit-box
            -webkit-line-clamp: 2
            // text-overflow ellipsis
            -webkit-box-orient: vertical
        }
        p{
            padding-left 10px
        }
        div{
            font-weight 700
            font-size 16px
            text-align center
        }
    }
    .content{
        padding-bottom 50px
        .infocontent{
            display flex
            padding 10px 10px 0 10px
            .info_left{
                flex 1
                height 75px
                img{
                    // width 100%
                    width 82px
                    height 100%
                    border-radius 8px
                }
            }
            .info_right{
                flex 3
                height 82px
                overflow hidden
                margin-left 10px
                padding 0 5px 5px 5px
                line-height 19px
                white-space normal
                display -webkit-box
                -webkit-line-clamp 4
                -webkit-box-orient vertical
                text-overflow ellipsis
                p:nth-child(1){
                    font-size 15px
                    color #000
                    padding-bottom 5px
                    letter-spacing 1px
                    height 20px
                    line-height 22px
                    overflow hidden
                }
                p:nth-child(2){
                    width 57vw
                    height 40px
                    text-overflow ellipsis
                    overflow: hidden
                    color #ccc
                    font-size 12px
                    text-align justify
                }
                span{
                    color #ccc
                    font-size 14px
                }
            }
        }
        .soncontent{
            display flex
            padding 20px 10px 10px 10px
            .info_left{
                flex 1
                height 75px
                img{
                    width 82px
                    height 100%
                    border-radius 8px
                }
            }
            .info_right{
                flex 3
                height 82px
                overflow hidden
                margin-left 10px
                padding 0 5px 5px 5px
                line-height 18px
                white-space normal
                display -webkit-box
                -webkit-line-clamp 4
                -webkit-box-orient vertical
                text-overflow ellipsis
                p:nth-child(1){
                    font-size 15px
                    color #000
                    padding-bottom 5px
                    letter-spacing 1px
                    height 20px
                    line-height 22px
                    overflow hidden
                }
                p:nth-child(2){
                    width 57vw
                    height 38px
                    text-overflow ellipsis
                    overflow: hidden
                    color #ccc
                    font-size 12px
                    text-align justify
                }
            }
        }
    }
    .type{
        height 30px
        line-height 30px
        width 100%
        padding 10px 0 0 10px
        border-bottom 1px solid #eee
        color orange
        font-weight 700
        span{
            border-left 5px solid #f00
            padding-right 8px
        }
    }
</style>