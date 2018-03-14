<template>
  <el-form :model="registerTwoForm" :rules="rules" ref="registerTwoForm">
    <div class="sign-header">
      注册
    </div>
    <el-form-item prop="name">
      <el-input type="text" placeholder="负责人真实姓名" v-model="registerTwoForm.name" >>
      </el-input>
    </el-form-item>
    <el-form-item prop="idCard">
      <el-input type="text" placeholder="负责人身份证号" v-model="registerTwoForm.idCard">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-form-item prop="picHeadUrl">
          <el-upload
            name="image"
            class="image-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleHeadImageSuccess"
            :before-upload="beforeImageUpload">
            <img v-if="registerTwoForm.picHeadUrl" :src="registerTwoForm.picHeadUrl" class="image">
            <i v-else class="el-icon-plus image-uploader-icon"></i>
            <div class="el-upload__text">身份证正面照</div>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2"></el-col>
      <el-col :span="11">
        <el-form-item prop="picTailUrl">
          <el-upload
            name="image"
            class="image-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleTailImageSuccess"
            :before-upload="beforeImageUpload">
            <img v-if="registerTwoForm.picTailUrl" :src="registerTwoForm.picTailUrl" class="image">
            <i v-else class="el-icon-plus image-uploader-icon"></i>
            <div class="el-upload__text">身份证反面照</div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item prop="serviceType">
      <el-input type="text" placeholder="服务类型" v-model="registerTwoForm.serviceType" >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button id="login" @click="submitForm('registerTwoForm')" style="width:100%" type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import requests from '../common/api';
  import utils from '../common/utils';
  import globalConfig from '../config';

  export default {
    data: () => {
      let validateIdCard = (rule, value, callback) => {
        if (!utils.verifyIdCard(value)) {
          callback(new Error('身份证号输入格式不正确'));
        } else {
          callback();
        }
      };
      return {
        uploadUrl: globalConfig.nodeJsUrl + '/images',
        registerTwoForm: {
          'name': '',
          'idCard': '',
          'picHeadUrl': '',
          'picTailUrl': '',
          'serviceType': ''
        },
        rules: {
          name: [
            { required: true, message: '请输入负责人真实姓名', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请输入负责人身份证号', trigger: 'blur' },
            { validator: validateIdCard, trigger: 'blur' }
          ],
          picHead: [
            { required: true, message: '请上传身份证正面照', trigger: 'blur' },
          ],
          picTail: [
            { required: true, message: '请上传身份证反面照', trigger: 'blur' },
          ],
          serviceType: [
            { required: true, message: '请输入服务类型', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.registerTwoForm.picHeadUrl || !this.registerTwoForm.picTailUrl) {
              this.$message.error('请上传身份证正面照和反面照');
              return false;
            } else {
              this.register();
              return true;
            }
          } else {
            return false;
          }
        });
      },
      register() {
        let registerForm = utils.filterByKeys(
          Object.assign(this.registerTwoForm, this.$parent.registerForm),
          ['verifyCode', 'confirmPassword']
        );
        console.log(registerForm);
        requests.Register(registerForm, this).then(res => {
          let data = res.data;
          this.$cookies.set('userId', data.userId, globalConfig.cookieExpire);
          this.$cookies.set('accessToken', data.accessToken, globalConfig.cookieExpire);
          this.$router.push('/index');
        });
      },
      handleHeadImageSuccess(res, file) {
        this.registerTwoForm.picHeadUrl = res.url;
      },
      handleTailImageSuccess(res, file) {
        this.registerTwoForm.picTailUrl = res.url;
      },
      beforeImageUpload(file) {
        const isAllowed = globalConfig.allowedImageType.indexOf(file.type) >= 0;
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isAllowed) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isAllowed && isLt2M;
      }
    }
  }
</script>

<style lang="scss">
  $width: 150px;
  $height: 140px;

  .image-uploader .el-upload {
    margin-left: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: $width;
    height: $height;
    line-height: $height;
    text-align: center;
  }
  .image {
    width: $width;
    height: $height;
    display: block;
  }
</style>
