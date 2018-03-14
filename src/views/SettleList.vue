<template>
  <div>
    <div class="content-top">
      <el-row>
        <el-col :span="3" :offset="1">
          <el-button @click="batchSettle" plain>批量结算</el-button>
        </el-col>
        <el-col :span="8" :offset="10">
          <el-input placeholder="模糊查询" v-model="queryContent" class="input-with-select">
            <el-button slot="append" type="primary" @click="querySettleList" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="16">
          <i class="el-icon-caret-bottom" v-if="showDatePicker === false"></i>
          <i class="el-icon-caret-top" v-else></i>
          <span v-on:click="showDatePicker = !showDatePicker">日期查询</span>
        </el-col>
      </el-row>
      <el-row v-if="showDatePicker">
        <el-col :span="8" :offset="14">
          <el-date-picker
            v-model="queryTime"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <el-col :span="22" :offset="1">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        max-height="520">
        <el-table-column
          type="selection"
          :selectable="handleSelect"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="setAccId"
          min-width="18%"
          label="结算单号">
        </el-table-column>
        <el-table-column
          prop="companyName"
          min-width="20%"
          label="服务网点">
        </el-table-column>
        <el-table-column
          prop="driverName"
          min-width="10%"
          label="付款人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="driverPhone"
          min-width="18%"
          label="手机号码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tradedAt"
          min-width="15%"
          label="付款时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tradeMoney"
          min-width="8%"
          label="付款金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="commission"
          min-width="8%"
          label="平台佣金"
          :formatter="commissionFormatter"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="actualMoney"
          min-width="8%"
          label="实际到账"
          :formatter="actualFormatter"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          min-width="12%"
          :formatter="stateFormatter"
          label="状态"
          fixed="right"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12" :offset="12">
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
  import utils from '../common/utils';

  export default {
    data() {
      return {
        tableData: [],
        value7: [],
        totalItems: 0,
        currentPage: 1,
        optionValue: '',
        queryContent: '',
        queryTime: [],
        showDatePicker: false,
        options: [{
          value: 0,
          label: '联保中'
        },{
          value: 1,
          label: '待结算'
        },{
          value: 2,
          label: '已结算'
        }]
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
      getSettleList (ipp, page=1, q='') {
        let params = {ipp: ipp, page: page, q: q};
        requests.GetSettleList(this.userId, params).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.tableOrgData = JSON.parse(JSON.stringify(res.data.records));
          this.tableData = this.tableOrgData.slice(0, this.ipp);
        });
      },
      querySettleList () {
        let q = {
          content: this.queryContent ? this.queryContent : '',
          time: this.queryTime[0] + '-' + this.queryTime[1]
        };
        this.getSettleList(this.ipp, 1, utils.genSearchParams(q));
      },
      handleCurrentChange (currentPage) {
        this.getSettleList(this.ipp, currentPage);
      },
      batchSettle (){
        this.$confirm('此操作将批量结算订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let selected = this.$refs.multipleTable.selection;
          let data = {
            setAccIds: []
          };
          for (let item in selected){
            data.setAccIds.push(selected[item].setAccId);
          }
          requests.BatchSettle(this.userId, 2, data, this).then(res => {
            this.getSettleList(this.ipp);
            this.$message.success('结算成功');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结算'
          });
        });
      },
      handleSelect (row) {
        return row.state !== 2;
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['结算管理']);

      this.userId = this.$cookies.get('userId');
      this.projType = 1;
      this.ipp = 7;
      this.getSettleList(this.ipp);
    },
  };
</script>

<style lang="scss">
  .el-input-group__append, .el-input-group__prepend {
    border-color: #409EFF !important;
    background-color: #409EFF !important;
    color: #fff !important;
  }
</style>
