<template>
  <div class="sign-box">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
      <el-form-item prop="phone">
        <el-input type="text" placeholder="手机号码" v-model="loginForm.phone" >
          <i
            class="fa fa-user el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="loginForm.password">
          <i
            class="fa fa-lock el-input__icon"
            slot="prefix">
          </i>
          <el-button slot="append"><router-link :to="{ path: 'home' }">忘记密码</router-link></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="login" @click="submitForm('loginForm')" style="width:100%" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="sign-options">
      没有帐号？<span><router-link :to="{ path: 'home' }">去注册</router-link></span>
    </div>
  </div>
</template>

<script>
  import requests from '../common/api';
  import globalConfig from '../config';

  export default {
    data: () => {
      let validateIdCard = (rule, value, callback) => {
        if (!/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          callback(new Error('身份证号输入格式不正确'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          'name': '',
          'idCard': '',
          'picHead': '',
          'picTail': '',
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
          console.log(valid);
          if (valid) {
            this.login();

            return true;
          } else {
            return false;
          }
        });
      },
      login() {
        requests.Login(this.loginForm).then(res => {
          let data = res.data;
          if (res.status !== 200) {
            this.$message({
              message: data.errorDesc,
              type: 'error'
            });
            return false;
          } else {
            this.$cookies.set('userId', data.userId, globalConfig.cookieExpire);
            this.$cookies.set('accessToken', data.accessToken, globalConfig.cookieExpire);
            this.$router.push('/home');
          }
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
