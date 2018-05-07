import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './style/main.css'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(brands)

Vue.use(ElementUI);

Vue.prototype.$message = ElementUI.Message

const app = new Vue({
  router,
  ...App
})

app.$mount('#app')
