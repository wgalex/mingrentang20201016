<template>
    <!-- 搜索框组件 -->
    <van-sticky>
    <div class="search">
      <van-search
        ref="search"
        v-model="value"
        shape="round"
        clearable
        :show-action="showAction"
        background="#9c0202"
        @focus="onFocus"
        @click="search"
        placeholder="请输入搜索关键词"
      >
      <template #action>
        <span @click="onSearch" class="searchs">搜索</span>
        <!-- <span @click="onCancel" class="searchs">取消</span> -->
      </template>
      </van-search>
    </div>
    </van-sticky>
</template>
<script>
import { Search,Sticky,Notify } from 'vant'
export default {
  name:'s-search',
  data () {
    return {
        value: '',
        showAction: false
    };
  },
  methods:{
    search(){
      // this.$router.push({name:'celebritySearch'})
    },
    //获取焦点时触发
    onFocus(){
      this.showAction = true
      // console.log(showAction)
    },
    //失去焦点时触发
    // onBlur(){
    //   this.showAction = false
    // },
    //搜索跳转结果页面
    onSearch(){
      if(this.$route.name == 'celebritySearch'){
        return ''
      }else if(this.value == ''){
        Notify({ type: 'warning', message: '搜索内容不能为空！' })
      }else{
        this.$router.push({name:'celebritySearch'})
        localStorage.setItem('searchres',this.value)
        this.showAction = false
      }
    },
    //取消
    onCancel(){
      this.showAction = false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .search{
    pisition fixed
    max-width 500px
    margin 0 auto
    top 0
    left 0
  }
  .searchs{
    color #fff
  }
</style>