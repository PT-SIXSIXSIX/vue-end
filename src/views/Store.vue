<template>
  <el-col :span="12" :offset="6">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small" label-position="left" style="padding-top: 10px">
      <el-form-item label="门店名" prop="companyName">
        <el-input type="text" v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="门店位置" prop="location">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="店主姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店主手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="备用手机号" prop="reserverPhone">
        <el-input v-model="form.reservePhone"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="门店服务项目" prop="serviceType">
        <el-input v-model="form.serviceType"></el-input>
      </el-form-item>
      <el-form-item label="身份证照片">
        <el-col :span="12">
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
        <el-col :span="12">
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
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import requests from '../common/api';
  import globalConfig from '../config';
  import utils from '../common/utils';
  export default {
    beforeCreate (){
    },
    data() {
      let validateIdCard = (rule, value, callback) => {
        if (!utils.verifyIdCard(value)) {
          callback(new Error('身份证号输入格式不正确'));
        } else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (!utils.verifyPhone(value)) {
          callback(new Error('手机号码输入格式不正确'));
        } else {
          callback();
          requests.VerifyPhone({verifyPhone: value}).then(res => {
            if (res.data.phoneExist) {
              callback(new Error('手机号码已被注册'));
            } else {
              callback();r
            }
          });
        }
      };
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
        rules: {
          companyName: [
            { required: true, message: '请输入门店名', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '请输入门店位置', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入店主姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入店主手机号', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          reservePhone: [
            { required: true, message: '请输入备用手机号', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            {validator: validateIdCard, trigger: 'blur'}
          ],
          serviceType: [
            { required: true, message: '请输入门店服务项目', trigger: 'blur' }
          ]
        },
        uploadUrl: globalConfig.nodeJsUrl + '/images'
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requests.PutStoreInfo(this.userId, this.form, this).then(res => {
              this.$message.success('保存成功');
            });
          } else {
            this.$message.error('请输入正确信息');
          }
        });
      },
      resetForm(formName) {
        this.form = this.oldForm;
      },
      handleHeadSuccess(res) {
        this.picHeadUrl = res.url;
        this.form.picHeadUrl = res.url;
        this.$message.success('上传成功!');
      },
      beforeHeadUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG || isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
      handleTailSuccess(res) {
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
      handleError () {
        this.$message.error('图片上传失败');
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的门店', '门店信息']);

      this.userId = this.$cookies.get('userId');
      requests.GetStoreInfo(this.userId, {}, this).then(res => {
        this.oldForm = JSON.parse(JSON.stringify(res.data));
        this.form = JSON.parse(JSON.stringify(res.data));
      })
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
