<style scoped>
  .card-info {
    margin: 0px 20px 0px 20px;
  }

  .card-info-span-header {
    color: #DDD;
    font-size: 10px;
  }

  .card-info-span-content {
    color: #FFF;
    font-size: 25px;

  }

  .card-theme-green {
    background-color: #4CAF50;
  }

  .card-theme-warn {
    background-color: #FF9800;
  }

  .card-theme-blue {
    background-color: #2196F3;
  }

  .card-theme-normal {
    background-color: #607D8B;
  }
  .card-info-chart{
    margin: 10px 0px 10px 0px;
  }
  .card-info-chart-middle{
    margin: 0px 0px 10px 0px;
    width:100%
  }

</style>
<template>
  <div style="min-height:550px;overflow:auto;height: 100%">
    <Row>
      <Col span="6" class="card-info-left">
        <card name="当日请求数(次)" :value="NumModel.num_today" icon="ios-pulse" classname="card-theme-normal"></card>
      </Col>
      <Col span="6" class="card-info-center">
        <card name="总请求数(次)" :value="NumModel.num_all" icon="ios-pulse-strong" classname="card-theme-warn"></card>
      </Col>
      <Col span="6" class="card-info-center">
        <card name="平均处理时间(ms)" :value="NumModel.avg_action_time" icon="clock" classname="card-theme-blue"></card>
      </Col>
      <Col span="6" class="card-info-right">
        <card name="平均渲染时间(ms)" :value="NumModel.avg_render_time" icon="load-a" classname="card-theme-green"></card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card class="card-info-chart">
          <p slot="title">
            月度请求数量趋势
          </p>
          <p>
            <chart-line ref="requestLine" chart-name="requestLine" chart-title="" :chart-data="requestLine" chart-height="300px"></chart-line>
          </p>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <Card class="card-info-chart-middle">
          <p slot="title">
            请求数量占比
          </p>
          <p>
            <chart-pie ref="requestComperPie" chart-name="requestComperPie" chart-title="" :chart-data="requestPie" chart-height="300px"></chart-pie>
          </p>
        </Card>
      </Col>
      <Col span="12">
      <Card class="card-info-chart-middle">
        <p slot="title">
          浏览器数量占比
        </p>
        <p>
          <chart-pie ref="requestBrowserPie" chart-name="requestBrowserPie" chart-title="" :chart-data="requestPie" chart-height="300px"></chart-pie>
        </p>
      </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card class="card-info-chart-middle">
          <p slot="title">
            请求最频繁的模块
          </p>
          <p>
            <Table stripe :columns="frequent.col" :data="frequent.data"></Table>
          </p>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <Card class="card-info-chart-middle">
        <p slot="title">
          最易出错的模块
        </p>
        <p>
          <Table stripe :columns="exception.col" :data="exception.data"></Table>
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export  default {
    data(){
      return {
        NumModel:{
          num_today:0,
          num_all:0,
          avg_action_time:0,
          avg_render_time:0
        },
        requestLine:{
          legend:['正常请求数量','异常请求数量'],
          series:[
            {
              name:'正常请求数量',
              type:'line',
              data:[],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            },
            {
              name:'异常请求数量',
              type:'line',
              data:[],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            }
          ],
          x:[]
        },
        requestPie:{
          legend:[],
          series:[
            {
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        frequent:{
          col:[
            {title:'区域',key:'area'},
            {title:'控制器',key:'controller'},
            {title:'总请求数量',key:'count'},
          ],
          data:[]
        },
        exception:{
          col:[
            {title:'区域',key:'area'},
            {title:'控制器',key:'controller'},
            {title:'总请求数量',key:'count'},
            {title:'异常数量',key:'count'}
          ],
          data:[]
        }
      }
    },
    methods:{
      initNum:function(){
        var self=this;
        this.$http.get(process.env.API_ROOT+'/request/RequestCount').then((res)=>{
          self.NumModel = res.data;
        });
      },
      initReqLine:function(){
        var self=this;
        this.$http.get(process.env.API_ROOT+'/request/ReuqestLineMonth').then((res)=>{
          self.requestLine.series[0].data=res.data.normal.values;
          self.requestLine.series[1].data=res.data.exception.values;
          self.requestLine.x=res.data.normal.keys;
          self.$refs.requestLine.$emit('drawGraph');
        });
      },
      initReqPieComper:function(){
        var self=this;
        this.$http.get(process.env.API_ROOT+'/request/RequestComper').then((res)=>{
          var arr = [
            {value:res.data.normal,name:'正常请求数量'},
            {value:res.data.exception,name:'异常请求数量'}
          ];
          var l = ['正常请求数量','异常请求数量'];
          self.requestPie.series[0].data=arr;
          self.requestPie.legend = l;
          self.$refs.requestComperPie.$emit('drawGraph');
        });
      },
      initReqPieBrower:function(){
        var self=this;
        this.$http.get(process.env.API_ROOT+'/request/RequestBrowser').then((res)=>{
          var arr = res.data.datas;
          var l = res.data.legend;
          self.requestPie.series[0].data=arr;
          self.requestPie.legend = l;
          self.$refs.requestBrowserPie.$emit('drawGraph');
        });
      },
      resize(){
        this.$refs.requestLine.$emit('resize');
        this.$refs.requestComperPie.$emit('resize');
        this.$refs.requestBrowserPie.$emit('resize');
      },
      initFrequent:function(){
        var self=this;
        this.$http.get(process.env.API_ROOT+'/request/RequestFrequent').then((res)=>{
          self.frequent.data=res.data;
        });
      }
    },
    created(){
      this.initNum();
      this.initReqLine();
      this.initReqPieComper();
      this.initReqPieBrower();
      this.initFrequent();
    },
    components: {
      card: require('../../common/card.vue'),
      chartLine: require('../../common/chartline.vue'),
      chartPie: require('../../common/chartpie.vue')
    },
    mounted(){
      var self=this;
      window.onresize = function temp() {
        self.resize()
      };
      this.$nextTick(function() {
        this.$on('resize', function () {
          this.resize()
        })
      })
    }
  }
</script>
