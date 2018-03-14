<template>
  <el-col :span="12" :offset="4">
    <el-form ref="staffForm" :rules="rules" :model="staffForm" label-width="120px" label-position="left" style="padding-top: 20px">
      <el-form-item label="店员姓名" prop="name">
        <el-input type="text" v-model="staffForm.name"></el-input>
      </el-form-item>
      <el-form-item label="店员手机号码" prop="phone">
        <el-input type="text" v-model="staffForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="staffForm.password">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="staffForm.confirmPassword">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('staffForm')">添加</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import requests from '../../common/api';
  import utils from '../../common/utils'

  export default {
    data() {
      let validatePhone = (rule, value, callback) => {
        if (!utils.verifyPhone(value)) {
          callback(new Error('手机号码输入格式不正确'));
        } else {
          callback();
        }
      };
      let validateConfirmPassword = (rule, value, callback) => {
        if (value !== this.staffForm.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        userId: this.$cookies.get('userId'),
        staffForm: {
          name: '',
          phone: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入店员真实姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入店员手机号码', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ],
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
            this.addStaff();
            return true;
          } else {
            return false;
          }
        });
      },
      addStaff() {
        let sForm = utils.filterByKeys(this.staffForm, ['confirmPassword']);
        requests.AddStaff(this.userId, sForm, this).then(res => {
          if (res) {
            this.$message.success('添加成功');
            this.$router.push('/index/staffList');
          }
        });
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['店员管理', '添加店员']);

    }
  }
</script>

<style lang="scss">

</style>
