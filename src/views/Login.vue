<template>
  <div>
    <div class="sign-header">
      登录
    </div>
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
          <el-button slot="append"><router-link :to="{ path: '/forgetPassword' }">忘记密码</router-link></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="login" @click="submitForm('loginForm')" style="width:100%" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="sign-options">
      没有帐号？<span><router-link :to="{ path: 'register' }">去注册</router-link></span>
    </div>
  </div>
  </div>
</template>

<script>
  import requests from '../common/api';
  import globalConfig from '../config';

  export default {
    data: () => {
      let validatePhone = (rule, value, callback) => {
        if (!/^[1][34578][0-9]{9}$/.test(value)) {
          callback(new Error('手机号码输入格式不正确'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          'phone': '',
          'password': ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
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
          this.$cookies.set('userId', data.userId, globalConfig.cookieExpire);
          this.$cookies.set('accessToken', data.accessToken, globalConfig.cookieExpire);
          this.$router.push('/index');
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
