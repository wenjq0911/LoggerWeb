<style scoped>

  .layout {
    border: 1px solid #d7dde4;
    background: #F2F2F2;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 550px;
    height: 100%;
    margin: 0px;
    overflow: auto;
    background: #F2F2F2;
  }

  .layout-content-main {
    padding: 5px 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #5C7886;
    /*min-width: 100px;*/
  }

  .layout-header {
    height: 60px;
    background: #F2F2F2;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    padding-top: 5px;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .layout-ceiling {
    /*background: #607D8B;*/
    overflow: hidden;
    -webkit-transition-property: background-color;
    -webkit-transition-duration: 0.8s;
    -webkit-transition-timing-function: ease;
  }

  .layout-ceiling-main {
    float: right;
    margin-right: 15px;
  }

  .layout-ceiling-logo {
    float: left;
    margin-left: 30px;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-card-menu {
    padding-top: 5px;
    padding-left: 10px;
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 16px;
    background-color: #000;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #FFF;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #ADADAD;
  }

  .layout-header-hide {
    display: none;
  }

  .layout-header-show {
    display: block;

  }

  .layout-menu-hide {
    display: none;

  }

  .layout-menu-show {
    display: block;

  }
</style>

<template>

  <div class="layout">
    <div class="layout-ceiling" :class="{'layout-header-hide':isFullScreen,'layout-header-show':!isFullScreen}"
         :style="headerStyle">
      <div class="layout-ceiling-logo">
        <div class="layout-logo-left">
          <span style="font-size: 30px">
            Logger
          </span>
        </div>
      </div>
      <div class="layout-ceiling-main">
        <Menu mode="horizontal" theme="dark" :active-name="currentTop.name" style="background-color:transparent;"
              @on-select="topMenuClick">
          <div class="layout-nav">
            <Menu-item v-for="tm in topMenu" v-bind:name="tm.name">
              <Icon v-bind:type="tm.icon"></Icon>
              {{tm.text}}
            </Menu-item>
          </div>
        </Menu>
      </div>
    </div>
    <Row type="flex">
      <Col span="4" class="layout-card-menu"
           :class="{'layout-menu-hide':isFullScreen,'layout-menu-show':!isFullScreen}">
      <Card>
        <p>
        <div style="height: 550px;overflow: auto">
          <Menu :active-name="active_menu" width="auto" @on-select="routeTo" >
            <Menu-item v-for="lm in currentMenus" :name="lm.name">
              <Icon :type="lm.icon" size="14"></Icon>
              <span class="layout-text">{{lm.text}}</span>
            </Menu-item>
          </Menu>
        </div>
        </p>
      </Card>
      </Col>
      <i-col v-bind:span="contentSpan">
        <div class="layout-breadcrumb">
          <Row>
            <Col span="10">
            <Breadcrumb>
              <Breadcrumb-item>{{currentTop.text}}</Breadcrumb-item>
              <Breadcrumb-item>{{currentLeft.text}}</Breadcrumb-item>
            </Breadcrumb>
            </Col>
            <Col style="float: right">
            <i-button type="text" @click.native="toggleClick" style="padding: 0">
              <Icon v-bind:type="isFullScreen?'android-contract':'android-expand'" size="20"></Icon>
            </i-button>
            </Col>
          </Row>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <transition mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </i-col>
    </Row>
  </div>

</template>

<script>

  export default {

    data() {
      return {
        page: ['about', 'form', 'table', 'markdown-viewer', 'markdown-editor-1', 'markdown-editor-2', 'rtf', 'upload', 'echarts']
        , isFullScreen:
          (localStorage.getItem("isFullScreen")!=undefined&&localStorage.getItem("isFullScreen")=='true')?true:false
        , contentSpan: (localStorage.getItem("isFullScreen")!=undefined&&localStorage.getItem("isFullScreen")=='true')?24:20
        , topMenu: [
          {name: 'menu-log-request', icon: 'pull-request', text: '请求日志', color: '#607D8B'},
          {name: 'menu-log-opt', icon: 'ios-keypad', text: '操作日志', color: '#F4B400'},
          {name: 'menu-log-exception', icon: 'android-warning', text: '异常日志', color: '#DB4437'},
          {name: 'menu-setting', icon: 'settings', text: '设置', color: '#0F9D58'}
        ],
        leftMenu: {
          'menu-log-request': [
            {name: '/request/index', icon: 'stats-bars', text: '综合监控'},
            {name: '/request/module', icon: 'network', text: '模块监控'},
            {name: '/request/normal', icon: 'ios-list-outline', text:  '正常请求列表'},
            {name: 'table', icon: 'ios-list', text: '异常请求列表'},
          ],
          'menu-log-opt': [
            {name: 'form', icon: 'pull-request', text: '综合监控2'}
          ],
          'menu-log-exception': [
            {name: '1', icon: 'pull-request', text: '综合监控3'}
          ],
          'menu-setting': [
            {name: '1', icon: 'pull-request', text: '综合监控4'}
          ]
        },
        currentMenus: [],
        headerStyle: {
          background: '#607D8B',
        },
        currentTop: {},
        currentLeft: {}
      }
    },
    computed: {
      active_menu:function(){
        return window.location.hash.split('#')[1];
      }
    },
    methods: {
      toggleClick() {
        /*if (this.isFullScreen) {
          this.contentSpan = 20;
        } else {
          this.contentSpan = 24;
        }*/
        //this.isFullScreen = !this.isFullScreen;
        localStorage.setItem("isFullScreen",!this.isFullScreen);
        location.reload();
      },
      routeTo(e) {
        for (var i = 0; i < this.currentMenus.length; i++) {
          if (this.currentMenus[i].name == e) {
            this.currentLeft = this.currentMenus[i];
            break;
          }
        }
        this.$router.push(e);

      },
      topMenuClick: function (e) {
        this.currentMenus = this.leftMenu[e];
        for (var i = 0; i < this.topMenu.length; i++) {
          if (this.topMenu[i].name == e) {
            this.currentTop = this.topMenu[i];
            this.headerStyle.background = this.topMenu[i].color;
            break;
          }
        }
        this.currentLeft = this.currentMenus[0];
      },


    },
    created(){
      this.currentMenus = this.leftMenu[this.topMenu[0].name];
      this.currentLeft = this.currentMenus[0];
      this.currentTop = this.topMenu[0];
    }
  }

</script>
