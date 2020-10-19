<template>
  <div>
    <!-- 轮播图banner -->
    <div class="lunbo">
      <!-- 搜索栏 -->
      <Searchs></Searchs>
      <div class="lunboinfo">
        <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
          <van-swipe-item @click="handlerClick(item)" v-for="item in carouselList" :key="item.id">
            <img :src="item.headPath" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 股份模块 -->
    <div class="title clearfix" style="padding:80px 0 0 10px">
      <span style="font-weight:900">股份荣誉</span>
      <span class="more" @click="more">
        更多
        <i class="cubeic-arrow"></i>
      </span>
    </div>
    <div class="itemsbox">
      <div v-for="item in gufenList" :key="item.id" @click="clickItem(item)">
        <img :src="item.headPath" alt />
      </div>
    </div>
    <!-- 单位模块 -->
    <div class="title clearfix">
      <span class="border"></span>
      <div>
        <van-row type="flex" justify="space-between">
          <van-col span="12" style="width:100%">
            <div>
              <van-dropdown-menu :class="restclass" style="width:50%">
                <van-dropdown-item v-model="selectdepart" @change='meunChange' :options="option1"  :title='showTitle'/>
              </van-dropdown-menu>
            </div>

          </van-col>
          <van-col span="12">
            <span class="more" @click="mores" style="transform: translateY(50%);">
              更多
              <i class="cubeic-arrow"></i>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div style="padding-bottom:50px">
      <div class="content" @click="danweiInfo(item)" v-for="item in danweiList" :key="item.id">
        <div class="content_left">
          <img :src="item.headPath" alt />
        </div>
        <div class="content_right">
          <p>{{item.departmentName}}</p>
          <p>{{item.categoryName}}</p>
          <!-- <span>2020-6-25</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
