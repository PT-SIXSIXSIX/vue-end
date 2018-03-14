<template>
  <div>
    <el-col :span="6" :offset="17">
      <el-button  type="text" icon="el-icon-plus" @click="addCards">添加新卡</el-button>
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
        <el-table-column
          label="操作"
          fixed="right"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="deleteCard(scope.$index, scope.row.cardId)" type="text">解除绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
  import requests from '../../common/api';
  export default {
    data() {
      return {
        tableData:[]
      }
    },
    methods: {
      addCards () {
        this.$router.push('/index/account/addBankCard')
      },
      deleteCard (rowIndex, cardId) {
        this.$confirm('此操作将解除绑定该银行卡, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.tableData);
          requests.DeleteBankCard(this.userId, {"cardIds": [cardId]}, this).then(res => {
            this.tableData.pop(rowIndex);
            this.$message({
              type: 'success',
              message: '解除绑定成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解除绑定'
          });
        });
      }
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的账户', '银行卡']);

      this.userId = this.$cookies.get('userId');
      requests.GetBankCards(this.userId, {}, this).then(res => {
        console.log(res.data.bankcards);
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
