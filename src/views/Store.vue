<template>
  <el-col :span="16" :offset="4">
    <el-form ref="form" :model="form" label-width="100px" size="small" label-position="left" style="padding-top: 20px">
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
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleHeadSuccess"
            :on-error="handleError"
            :before-upload="beforeHeadUpload">
            <img v-if="form.picHeadUrl" :src="form.picHeadUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__text">身份证正面照</div>
          </el-upload>
        </el-col>
        <el-col :span="11">
          <el-upload
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleTailSuccess"
            :on-error="handleError"
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
</template>

<script>
  import requests from '../common/api';
  import globalConfig from '../config';
  export default {
    beforeCreate (){
    },
    data() {
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
        uploadUrl: globalConfig.nodeJsUrl + '/images'
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        requests.PutStoreInfo(this.userId, this.form);
      },
      resetForm(formName) {
        console.log('reset:', this.oldForm);
        this.form = this.oldForm;
      },
      handleHeadSuccess(res, file) {
        this.picHeadUrl = res.url;
        this.form.picHeadUrl = res.url;
        this.$message.success('上传成功!');
      },
      beforeHeadUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt5M;
      },
      handleTailSuccess(res, file) {
        this.picTailUrl = res.url;
        this.form.picTailUrl = res.url;
        this.$message.success('上传成功!');
      },
      beforeTailUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!(isJPG || isPNG)) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
      handleError (err) {
        this.$message.error('图片上传失败');
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的门店', '门店信息']);

      this.userId = this.$cookies.get('userId');
      requests.GetStoreInfo(this.userId).then(res => {
        this.oldForm = JSON.parse(JSON.stringify(res.data));
        this.form = JSON.parse(JSON.stringify(res.data));
      })
        .catch(error => {
          this.$message.error('获取门店信息失败');
        });
    }
  }
</script>

<style lang="scss">

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
