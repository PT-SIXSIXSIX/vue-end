<template>
  <el-col :span="12" :offset="5" style="padding-top: 25px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="开户人真实姓名" prop="ownerName">
        <el-input v-model="form.ownerName"></el-input>
      </el-form-item>
      <el-form-item label="开户人身份证号码" prop="ownerIdCard">
        <el-input v-model="form.ownerIdCard"></el-input>
      </el-form-item>
      <el-form-item label="银行卡账号" prop="cardId">
        <el-input v-model="form.cardId"></el-input>
      </el-form-item>
      <el-form-item label="请选择银行及类型" required>
        <el-col :span="11">
          <el-form-item prop="bankName">
            <el-select v-model="form.bankName" placeholder="请选择银行">
              <el-option
                v-for="item in bankOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-tiem pro="type">
            <el-select v-model="form.type" placeholder="请选择银行卡类型">
              <el-option
                v-for="item in cardOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-tiem>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import requests from '../../common/api';
  export default {
    data() {
      return {
        form: {
          ownerName: '',
          ownerIdCard: '',
          cardId: '',
          bankName: '',
          type: ''
        },
        rules: {
          ownerName: [{ required: true, message: '请输入开户人真实姓名', trigger: 'blur'}],
          ownerIdCard: [{ required: true, message: '请输入开户人身份证号码', trigger: 'blur'}],
          cardId: [{ required: true, message: '请输入银行卡账号', trigger: 'blur'},
            {}],
          bankName: [{ required: true, message: '请选择银行', trigger: 'blur'}],
          type: [{ required: true, message: '请选择银行卡类型', trigger: 'blur'}],
        },
        bankOptions: [
          {
            value: '中国工商银行',
            label: '中国工商银行'
          }, {
            value: '中国农业银行',
            label: '中国农业银行'
          }, {
            value: '中国银行',
            label: '中国银行'
          }, {
            value: '中国建设银行',
            label: '中国建设银行'
          }, {
            value: '中国邮政储蓄银行',
            label: '中国邮政储蓄银行'
          }, {
            value: '交通银行',
            label: '交通银行'
          },
        ],
        cardOptions: [{
          value: '借记卡',
          label: '借记卡'
        },{
          value: '信用卡',
          label: '信用卡'
        }],
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requests.AddBankCard(this.userId, this.form, this).then( res => {
              this.$alert('添加银行卡成功！', '成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/index/account/bankCardList');
                }
              });
            });
          } else {
            this.$message.error('请输入正确信息');
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.bankName = '';
        this.form.type = '';
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的账户', '添加银行卡']);
      this.userId = this.$cookies.get('userId');
    },
  };
</script>

<style lang="scss">

</style>

