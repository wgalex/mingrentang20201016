<template>
    <div>
        <!-- 搜索栏 -->
        <Searchs></Searchs>
        <div class="sideHeader">
            <div class="header">
               <div class="boxleft">
                   <img :src="avatar" alt="">
               </div>
               <div class="boxright">
                   <div class="infomessage">
                       <div class="infobox">
                           <i class="iconfont icon-wode"></i>
                            <span class="wname">姓名</span><br>
                            <span>{{personList.a0101}}</span>
                        </div>
                        <div class="infobox">
                            <i class="iconfont icon-yuangonggonghao" style="font-size:13px"></i>
                            <span class="wname">工号</span><br>
                            <span>{{personList.a0190}}</span>
                        </div>
                    </div>
                    <div class="infomes">
                        <div class="infobox">
                            <i class="iconfont icon-web-icon-"></i>
                            <span class="wname">机构路径</span><br>
                            <span>{{personList.jglj}}</span>
                        </div>
                        <div class="infobox">
                            <i class="iconfont icon-zhaopingangwei"></i>
                            <span class="wname">岗位</span><br>
                            <span>{{personList.mc0000}}</span>
                        </div>
                    </div>
               </div>
            </div>
        </div>
        <div class='time'>
            <div class="title">荣誉经历</div>
            <div class='text-content'>
                <div class='time-line'>
                    <div v-for='item in prizeList' :key="item.id" class='time-line-div' @click="haha(item)">
                        <p>{{item.years}}</p>
                        <p ref='circular'></p>
                        <p>{{item.categoryNameTwo}}</p>
                    </div>
                    <div class='img-dotted' ref='dotted'></div>
                </div>
                <div style='margin-top:20px;'></div>
            </div>
        </div>
        <van-popup
        v-model="showImg"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '50%' }"
        >
            
            <div class="uploadimg">
                <cube-upload
                :action="actions"
                v-model="fileData"
                :simultaneous-uploads="1"
                @files-added="filesAdded"
                @file-success="successImg"
                :max="1" />
            </div>
            <div class="imgText">
                请选择要上传的图片~(选择后即上传)
            </div>
        </van-popup>
    </div>
</template>
<script>
import Searchs from '@/components/search'
import { queryPerson,queryTimePrize } from './api'
import { Popup } from 'vant'
export default {
  data () {
    return {
        personList: {},
        showImg: false,
        fileData: [],
        actions: '',
        prizeList: [],
        avatar: ''
    };
  },
  created(){
    this.getPerson()
    this.getTimePrize()
    // localStorage.setItem('a0190',9025145)
    if(localStorage.getItem('userAvatar') == '' || localStorage.getItem('userAvatar') == undefined){
        this.avatar = require('@/assets/timg.jpg')
    }else{
        this.avatar = localStorage.getItem('userAvatar')
    }
  },
  methods:{
    //获取个人信息
    getPerson(){
        let queryData = {
            // a0190:9025145
            a0190:localStorage.getItem('a0190')
        }
        queryPerson(queryData).then(res=>{
            this.personList = res.data
        })
    },
    //获取个人奖项信息
    getTimePrize(){
        let queryData = {
            personCode:localStorage.getItem('a0190')
            // personCode:9025145
        }
        if(localStorage.getItem('a0190') == '' || localStorage.getItem('a0190') == undefined || localStorage.getItem('a0190') == null){
            return
        }else{
            queryTimePrize(queryData).then(res=>{
                this.prizeList = res.data
            })
        }
    },
    haha(item){
        console.log(item)
        localStorage.setItem('detailId',item.id)
        this.$router.push({name:'celebrityDetail'})
    },
    //上传头像部分
    uploadImg(items){
        // console.log(items)
        // items.potoURL
        this.showImg = true
    },
    //选择上传图片
    filesAdded(){
        // this.actions = `/pbcTom/visitor/pbc/imageUpload.htm?a0188=${this.achlist[0].a0188}`
        this.showImg = false
    },
    //上传成功后的回调
    successImg(file){
        // debugger
        var that = this
        // console.log(file.file)
        var files = file.file
        var reader = new FileReader(); //创建一个文件读取读取对象
        // console.log(reader)
        reader.readAsDataURL(files); //使用readAsDataURL（）方法，读取已获取的文件，并返回数据
        reader.onload = function() {
          //事件读取对象.onload 事件， onload事件 文件读取完成时触发
        //   that.src = reader.result;
        for (var i in that.achlist){
            // 将img的src属性等于数据
            that.achlist[i].potoURL = reader.result
        }
        //   console.log(reader.result);
        };
        that.showImg = false
    },
  },
  mounted(){
    //   this.$refs.dotted.style.left = this.$refs.circular[0].offsetLeft - 12 + 'px'
  },
  components:{
    Searchs
  }
}
</script>
<style lang="stylus" scoped>
    .sideHeader{
        background-image: linear-gradient(#9c0202,#9c0202,rgba(255,255,255,0.5))
        border-bottom-left-radius 40%
        border-bottom-right-radius 40%
        .header{
            display flex
            width 95%
            height 165px
            padding-bottom 16px
            margin 0 auto
            background-color #fff
            border-radius 6px
            box-shadow 0px 20px 20px -20px #ccc
            .boxleft{
                width 30%
                padding 30px 0 0 6px
                img{
                    width 107px
                    height 107px
                    border-radius 8px
                }
            }
            .boxright{
                width 70%
                padding 6px 0 0 20px
                .infomessage{
                    display flex
                    padding-top 10px 
                    .infobox{
                        flex 1
                        line-height 25px
                        .wname{
                            color #ccc
                            font-size 14px
                        }
                    }
                }
                .infomes{
                    display flex
                    padding-top 10px 
                    .infobox{
                        flex 1
                        line-height 25px
                        padding-right 5px
                        .wname{
                            color #ccc
                            font-size 14px
                        }
                    }
                }
            }
        }
    }
    .time{
        padding 20px 0 50px 0
        .title{
            text-align center
            height 30px
            line-height 30px
            padding-bottom 20px
            font-size 20px
            color orange
        }
        h2{
            color:#FF6600;
            margin: 20px auto 30px auto;
        }
    }
    .time-line{
        position: relative;
        width:300px;
        margin:0 auto;
    }
    .time-line-div{
        position:relative;
        min-height:85px;
    }
    .time-line-div>p:nth-child(1){
        position: absolute;
        top:2px
        left:6px;
        width:95px;
        border 1px solid #eee
        // height 32px
        line-height 30px
        padding 0 10px
        border-radius 12px
    }
    .time-line-div>p:nth-child(2){
        position:absolute;
        left: 128px;
        width:15px;
        height:15px;
        top:10px;
        background:orange;
        border-radius: 50%;
        z-index: 10
    }
    .time-line-div>p:nth-child(3){
        position:absolute;
        left: 152px;
        padding: 10px;
        font-size:.8rem;
        line-height: 18px;
        color:#343434;
        box-shadow: 0px 0px 5px #eee
        border-radius: 10px;
    }
    .img-dotted{
        position:absolute;
        width:20px;
        height:100%;
        top:0;
        left 116px
        z-index: 1;
        background:url('../../assets/dotted.png');
    }
    .uploadimg{
        text-align center
        padding-top 10vh
        padding-left 40%
    }
    .imgText{
        text-align center
        font-size 12px
        color #ccc
    }
</style>