<style scoped>
  .card-info{
    margin: 10px 0px 10px 0px;
  }
  .card-info-middle{
    margin: 0px 0px 10px 0px;
    width:100%
  }
</style>
<template>
  <div>
    <Card class="card-info">
      <p>
            <Select v-model="select_conditions" placeholder="查询类型"  multiple style="width:300px">
              <Option v-for="item in conditions" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
            <Input v-model="search_text"  placeholder="查询关键字" style="width: 200px"></Input>
            <Date-picker type="date"  v-model="search_date_s" placeholder="日志开始日期" style="width: 200px"></Date-picker>
            <Date-picker type="date" v-model="search_date_e" placeholder="日志结束日期" style="width: 200px"></Date-picker>
            <Button type="primary"  icon="ios-search">搜索</Button>
      </p>
    </Card>
    <Card class="card-info-middle">
      <p>
        <Table :data="tableData1" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="total" :current="current" @on-change="changePage"></Page>
          </div>
        </div>
      </p>
    </Card>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        tableData: [],
        tableColumns: [
          {
            title: '客户端IP',
            key: 'ip'
          },
          {
            title: '区域',
            key: 'area'
          },
          {
            title: '控制器',
            key: 'controller'
          },
          {
            title: '方法',
            key: 'action'
          },
          {
            title: '请求时间',
            key: 'log_time',
            render: (h, params) => {
              return h('div', this.formatDate(params));
            }
          },{
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      //this.show(params.index)
                    }
                  }
                }, '详细'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      //this.remove(params.index)
                    }
                  }
                }, '关联的操作日志')
              ]);
            }
          }
        ],
        total:0,
        current:1,
        select_conditions:[],
        conditions:[
          {
            label: 'IP',
            value: 'IP地址'
          },{
            label: '区域',
            value: 'Area'
          },{
            label: '控制器',
            value: 'Controller'
          },{
            label: '方法',
            value: 'Action'
          },{
            label: '浏览器',
            value: 'Browser'
          },{
            value: 'Type',
            label: '请求方式'
          }
        ],
        search_text:"",
        search_date_s:"",
        search_date_e:""

      }
    },
    methods: {
      formatDate (date) {
        return date;
      },
      changePage () {

      }
    }
  }
</script>
