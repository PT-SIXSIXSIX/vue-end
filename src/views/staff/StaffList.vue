<template>
  <div>
    <div class="content-top">
      <el-col :span="8" :offset="12" style="margin-bottom: 20px;">
      <el-input placeholder="根据名字或者手机号查询" v-model="q" class="input-with-select">
        <el-button slot="append" type="primary" @click="searchStaff" icon="el-icon-search"></el-button>
      </el-input>
      </el-col>
    </div>
    <el-col :span="18" :offset="2">
        <el-table
          :data="staffs"
          stripe
          style="width: 100%">
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
                @click="dialogVisible = true">删除</el-button>
              <el-dialog
                title="删除店员"
                :visible.sync="dialogVisible"
                width="30%">
                <span>你确定删除这个店员吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleDelete(scope.row.staffId, scope.row)">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
    </el-col>

    <div class="block" style="padding-top: 10px;">
      <el-col :span="12" :offset="11">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="ipp"
          :total="totalItems"
          layout="prev, pager, next, jumper">
        </el-pagination>
      </el-col>
    </div>
  </div>
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
        ipp: globalConfig.itemPerPage,
        dialogVisible: false,
      }
    },
    methods: {
      searchStaff() {
        let q = { q: this.q };
        this.getStaffs(this.currentPage, q);
      },
      handleDelete(staffId, row) {
        this.dialogVisible = false;
        requests.DeleteStaff(this.userId, staffId, {}, this).then(res => {
          this.$message.success('删除成功');
          this.staffs = this.staffs.filter(function (staff) {
            return staff.staffId !== staffId;
          });
        });
      },
      getStaffs(currentPage, q={}) {
        let pageParams = { page: currentPage, ipp: this.ipp };
        let params = Object.assign(pageParams, q);
        requests.GetStaffList(this.userId, params, this).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.staffs = res.data.staffs;
        })
      },
      handleCurrentChange (currentPage) {
        this.getStaffs(currentPage);
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['店员管理', '店员列表']);

      this.getStaffs(this.currentPage);
    }
  }
</script>

<style lang="scss">

</style>
