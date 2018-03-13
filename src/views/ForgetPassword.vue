<template>
  <div>
    <div class="sign-header">
      找回密码
    </div>
  <div class="sign-box">
    <router-view></router-view>
    <el-form :model="forgetForm" v-model="forgetForm" :rules="rules" ref="forgetForm" v-if="this.$route.path === '/forgetPassword'">
      <el-form-item prop="phone">
        <el-input type="text" placeholder="手机号码" v-model="forgetForm.phone" >
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input type="text" placeholder="验证码" v-model="forgetForm.verifyCode" >
          <el-button slot="append" :disabled="!show" @click="getVerifyCode('forgetForm')">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} s</span>
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="bossName">
        <el-input type="text" placeholder="负责人真实姓名" v-model="forgetForm.bossName" >>
        </el-input>
      </el-form-item>
      <el-form-item prop="idCard">
        <el-input type="text" placeholder="负责人身份证号" v-model="forgetForm.idCard">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="forget" @click="submitForm('forgetForm')" style="width:100%" type="primary">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  import requests from '../common/api';
  import utils from '../common/utils';

  export default {
    // 不能用箭头函数
    data() {
      let validatePhone = (rule, value, callback) => {
        if (!utils.verifyPhone(value)) {
          callback(new Error('手机号码输入格式不正确'));
        } else {
          callback();
        }
      };
      let validateIdCard = (rule, value, callback) => {
        if (!utils.verifyIdCard(value)) {
          callback(new Error('身份证号输入格式不正确'));
        } else {
          callback();
        }
      };
      let validateVerifyCode = (rule, value, callback) => {
        let params = {
          phone: this.forgetForm.phone,
          smsCode: value
        };
        if (!this.$store.state.count) {
          requests.VerifySmsCode(params).then(res => {
            this.$store.dispatch('increment');
            callback();
          })
          .catch(error => {
            callback(new Error('验证码错误'));
          });
        } else {
          callback();
        }
      };
      return {
        forgetForm: {
          'phone': '',
          'verifyCode': '',
          'bossName': '',
          'idCard': '',
        },
        show: true,
        count: '',
        timer: null,
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: validateVerifyCode, trigger: 'blur' }
          ],
          bossName: [
            { required: true, message: '请输入负责人真实姓名', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请输入负责人身份证号', trigger: 'blur' },
            { validator: validateIdCard, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('decrement');
            this.$router.push('/forgetPassword/two');

            return true;
          } else {
            return false;
          }
        });
      },
      getVerifyCode(formName) {
        // 单独验证手机号码
        this.$refs[formName].validateField('phone', (error) => {
          // 验证成功
          console.log('validating');
          if (!error) {
            console.log('validating success');
            if (!this.timer) {
              // 获取验证码
              requests.GetSmsCode({phone: this.forgetForm.phone}).then(res => {
                console.log(res);
                this.count = 60;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= 60) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              });
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
