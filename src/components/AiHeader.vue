<template>
    <el-row>
      <el-col :span="8">
        <img src="http://p57uimjto.bkt.clouddn.com/web-logo-darkblue.png@65" height="50px"></img>
      </el-col>
      <el-col :span="16">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">我的门店</el-menu-item>
          <el-menu-item index="2">我的订单</el-menu-item>
          <el-menu-item index="3">我的账户</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">结算管理</a></el-menu-item>
          <el-menu-item index="5">用户管理</el-menu-item>
          <el-menu-item index="6">知识库</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ai-header"
    }
</script>

<style scoped>
  .el-header {
    background-color: white;
    border-bottom: 1px;
    color: #333;
    text-align: center;
    height: 100%;
  }
</style>
