<template>
  <el-container>
    <el-header>
      <ai-header></ai-header>
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
            style=""
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
              <el-input type="text" v-model="form.companyName"></el-input>
            </el-form-item>
            <el-form-item label="门店位置">
              <el-input v-model="form.location"></el-input>
            </el-form-item>
            <el-form-item label="店主姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="店主手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="备用手机号">
              <el-input v-model="form.reservePhone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.idCard"></el-input>
            </el-form-item>
            <el-form-item label="门店服务项目">
              <el-input v-model="form.serviceType"></el-input>
            </el-form-item>
            <el-form-item label="身份证照片">
              <el-col :span="11">
                <el-upload
                  action="http://localhost:8081/api/v1/images/"
                  name="image"
                  :show-file-list="false"
                  :on-success="handleHeadSuccess"
                  :before-upload="beforeHeadUpload">
                  <img v-if="form.picHeadUrl" :src="form.picHeadUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__text">身份证正面照</div>
                </el-upload>
              </el-col>
              <el-col :span="11">
                <el-upload
                  action="http://localhost:8081/api/v1/images/"
                  name="image"
                  :show-file-list="false"
                  :on-success="handleTailSuccess"
                  :before-upload="beforeTailUpload">
                  <img v-if="form.picTailUrl" :src="form.picTailUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div class="el-upload__text">身份证反面照</div>
                </el-upload>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import requests from '../common/api';
  export default {
    beforeCreate (){
      let userId = 1;
      let storeData = {};
      requests.GetStoreInfo(userId).then(res => {
        this.oldForm = JSON.parse(JSON.stringify(res.data));
        this.form = JSON.parse(JSON.stringify(res.data));
      })
        .catch(error => {
          this.$message.error(error.response.data.errorDesc);
        });
    },
    data() {
      // var userId = window.$cookies.get('userId');
      return {
        form: {
          companyName: '',
          phone: '',
          reservePhone: '',
          idCard: '',
          picHeadUrl: '',
          picTailUrl: '',
          location: '',
          serviceType: '',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        var userId = 1;
        requests.PutStoreInfo(userId, this.form);
      },
      resetForm(formName) {
        console.log('reset:', this.oldForm);
        this.form = this.oldForm;
      },
      handleHeadSuccess(res, file) {
        this.picHeadUrl = res.url;
        console.log(res.url);
        this.form.picHeadUrl = res.url;
      },
      beforeHeadUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleTailSuccess(res, file) {
        this.picTailUrl = res.url;
        this.form.picTailUrl = res.url;
      },
      beforeTailUpload(file) {
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
  .el-aside {
    background-image: url('http://p57uimjto.bkt.clouddn.com/aside.png@65');
    background-size:100% 100%;
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-main {
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-menu {
    border-right: 0;
  }

  .el-container {
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
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }
</style>
