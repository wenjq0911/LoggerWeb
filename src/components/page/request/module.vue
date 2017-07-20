<style scoped>

.card-info{
  margin: 10px 0px 10px 0px;
}
.card-info-middle{
  margin: 0px 0px 10px 0px;
}
.card-moduleinfo-title{
  text-align: left;
}
.card-moduleinfo-row{
  border-bottom: dashed 1px #DDD;
  margin:5px
}
</style>
<template>
  <div>
    <Card class="card-info">
      <p>
        <Row>
          <Col span="20">
            <Cascader :data="data"  change-on-select placeholder="请选择模块" ></Cascader>
          </Col>
          <Col span="1">&nbsp;</Col>
          <Col span="3">
            <Button type="primary"  icon="ios-search">搜索</Button>
          </Col>
        </Row>
      </p>
    </Card>
    <Row>
      <Col span="6">
        <Card class="card-info-middle">
          <p slot="title">
            模块基本信息
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">名称:</Col>
              <Col span="12">home</Col>
            </Row>
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">所在区域:</Col>
              <Col span="12">admin</Col>
            </Row>
          </p>

          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">总请求数量:</Col>
              <Col span="12">1000 次</Col>
            </Row>
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">总异常数量:</Col>
              <Col span="12">111 次</Col>
            </Row>
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">当日请求数量:</Col>
              <Col span="12">16 次</Col>
            </Row>
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">当日异常数量:</Col>
              <Col span="12">1 次</Col>
            </Row>
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">平均处理时间:</Col>
              <Col span="12">100 ms</Col>
            </Row>
          </p>
          <p>
            <Row class="card-moduleinfo-row">
              <Col span="12" class="card-moduleinfo-title">平均渲染时间:</Col>
              <Col span="12">200 ms</Col>
            </Row>
          </p>

        </Card>
      </Col>
      <Col span="18">
        <Card class="card-info-middle">
          <p slot="title">
            月度请求趋势
          </p>
          <p>

          </p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }]
      }
    }
  }
</script>
