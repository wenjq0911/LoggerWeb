import Vue from 'vue'
import App from './App'
import router from './router'
import VueMarkdown from 'vue-markdown'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueQuillEditor from 'vue-quill-editor'
import IEcharts from 'vue-echarts-v3';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.use(iView)
Vue.use(VueMarkdown)
Vue.use(IEcharts)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;
new Vue({
    el: '#app',
    router,
    VueMarkdown,
    template: '<App/>',
    components: { App}
})
