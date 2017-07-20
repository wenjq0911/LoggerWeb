import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/about',
            component: resolve => require(['../components/common/index.vue'], resolve),
            children: [{
                    path: '',
                    component: resolve => require(['../components/common/about.vue'], resolve)
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/form.vue'], resolve)
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/table.vue'], resolve)
                },
                {
                    path: '/markdown-viewer',
                    component: resolve => require(['../components/page/markdown-viewer.vue'], resolve)
                },
                {
                    path: '/markdown-editor-1',
                    component: resolve => require(['../components/page/markdown-editor-1.vue'], resolve)
                },
                {
                    path: '/markdown-editor-2',
                    component: resolve => require(['../components/page/markdown-editor-2.vue'], resolve)
                },
                {
                    path: '/rtf',
                    component: resolve => require(['../components/page/rtf.vue'], resolve)
                },{
                    path: '/upload',
                    component: resolve => require(['../components/page/upload.vue'], resolve)
                },{
                    path: '/echarts',
                    component: resolve => require(['../components/page/echarts.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/common/login.vue'], resolve)
        },
        {"path":'/request',component: resolve => require(['../components/common/index.vue'], resolve),children:[
          {
            path: '',
            component: resolve => require(['../components/page/request/index.vue'], resolve)
          },
          {
            path: 'index',
            component: resolve => require(['../components/page/request/index.vue'], resolve)
          },
          {
            path: 'normal',
            component: resolve => require(['../components/page/request/normal.vue'], resolve)
          },
          {
            path: 'exception',
            component: resolve => require(['../components/page/request/exception.vue'], resolve)
          },
          {
            path: 'module',
            component: resolve => require(['../components/page/request/module.vue'], resolve)
          },
        ]}
    ]
})
