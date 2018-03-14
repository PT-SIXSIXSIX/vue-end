<template>
  <div>
    <el-col :span="6" :offset="17">
      <el-button  type="text" icon="el-icon-plus">添加新卡</el-button>
    </el-col>
    <el-col :span="18" :offset="3">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="cardId"
          label="银行卡账号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ownerIdCard"
          label="开户人身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ownerName"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="type"
          label="银行卡类型">
        </el-table-column>
        <el-table-column
          prop="bankName"
          label="银行名称">
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
  import requests from '../../common/api';
  export default {
    beforeCreate (){
    },
    data() {
      return {
        tableData:[{
          cardId: '1234456678832452345',
          ownerIdCard: '123456789012345678',
          ownerName: '黄钰萧',
          type: '储蓄卡',
          bankName: '中国银行',
        }]
      }
    },
    methods: {
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的账户', '银行卡']);

      this.userId = this.$cookies.get('userId');
      requests.GetBankCards(this.userId, {}, this).then(res => {
        this.tableData = res.data.bankcards;
      });
    }
  }
</script>

<style lang="scss">

  .avatar-uploader .el-upload {

    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }
</style>
