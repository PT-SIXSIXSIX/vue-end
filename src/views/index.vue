<template>
  <el-container class="index-container">
    <ai-aside></ai-aside>
    <el-container>
      <el-header>
        <div class="container-fluid">
          <div class="fl">
            后台管理系统
          </div>
          <div class="fr">
            管理员&nbsp;<i class="fa fa-sign-out" aria-hidden="true" style="color: #409EFF"></i>
          </div>
        </div>
      </el-header>
      <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="breadcrumb in $store.state.breadcrumbs"
                            :key="breadcrumb">
          {{ breadcrumb }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/

    .main-content {
      /*margin:10px 10%;*/
      /*padding: 20px 0;*/
      width: 100%;
    }
  }

  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    min-height: 45px;
    border-bottom: 1px solid #e6e9f0;
    padding-left: 9px;

    .container-fluid {
      padding: 0 30px 0 10px;
    }
  }
</style>
