<template>
  <el-col :span="12" :offset="6">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left" style="padding-top: 30px">
      <el-form-item label="选择司机" prop="driverId">
        <el-select style="width: 100%" v-model="form.driverId" placeholder="请选择">
          <el-option
            v-for="item in driverOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约时间" prop="orderedAt">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.orderedAt"
            value-format="timestamp"
            style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item  label="项目类型" prop="projectType">
        <el-select  style="width: 100%" v-model="form.projectType" placeholder="请选择项目类型">
          <el-option label="保养预约" value="1"></el-option>
          <el-option label="维修任务" value="2"></el-option>
          <el-option label="抢修任务" value="3"></el-option>
          <el-option label="拖车任务" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目描述" prop="projectDescp">
        <el-input type="textarea" v-model="form.projectDescp"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import requests from '../../common/api.js';
    export default {
      data () {
        return {
          form: {
            driverId: [],
            orderedAt: '',
            projectType: '',
            projectDescp: '',
          },
          driverOptions: [],
          rules: {
            driverId: [{
              required: true, message: '请选择司机', trigger: 'blur'
            }],
            orderedAt: [{
              required: true, message: '请选择预约时间', trigger: 'blur'
            }],
            projectType: [{
              required: true, message: '请选择项目类型', trigger: 'blur'
            }],
            projectDescp: [{
              required: true, message: '请输入项目描述', trigger: 'blur'
            }],
          }
        }
      },
      methods: {
        onSubmit (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              requests.AddOrder(this.userId, this.form.projectType, this.form, this).then( res => {
                this.$message.success('添加订单成功！');
              })
            } else {
              this.$message.warning('请输入完整信息');
            }
          })
        },
        resetForm (formName) {
          this.$refs[formName].resetFields();
        }
      },
      created () {
        this.$store.commit('SET_BREADCRUMBS', ['我的订单', '添加订单']);
        this.userId = this.$cookies.get('userId');

        requests.GetDrivers({}, this).then(res => {
          this.list = res.data.drivers.map(item => {
            return { value: item.id, label: item.driverName };
          });
          console.log(this.list);
          this.driverOptions = this.list;
        });
      }
    };
</script>

<style scoped>

</style>
