import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element-ui
import ElementUI from 'element-ui'
// 引入element-ui的css样式
import "element-ui/lib/theme-chalk/index.css"
// import * as echarts from 'echarts'  // 引入echarts
// 引入富文本所需样式，全局注册组件
import VueUeditorWrap from 'vue-ueditor-wrap'
Vue.component('vue-ueditor-wrap', VueUeditorWrap)

// 引入并使用css样式重置文件
import "@/assets/css/reset.css"

Vue.config.productionTip = false

// 使用element-ui
Vue.use(ElementUI);
// // 全局绑定echarts
// Vue.prototype.$echarts = echarts;




new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.dispatch("setRouter")
  }
}).$mount('#app')
