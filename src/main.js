import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import store from '@/store/index'

Vue.use(Cube)

// 兼容 ES6
import 'babel-polyfill'
// 查看大图
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
//引入矢量图标
import './assets/icon/iconfont.css'
var options={
  fullscreenEl: false, //关闭全屏按钮
  isClickableElement : function(el){
    return el.tagName === 'A' || el.tagName === 'IMG';
  },
  tapToClose: true,
}
Vue.use(preview, options)
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // error:'./static/error.png',
    // loading:'./static/loading.gif'
})

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant)
import './assets/restVui.css';

//引入vConsole
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
Vue.use(vConsole)

// import Navigation from 'vue-navigation';
// Vue.use(Navigation, {router,keyName: 'VNK'})
//视频插件
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'

// Vue.use(VideoPlayer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
