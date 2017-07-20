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
</style>
<template>
  <Card :class="classname">
    <p>
      <Row>
        <Col span="7">
        <Icon :type="icon" size="55" style="color: white"></Icon>
        </Col>
        <Col span="17">
        <span class="card-info-span-header">{{name}}</span><br>
        <strong class="card-info-span-content">
          {{value}}
        </strong>
        </Col>
      </Row>
    </p>
  </Card>
</template>
<script>

  export default {
    name:'card',
    props: [
      'icon',
      'name',
      'value',
      'classname'
    ]
  }
</script>
