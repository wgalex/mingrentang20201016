<template>
    <div>
        <div class="contents">
            <!-- 搜索栏 -->
            <Searchs></Searchs>
        </div>
        <div class="contains">
            <!-- <section v-html="dataList.mobilecontent.replace(/\r?\n/g, '')">
            </section> -->
            <div class="textImg">
                <p style="font-weight:700;font-size:19px;line-height:28px;color:#535353;letter-spacing:1px">{{dataList.tittle}}</p>
                <div class="image">
                    <img :src="dataList.photoPath" alt="">
                </div>
                <p style="color:#494949;padding-bottom:20px;padding-top:15px;font-weight:600"><i class="iconfont icon-qiyerongyu"></i> 优秀事迹</p>
                <!-- <p style="color:#575757;line-height:24px;font-size: 14px;text-align:left">{{dataList.personalDetails}}</p> -->
                <p
                style="color:#575757;line-height:24px;font-size: 14px;text-align:left"
                v-html="dataList.personalDetails.replace(/\r?\n/g, '<br/>')">
                </p>
            </div>
            <div class="videos" v-if="dataList.categoryPhotoPath !== ''">
                <p style="padding-bottom:25px;font-weight:600"><i class="iconfont icon-rongyubiaozhang"></i> 荣誉证书</p>
                <div class="image">
                    <img :src="dataList.categoryPhotoPath" alt="">
                </div>
            </div>
            <div class="video" v-if="playerOptions.sources.src !== ''">
                <p style="padding-bottom:25px;font-weight:600"><i class="iconfont icon-shipin1"></i> 视频介绍</p>
                <!-- <video
                id="hiddle"
                width="100%" 
                height="240"
                controls 
                x-webkit-airplay="true"
				x5-playsinline="true"
                x5-video-player-type="h5"
                style="padding-right:10px;object-fit:fill" 
                v-if="file !==''">
                    <source :src="file" type="video/mp4">
                </video> -->
                <!-- <iframe :src="file" frameborder=0 allowfullscreen ></iframe> -->
                <video-player  class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    v-if="playerOptions.sources.src !== ''"
                ></video-player>
            </div>
            <div>
                <i class="cubeic-share" @click="sharebtn" >分享</i>
            </div>
        </div>
    </div>
</template>
<script>
import Searchs from '@/components/search'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import { queryDetail } from './api'
export default {
  data () {
    return {
        dataList: {},
        file: '',
        playerOptions : {
            // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: {
            src: '',  // 路径
            type: 'video/mp4'  // 类型
            },
            poster: "", //你的封面地址
            // width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
            }
        }
    };
  },
  created(){
    this.getDetail()
  },
  methods:{
    //获取个人获奖详情
    getDetail(){
        if(localStorage.getItem('detailId') == null){
            let queryData = {
            // createby:'公司主管理员账号',
            id:this.$route.query.id
            }
            queryDetail(queryData).then(res=>{
                if(res.data.personalDetails == null){
                    res.data.personalDetails = ''
                }
                this.dataList = res.data
                // console.log(this.dataList)
                // this.file = this.dataList.filePath
                this.playerOptions.sources.src = this.dataList.filePath
            })
        }else{
            let queryData = {
            // createby:'公司主管理员账号',
            id:localStorage.getItem('detailId')
                // id:31
            }
            queryDetail(queryData).then(res=>{
                if(res.data.personalDetails == null){
                    res.data.personalDetails = ''
                }
                this.dataList = res.data
                console.log(this.dataList)
                // this.file = this.dataList.filePath
                this.playerOptions.sources.src = this.dataList.filePath
            })
        }
    },
    //分享
    sharebtn(){
        let that = this
        let myurl = window.location.href
        dd.ready(() => {
            dd.biz.util.share({
                type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
                url: myurl,
                title: that.dataList.tittle,
                content: that.dataList.tittle,
                image: that.headPath,
                onSuccess : function() {
                    //onSuccess将在调起分享组件成功之后回调
                    /**/
                },
                onFail : function(err) {}
            })
        })
    },
  },
  components:{
    Searchs,
    videoPlayer
  }
}
</script>
<style lang="stylus" scoped>
@import 'https://g.alicdn.com/de/prismplayer/2.7.2/skins/default/aliplayer-min.css'
    .contents{
        height 120px
        background-image: linear-gradient(#9c0202,#9c0202,rgba(255,255,255,0.5))
        border-bottom-left-radius 20px
        border-bottom-right-radius 20px
    }
    .contains{
        position relative
        top -55px
        left 0
        padding 10px
        border-radius 5px
        margin 0 10px
        background-color #fff
        overflow-y auto
        box-shadow: 0px 0px 5px #eee
        .cubeic-share{
            float right
            color orange
        }
        .videos{
            padding 30px 0 10px 0
            p{
                text-align center
                color #494949
            }
            .image{
                padding 15px 0
                img{
                    height 100%
                    background-image 100% 100%
                }
            }
        }
        .video{
            padding 30px 0 10px 0
            p{
                text-align center
                color #494949
                padding-bottom 25px
            }
        }
        .textImg{
            text-align center
            .image{
                padding 15px 0
                img{
                    // height 100%
                    background-image 100% 100%
                }
            }
        }
    }
    section img{
        width 100%
    }
    .icon-qiyerongyu{
        color orange
        font-size 18px
    }
    .icon-rongyubiaozhang{
        color orange
    }
    .icon-shipin1{
        color orange
    }
    .video-js .vjs-big-play-button{
        top: 33%;
        left: 33%;
    }
</style>