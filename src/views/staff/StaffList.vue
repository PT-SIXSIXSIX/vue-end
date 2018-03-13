<template>
  <el-col :span="18" :offset="3">
    <div class="content-top">
      <el-input placeholder="根据名字或者手机号查询" v-model="q" class="input-with-select">
        <el-button slot="append" type="primary" @click="searchStaff" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="content-middle">
        <el-table
          :data="staffs"
          stripe
          style="width: 100%">
          <el-table-column
            prop="staff_id"
            label="店员序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="店员姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="content-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="ipp"
        :total="totalItems"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-col>
</template>

<script>
  import globalConfig from '../../config'
  import requests from '../../common/api'

  export default {
    data() {
      return {
        userId: this.$cookies.get('userId'),
        q: '',
        staffs: [],
        totalItems: 0,
        currentPage: 1,
        ipp: globalConfig.itemPerPage
      }
    },
    methods: {
      searchStaff() {
        let q = { q: this.q };
        this.getStaffs(q);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getStaffs(q={}) {
        let pageParams = { page: this.currentPage, ipp: this.ipp };
        let params = Object.assign(pageParams, q);
        requests.GetStaffList(this.userId, params, this).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.tableOrgData = res.data.staffs;
          this.staffs = this.tableOrgData.slice(0, this.ipp);
        })
      },
      handleCurrentChange (currentPage) {
        let edge = this.ipp * currentPage;
        this.staffs = this.tableOrgData.slice(edge - this.ipp, edge);
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['店员管理', '店员列表']);

      this.getStaffs();
    }
  }
</script>

<style lang="scss">
  .content-top {
    .el-input {
      float: right;
      width: 300px;
      margin-bottom: 20px;

      .el-input-group__append {
        background-color: #409EFF !important;
        color: #fff !important;
        border: 1px solid #409EFF !important;
      }
    }
  }

  .content-bottom {
    margin-top: 20px;
    margin-right: 30px;
    float: right;
  }
</style>
