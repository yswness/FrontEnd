import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Constant from './constants/constants.js'
Vue.prototype.$globle = Constant;

/* ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* md5 */
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

/* axios */
import axios from 'axios';

axios.default.withCredentials = true;
//axios.default.baseURL = process.env.VUE_APP_BASE_URL;
Vue.prototype.$axios = axios;
//

/* svg */
import IconSvg from '@/components/SvgIcon/svgicon.vue';
Vue.component('svg-icon', IconSvg);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icons', false, /\.svg$/);
requireAll(req);

/* MathJax */
import Mathjax from './components/Mathjaxconfig/mathjaxconfig.js'
Vue.prototype.$MathJax = Mathjax;

/* moment */
import moment from 'moment'
Vue.prototype.$moment = moment;

/* mockjs 模拟数据 测试完及时删除 */
import './mockjs';


/* debug */
Vue.config.debug = true;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
