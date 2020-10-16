<template>
  <cube-tab-bar
    class="m-tab"
    v-model="selectedLabelDefault"
    :data="tabs"
    :inline="inline"
    @click="clickHandler"
    @change="changeHandler">
    <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
      <!-- 默认插槽 -->
      <i slot="icon" :class="item.icon"></i>
      <p class="tab-item" >{{item.name}}</p>
    </cube-tab>
  </cube-tab-bar>
</template>

<script>
export default {
  data () {
    return {
      selectedLabelDefault: 'celebrityHome',
      inline: false,
      tabs: [
        {
          label: 'celebrityHome',
          name: '首页',
          icon: 'iconfont icon-iconfonthome0'
        }, 
        {
          label: 'celebrityShares',
          name: '股份',
          icon: 'iconfont icon-rongyubiaozhang'
        }, 
        {
          label: 'celebrityCompany',
          name: '单位',
          icon: 'iconfont icon-qiyerongyu'
        }, 
        {
          label: 'celebrityMy',
          name: '我的',
          icon: 'iconfont icon-wode1'
        }
      ]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      // console.log(label)
      this.$router.push({
        name: label
      })
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
}
</script>
<style lang="stylus" scoped>
  .m-tab {
    // height 8vh;
    max-width: 500px;
    margin 0 auto
    background-color #fff
    font-size 20px; /*no*/
    box-sizing border-box
    font-weight bold
    position fixed
    bottom 0
    // left 0
    z-index 1000
    width 100%
  }
  .tab-item {
    font-size 14px; /*no*/
    letter-spacing 5px
    text-indent 5px
    margin-top 5px
  }
  .cube-tab_active{
    color orange
  }
  .icon-qiyerongyu{
    font-size 20px
  }
  .icon-iconfonthome0{
    font-size 20px
  }
  .icon-wode1{
    font-size 18px
  }
  .icon-rongyubiaozhang{
    font-size 18px
  }
</style>