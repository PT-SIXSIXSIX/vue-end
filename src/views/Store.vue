<template>
  <el-form ref="form" :model="form" label-width="100px" label-position="left">
    <el-form-item label="门店名">
      <el-input v-model="form.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="门店位置">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="店主姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="店主手机号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="备用手机号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="门店服务项目">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的门店', '门店信息'])
    }
  }
</script>
