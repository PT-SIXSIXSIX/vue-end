<template>
  <div>
    <el-col :span="18" :offset="2">
      <div class="block" style="padding-bottom: 5px;">
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp">
        </el-date-picker>
        <el-button type="primary" @click="querySettleList" plain>查询</el-button>
      </div>
    </el-col>
    <el-col :span="20" :offset="1">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        max-height="520">
        <el-table-column
          prop="setAccId"
          min-width="12%"
          align="center"
          label="结算单号">
        </el-table-column>
        <el-table-column
          prop="companyName"
          min-width="10%"
          align="center"
          label="服务网点">
        </el-table-column>
        <el-table-column
          prop="driverName"
          min-width="25%"
          align="center"
          label="付款人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="driverPhone"
          min-width="25%"
          align="center"
          label="手机号码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tradedAt"
          min-width="25%"
          align="center"
          label="付款时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tradeMoney"
          min-width="25%"
          align="center"
          label="付款金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="commission"
          min-width="25%"
          align="center"
          label="平台佣金"
          :formatter="commissionFormatter"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="actualMoney"
          min-width="25%"
          align="center"
          label="实际到账"
          :formatter="actualFormatter"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          min-width="12%"
          align="center"
          :formatter="stateFormatter"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="16" :offset="3">
      <div class="block" style="padding-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="7"
          :total="totalItems"
          layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
  import requests from '../common/api';
  export default {
    data() {
      return {
        tableData: [],
        value7: [],
        totalItems: 0,
        currentPage: 1,
      };
    },
    methods: {
      stateFormatter (row) {
        let states = {'0': '联保中',
          '1': '待结算',
          '2': '已结算'
        };
        return states[row.state];
      },
      commissionFormatter (row){
        return row.tradeMoney * 0.1;
      },
      actualFormatter (row){
        return row.tradeMoney * 0.9;
      },
      getSettleList (userId, type, params) {
        console.log('req');
        requests.GetSettleList(userId, type, params).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.tableOrgData = JSON.parse(JSON.stringify(res.data.records));
          this.tableData = this.tableOrgData.slice(0, this.ipp);
        })
          .catch(error => {
            this.$message.error(error.response.data.errorDesc);
          });
      },
      querySettleList () {
        let q = 'time:' + this.value7[0] + '-' + this.value7[1];
        let params = {ipp: this.ipp, q: q};
        this.getSettleList(this.userId, this.projType, params);
      },
      handleCurrentChange (currentPage) {
        let edge = this.ipp*currentPage;
        this.tableData = this.tableOrgData.slice(edge - this.ipp, edge);
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['结算管理']);

      this.userId = this.$cookies.get('userId');
      this.projType = 1;
      this.ipp = 4;
      this.getSettleList(this.userId, this.type, {ipp: this.ipp});
    },
  };
</script>

<style scoped>

</style>
