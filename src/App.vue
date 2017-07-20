<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
        topMenu:[
          {name:'menu-log-request',icon:'pull-request',text:'请求日志',color:'#607D8B'},
          {name:'menu-log-opt',icon:'ios-keypad',text:'操作日志',color:'#F4B400'},
          {name:'menu-log-exception',icon:'android-warning',text:'异常日志',color:'#DB4437'},
          {name:'menu-setting',icon:'settings',text:'设置',color:'#0F9D58'}
        ],
        leftMenu:{
          'menu-log-request':[
            {name:'',icon:'',text:'综合监控'}
          ],
          'menu-log-opt':[
            {name:'',icon:'',text:''}
          ],
          'menu-log-exception':[
            {name:'',icon:'',text:'综合监控'}
          ],
          'menu-setting':[
            {name:'',icon:'',text:'设置'}
          ]
        },
        currentMenus:[],
        headerStyle:{
          'background': '#607D8B',
          'padding': '10px 0',
          'overflow': 'hidden',
        }
      };
    },
    methods:{
      topMenuClick:function(e){
        this.currentMenus = this.leftMenu[e];
        for(var i=0;i<this.topMenu.length;i++){
          if(this.topMenu[i].name==e){
            this.headerStyle.background=this.topMenu[i].color;
            break;
          }
        }
      }
    }
  }


</script>
