<template>
  <el-aside>
    <div class="logo-wrapper">
      <img src="http://p57uimjto.bkt.clouddn.com/ykat/web-logo.png"/>
    </div>
    <el-col class="nav-item">
      <el-menu
        default-active="/index/store"
        :router="router"
        class="nav-menu-vertical">
        <el-menu-item index="/index/store">
          <i class="fa fa-university"></i>
          <span slot="title">我的门店</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="fa fa-truck"></i>
            <span>我的订单</span>
          </template>
          <el-menu-item index="/index/order/addOrder">添加订单</el-menu-item>
          <el-menu-item index="/index/order/maintainOrder">保养预约</el-menu-item>
          <el-menu-item index="/index/order/maintainTask">维修任务</el-menu-item>
          <el-menu-item index="/index/order/recoveryTask">抢修任务</el-menu-item>
          <el-menu-item index="/index/order/trailTask">拖车任务</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="fa fa-google-wallet"></i>
            <span>我的账户</span>
          </template>
          <el-menu-item index="/index/account/bankCardList">银行卡</el-menu-item>
          <el-menu-item index="/index/account/depositList">保证金</el-menu-item>
          <el-menu-item index="/index/account/moneyRecord">收账记录</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="fa fa-users"></i>
            <span>店员管理</span>
          </template>
          <el-menu-item index="/index/staffList">店员列表</el-menu-item>
          <el-menu-item index="/index/addStaff">添加店员</el-menu-item>
        </el-submenu>
        <el-menu-item index="/index/settleList">
          <i class="fa fa-money"></i>
          <span slot="title">结算管理</span>
        </el-menu-item>
        <el-menu-item index="/index/articleList">
          <i class="fa fa-book"></i>
          <span slot="title">知识库管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
  export default {
    data() {
      return {
        router: true
      };
    }
  }
</script>

<style lang="scss">
  .el-aside {
    width: 240px !important;
    background-color: #f5f7fa;
    color: #2f3033;

    * {
      font-size: 15px !important;
    }

    .logo-wrapper {
      line-height: 90px;
      text-align: center;

      img {
        width: 70px;
        height: 80px;
        vertical-align: middle;
      }
    }

    .nav-menu {
      width: inherit !important;
    }

    .el-menu {
      padding-left: 20px !important;
      background-color: inherit !important;
      border-right: none !important;
    }
  }

</style>

