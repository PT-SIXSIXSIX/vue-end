<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="http://p57uimjto.bkt.clouddn.com/web-logo-darkblue.png@65" height="50px"></img>
        </el-col>
        <el-col :span="16">
          <el-menu :default-active="1"  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="inherit" text-color="#203f65" active-text-color="#409EFF">
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
              <el-upload
                action="http://localhost:8081/api/v1/images/"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="el-upload__text">身份证照片</div>
              </el-upload>
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
          desc: '',
        },
        imageUrl: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style lang="scss">
  .el-header {
    background-color: white;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-aside {
    background-color: #203f65;
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

  .el-menu {
    border-right: 0;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
