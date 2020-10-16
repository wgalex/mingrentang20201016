<template>
  <div id="app">
    <div class="container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <!-- <navigation>
        <router-view />
      </navigation> -->
    </div>
    <m-tab></m-tab>
  </div>
</template>

<script>
import { Search } from 'vant'
import MTab from '@/components/m-tab'
import { setDDConfig } from '@/api/dd'
import { mapMutations } from 'vuex'
import fetch from '@/api/fetch'
export default {
  name: 'app',
  data(){
    return{
      value: ''
    }
  },
  created () {
    // 获取用户 id
    setDDConfig().then(res => {
      var that = this
      let data = res
      var is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
      if (!is_mobi) {
        // PC
        console.log('pc')
        DingTalkPC.ready(() => {
          DingTalkPC.runtime.permission.requestAuthCode({
              corpId: data.corpId, //企业ID
              onSuccess: function(result) {
                // let url = '/kukacms/visitor/getDingUserInfo.htm?accessToken=' + data.token + '&code=' + result.code
                let url = '/kukacms/api/categropy/getDingUserInfo.htm?code=' + result.code
                fetch({
                  url: url,
                  method: 'get'
                }).then(res => {
                  console.log(res)
                  that.save_userId(res.data.userId)
                  localStorage.setItem('orgCode',res.data.a01.deptCode)
                  localStorage.setItem('userAvatar',res.data.avatar)
                  localStorage.setItem('a0190',res.data.jobNumber)
                })
              },
              onFail: function(err) {
                window.location.reload()
              }
          })
        })
      } else {
        // 移动
        console.log('mobile')
        dd.ready(() => {
          dd.ui.webViewBounce.disable()
          dd.runtime.permission.requestAuthCode({
            corpId: data.corpId,
            onSuccess: function(result) {
              // let url = '/kukacms/visitor/getDingUserInfo.htm?accessToken=' + data.token + '&code=' + result.code
              let url = '/kukacms/api/categropy/getDingUserInfo.htm?code=' + result.code
              fetch({
                url: url,
                method: 'get'
              }).then(res => {
                console.log(res)
                that.save_userId(res.data.userId)
                localStorage.setItem('orgCode',res.data.a01.deptCode)
                localStorage.setItem('userAvatar',res.data.avatar)
                localStorage.setItem('a0190',res.data.jobNumber)
              })
            },
            onFail : function(err) {
              // window.location.reload()
              alert(JSON.stringify(err))
            }
          })
        })
      }

    })
  },
  methods: {
    ...mapMutations({
      save_userId: 'save_userId'
    })
  },
  components: {
    MTab    
  }
}
</script>

<style>
html,body{
  height: 100vh;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}
#app {
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: scroll;
  /* overflow: hidden; */
}
.container {
  /* height: 92vh; */
  height: 100%;
  width: 100%;
  /* padding-bottom: 12vh; */
  /* overflow-x: hidden; */
  /* overflow: hidden; */
}
*{
  -webkit-overflow-scrolling: touch;
}
img{
  width: 100%;
}
</style>
