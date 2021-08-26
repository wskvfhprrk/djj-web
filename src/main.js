import Vue from 'vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import router from './router';
import App from './App.vue';
import qs from 'qs';

Vue.use(ElementUI);
Vue.prototype.$qs = qs;//对post   后台接受不到参数进行处理
Vue.prototype.$echarts = echarts;//表格控件

/*
* v-has
*/

Vue.directive('has', {
    inserted: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {

            el.parentNode.removeChild(el);
        }
    }
});
Vue.directive('allow', {
    inserted: function (el, Btnname) {
        var arr = [];
        var s = false;
        arr = sessionStorage.getItem('btn').split(',');
        for (var i = 0; i < arr.length; i++) {
            if (Btnname.expression == arr[i]) {
                s = true;
            }
        }
        if (!s) {
            el.parentNode.removeChild(el);
        }
    }
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

