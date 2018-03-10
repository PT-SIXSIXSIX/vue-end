<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="http://p57uimjto.bkt.clouddn.com/ykiat/logo.png@65" height="50px"></img>
        </el-col>
        <el-col :span="16">
          <el-menu :default-active="1"  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="inherit" text-color="white" active-text-color="#409EFF">
            <el-menu-item index="1">我的门店</el-menu-item>
            <el-menu-item index="2">我的订单</el-menu-item>
            <el-menu-item index="3">我的账户</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">结算管理</a></el-menu-item>
            <el-menu-item index="5">用户管理</el-menu-item>
            <el-menu-item index="6">知识库</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="inherit"
            text-color="white"
          >
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title">门店信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">信息修改</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-main>
        <el-col :span="12" :offset="6">
          <el-form ref="form" :model="form" label-width="100px" size="small" label-position="left">
            <el-form-item label="门店名">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="门店位置">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="店主姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="店主手机号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备用手机号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="门店服务项目">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证照片">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="门店营业执照">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss">
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-container {
    /*margin-bottom: 40px;*/
    height: 92vh;
  }

  .home-footer {
    bottom: 0px;
    background-color: #DCDFE6;
    height: 4vh;
  }

  .el-menu-item i{
    color: white;
  }

  .el-form {
    margin-top: 5%;
    /*background-color: white;*/
    padding: 5%;
    border-radius: 4px;
  }
</style>