import Searchs from "@/components/search";
import "../../components/comstyle/style.css";
import { setDDConfig } from "@/api/dd";
import fetch from "@/api/fetch";
import { queryCategory, queryCarousel, queryCategoryDan ,selectDepartAndPersonByDepartCode} from "@/views/celebrityHome/api.js";
export default {
  data() {
    return {
      value: "",
      gufenList: [],
      danweiList: [],
      carouselList: [],
      value1: 0, //轮播图
      option1: [],
      selectdepart:'',
      showTitle:'单位荣誉',
      restclass:'restSelect'
    };
  },
  mounted() {
    //获取股份奖项
    this.getCategory();
    //获取轮播图
    this.getCarousel();
    var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
      if (!is_mobi) {
        this.restclass='restSelect restSelects'
      }
    if (
      localStorage.getItem("orgCode") == "" ||
      localStorage.getItem("orgCode") == undefined ||
      localStorage.getItem("orgCode") == null
    ) {
      this.getUser();
    } else {
      //获取单位荣誉
      this.getCategoryDan();
    }
    selectDepartAndPersonByDepartCode({}).then((res) =>{
      res.data.b01s.forEach((item) =>{
        item.text = item.content
        item.value = item.deptCode
      })
      res.data.b01s.push({text:'单位荣誉',value:'0'})
      this.option1=res.data.b01s
    })
    // this.getCategoryDan()
  },
  methods: {
    //下拉菜单change事件
    meunChange(value){
      for(let i in this.option1){
        if(this.option1[i].value == value){
          this.showTitle = this.option1[i].text
          localStorage.setItem('orgCode',this.option1[i].deptCode)
        }
      }
      this.getCategoryDan();
    },
    //点击轮播图去某个详情
    handlerClick(item) {
      console.log(item);
      if (item.celebrityName == "") {
        // alert('去个人')
        localStorage.setItem("detailId", item.celebrityPersonId);
        this.$router.push({ name: "celebrityDetail" });
      } else {
        // alert('去奖项')
        localStorage.setItem("categoryCode", item.celebrityId);
        this.$router.push({ name: "celebrityPrize" });
      }
    },
    //获取轮播图 type=1
    getCarousel() {
      let queryData = {};
      queryData.type = 1;
      queryCarousel(queryData).then(res => {
        this.carouselList = res.data;
      });
    },
    //获取股份奖项 type=2
    getCategory() {
      let queryData = {};
      queryData.type = 2;
      queryCarousel(queryData).then(res => {
        this.gufenList = res.data;
        console.log(this.gufenList);
      });
    },
    //点击某个股份下的奖项跳转奖项详情
    clickItem(item) {
      console.log(item);
      localStorage.setItem("categoryCode", item.celebrityId);
      this.$router.push({ name: "celebrityPrize" });
    },
    //股份更多
    more() {
      this.$router.push({ name: "celebrityShares" });
    },
    //获取单位荣誉
    getCategoryDan() {
      let queryData = {
        // orginCategoryCode:localStorage.getItem('orgCode'),
        departmentId: localStorage.getItem("orgCode"),
        levelCode: 2
      };
      queryCategoryDan(queryData).then(res => {
        this.danweiList = res.data;
      });
    },
    //单位更多
    mores() {
      this.$router.push({ name: "celebrityCompany" });
    },
    //点击某个单位下的奖项跳转奖项详情
    danweiInfo(item) {
      console.log(item);
      localStorage.setItem("categoryCode", item.id);
      this.$router.push({ name: "celebrityPrize" });
    },
    //获取用户登录信息
    //自动登录获取工号
    getUser() {
      // 获取用户 id
      setDDConfig().then(res => {
        var that = this;
        let data = res;
        var is_mobi =
          navigator.userAgent
            .toLowerCase()
            .match(
              /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
            ) != null;
        if (!is_mobi) {
          // PC
          console.log("pc");
          DingTalkPC.ready(() => {
            DingTalkPC.runtime.permission.requestAuthCode({
              corpId: data.corpId, //企业ID
              onSuccess: function(result) {
                // let url = '/kukacms/visitor/getDingUserInfo.htm?accessToken=' + data.token + '&code=' + result.code
                let url =
                  "/kukacms/api/categropy/getDingUserInfo.htm?code=" +
                  result.code;
                fetch({
                  url: url,
                  method: "get"
                }).then(res => {
                  console.log(res);
                  //   that.save_userId(res.data.userId)
                  localStorage.setItem("orgCode", res.data.a01.deptCode);
                  localStorage.setItem("userAvatar", res.data.avatar);
                  localStorage.setItem("a0190", res.data.jobNumber);
                  //获取单位荣誉
                  that.getCategoryDan(); //回调里调用获取单位荣誉的请求
                });
              },
              onFail: function(err) {
                alert(JSON.stringify(err));
              }
            });
          });
        } else {
          // 移动
          console.log("mobile");
          dd.ready(() => {
            dd.ui.webViewBounce.disable();
            dd.runtime.permission.requestAuthCode({
              corpId: data.corpId,
              onSuccess: function(result) {
                // let url = '/kukacms/visitor/getDingUserInfo.htm?accessToken=' + data.token + '&code=' + result.code
                let url =
                  "/kukacms/api/categropy/getDingUserInfo.htm?code=" +
                  result.code;
                fetch({
                  url: url,
                  method: "get"
                }).then(res => {
                  console.log(res);
                  // that.save_userId(res.data.userId)
                  localStorage.setItem("orgCode", res.data.a01.deptCode);
                  localStorage.setItem("userAvatar", res.data.avatar);
                  localStorage.setItem("a0190", res.data.jobNumber);
                  //获取单位荣誉
                  that.getCategoryDan(); //回调里调用获取单位荣誉的请求
                });
              },
              onFail: function(err) {
                // window.location.reload()
                alert(JSON.stringify(err));
              }
            });
          });
        }
      });
      // setDDConfig().then(res => {
      // var that = this;
      // let data = res;
      //     // 移动
      //     // debugger
      //     console.log("首页页的dd.ready");
      //         dd.ready(() => {
      //         dd.ui.webViewBounce.disable()
      //         dd.runtime.permission.requestAuthCode({
      //         corpId: data.corpId,
      //         onSuccess: function(result) {
      //             let url = '/kukacms/api/categropy/getDingUserInfo.htm?code=' + result.code
      //             fetch({
      //             url: url,
      //             method: "get"
      //             }).then(res => {
      //             console.log(res);
      //             localStorage.setItem('orgCode',res.data.a01.deptCode)
      //             localStorage.setItem('userAvatar',res.data.avatar)
      //             localStorage.setItem('a0190',res.data.jobNumber)
      //             console.log(localStorage.setItem('a0190',res.data.jobNumber))
      //             //获取单位荣誉
      //             that.getCategoryDan() //回调里调用获取单位荣誉的请求
      //             });
      //         },
      //         onFail: function(err) {
      //             // window.location.reload();
      //             alert(JSON.stringify(err))
      //             }
      //         });
      //     });
      // // }
      // });
    }
  },
  components: {
    Searchs
  }
};
</script>
<style lang="stylus" scoped>
.lunbo {
  height: 125px;
  background-image: linear-gradient(#9c0202, #9c0202, rgba(255, 255, 255, 0.5));
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
}

.lunboinfo {
  padding: 0 20px 0 20px;
  position: relative;
  top: 4px;
  left: 0;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 130px;
  text-align: center;
  background-color: #39a9ed;
  border-radius: 5px;
  height: 128px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-size: cover;
  }
}

.title {
  .more {
    float: right;
    padding: 4px 10px 4px 10px;
    margin-right: 10px;
    color: darkgray;
    background-color: #eee;
    border-radius: 15px;
    font-size: 13px;

    .cubeic-arrow {
      padding-left: 4px;
    }
  }
}

.itemsbox {
  display: flex;
  height: 218px;
  overflow: hidden;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;

  div {
    width: 48%;
    height: 100px;
    margin-top: 10px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      background-image: 100% 100%;
      border-radius: 6px;
    }
  }
}

.content {
  display: flex;
  padding: 20px 10px 0 10px;
  height: 90px;

  .content_left {
    flex: 1;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .content_right {
    flex: 2;
    margin-left: 10px;
    padding: 5px;
    line-height: 24px;

    p:nth-child(1) {
      font-size: 15px;
      font-weight: 700;
      padding-bottom: 5px;
    }

    p:nth-child(2) {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding-bottom: 5px;
      color: #ccc;
      font-size: 14px;
    }

    span {
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>
