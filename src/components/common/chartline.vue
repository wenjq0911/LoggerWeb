<style scoped>
  .content {
    /*自行添加样式即可*/
  }
</style>
<template>
  <div class="content">
    <div :id="chartName"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        // 初始化空对象
        chart: null
      }
    },
    methods: {
      // 绘图
      drawGraph(id) {
        // 绘图方法
        document.getElementById(id).style.height=this.chartHeight;
        this.chart = echarts.init(document.getElementById(id));
        // 皮肤添加同一般使用方式
        this.chart.showLoading()
        // set
        this.chart.setOption({
          title: {
            text: this.chartTitle
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:this.chartData.legend
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              magicType: {type: ['line', 'bar']},
              restore: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.chartData.x
          },
          yAxis: {
            type: 'value'
          },
          series:this.chartData.series
        })
        this.chart.hideLoading()
      },
      resize(){
        this.chart.resize();
      }
    },
    mounted() {
      var self = this;
      this.$nextTick(function() {
        this.$on('drawGraph', function () {
          this.drawGraph(self.chartName)
        })
        this.$on('resize', function () {
          this.resize()
        })
      })
    },
    props: [
      'chartData',
      'chartTitle',
      'chartName',
      'chartHeight'
    ]
  }
</script>
