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
        <el-select  style="width: 100%" v-model="form.projectType" placeholder="请选择项目类型" @change="onChange">
          <el-option label="保养预约" value="1"></el-option>
          <el-option label="维修任务" value="2"></el-option>
          <el-option label="抢修任务" value="3"></el-option>
          <el-option label="拖车任务" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目内容" prop="projectId">
        <el-select style="width: 100%" v-model="form.projectId" placeholder="请选择">
          <el-option
            v-for="item in descpOptions"
            :key="item.id"
            :label="item.descp"
            :value="item.id">
          </el-option>
        </el-select>
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
            projectId: '',
          },
          driverOptions: [],
          descpOptions: [],
          descpData: [],
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
            projectId: [{
              required: true, message: '请输入项目描述', trigger: 'blur'
            }],
          }
        }
      },
      methods: {
        onSubmit (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let tmpType = this.form.projectType;
              delete this.form.projectType;
              requests.AddOrder(this.userId, tmpType, this.form, this).then( res => {
                this.$message.success('添加订单成功！');
              })
            } else {
              this.$message.warning('请输入完整信息');
            }
          })
        },
        resetForm (formName) {
          this.$refs[formName].resetFields();
        },
        onChange (value) {
          this.descpOptions = this.descpData[value];
          console.log(value, this.descpOptions, this.descpData);
        }
      },
      created () {
        this.$store.commit('SET_BREADCRUMBS', ['门店管理', '添加订单']);
        this.userId = this.$cookies.get('userId');

        requests.GetDrivers({}, this).then(res => {
          this.list = res.data.drivers.map(item => {
            return { value: item.id, label: item.driverName };
          });
          console.log(this.list);
          this.driverOptions = this.list;
        });

        requests.GetProjects(this.userId, {}, this).then(res => {
          let tmpData = {1: [], 2: [], 3: [], 4: []};
          let tmpRes = res.data.projects;
          for (let item in tmpRes){
            for (let i in tmpData){
              if (i == tmpRes[item].type){
                tmpData[i].push(tmpRes[item]);
              }
            }
          }
          console.log(tmpData);
          this.descpData = tmpData;
        });
      }
    };
</script>

<style scoped>

</style>
