<template>
    <div class="sign-box">
      <router-view></router-view>
      <el-form :model="registerForm" v-model="registerForm" :rules="rules" ref="registerForm" v-if="this.$route.path === '/register'">
        <div class="sign-header">
          注册
        </div>
        <el-form-item prop="phone">
          <el-input type="text" placeholder="手机号码" v-model="registerForm.phone" >
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input type="text" placeholder="验证码" v-model="registerForm.verifyCode" >
            <el-button slot="append" :disabled="!show" @click="getVerifyCode('registerForm')">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}} s</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="reservePhone">
          <el-input type="text" placeholder="备用手机号码" v-model="registerForm.reservePhone" >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="registerForm.password">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input type="password" placeholder="确认密码" v-model="registerForm.confirmPassword">
          </el-input>
        </el-form-item>
        <el-form-item prop="companyName">
          <el-input type="text" placeholder="服务网点" v-model="registerForm.companyName">
          </el-input>
        </el-form-item>
        <el-form-item prop="location">
          <el-input type="text" placeholder="网点地址" v-model="registerForm.location">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="register" @click="submitForm('registerForm')" style="width:100%" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
      <div class="sign-options">
        已有帐号？<span><router-link to="/login">去登录</router-link></span>
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
          requests.VerifyPhone({verifyPhone: value}, this).then(res => {
            if (res.data.phoneExist) {
              callback(new Error('手机号码已被注册'));
            } else {
              callback();
            }
          });
        }
      };
      let validateReservePhone = (rule, value, callback) => {
        if (!utils.verifyPhone(value))
          callback(new Error('手机号码输入格式不正确'));
        else
          callback();
      };
      let validateVerifyCode = (rule, value, callback) => {
        let params = {
          phone: this.registerForm.phone,
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
      let validateConfirmPassword = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          'phone': '',
          'verifyCode': '',
          'reservePhone': '',
          'password': '',
          'confirmPassword': '',
          'companyName': '',
          'location': '',
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
          reservePhone: [
            { required: true, message: '请输入备用手机号码', trigger: 'blur' },
            { validator: validateReservePhone, trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位数', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请输入服务网点', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '请输入网点位置', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('decrement');
            this.$router.push('/register/two');

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
              requests.GetSmsCode({phone: this.registerForm.phone}, this).then(res => {
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
