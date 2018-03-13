<template>
  <el-form :model="forgetTwoForm" :rules="rules" ref="forgetTwoForm">
    <div class="sign-header">
      重置密码
    </div>
    <el-form-item prop="password">
      <el-input type="password" placeholder="密码" v-model="forgetTwoForm.password">
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input type="password" placeholder="确认密码" v-model="forgetTwoForm.confirmPassword">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button id="forget-two" @click="submitForm('forgetTwoForm')" style="width:100%" type="primary">找回密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import requests from '../common/api';
  import utils from '../common/utils'

  export default {
    data() {
      let validateConfirmPassword = (rule, value, callback) => {
        if (value !== this.forgetTwoForm.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        forgetTwoForm: {
          'password': '',
          'confirmPassword': '',
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位数', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.resetPassword();
          } else {
            return false;
          }
        });
      },
      resetPassword() {
        let forgetForm = utils.filterByKeys(
          Object.assign(this.forgetTwoForm, this.$parent.forgetForm),
          ['verifyCode', 'confirmPassword']
        );
        requests.forgetPassword(forgetForm, this).then(res => {
          this.$message.success('找回密码成功');
          this.$router.push('/login');
        });
      }
    },
    mounted() {
      console.log('yes');
      document.getElementsByClassName('sign-header').innerHTML = '重置密码';
    }
  }
</script>


<style lang="scss">

</style>
