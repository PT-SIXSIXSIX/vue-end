<template>
  <div>
    <div class="content-top">
      <el-row>
        <el-col :span="8" :offset="12">
          <el-input placeholder="根据单号和付款人查询" v-model="content" class="input-with-select">
            <el-button slot="append" type="primary" @click="searchMoneyRecords" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="15" :span="6">
          <i class="el-icon-caret-bottom" v-if="showDatePicker === false"></i>
          <i class="el-icon-caret-top" v-else></i>
          <span v-on:click="showDatePicker = !showDatePicker">日期查询</span>
        </el-col>
      </el-row>
      <el-row v-if="showDatePicker">
        <el-col :span="8" :offset="12">
          <el-date-picker
            v-model="time"
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
    <el-col :span="18" :offset="2">
      <el-table
        :data="moneyRecords"
        tooltip-effect="dark"
        max-height="520">
        <el-table-column
          prop="revMonId"
          min-width="15%"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="setAccId"
          min-width="20%"
          align="center"
          label="结算单号">
        </el-table-column>
        <el-table-column
          prop="driverName"
          min-width="10%"
          align="center"
          label="付款人">
        </el-table-column>
        <el-table-column
          prop="tradedAt"
          min-width="18%"
          align="center"
          label="付款时间">
        </el-table-column>
        <el-table-column
          prop="actualMoney"
          min-width="12%"
          label="实际金额">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12" :offset="11">
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
  import globalConfig from '../../config'
  import requests from '../../common/api';
  import utils from '../../common/utils';

  export default {
    data() {
      return {
        userId: this.$cookies.get('userId'),
        time: [],
        content: '',
        moneyRecords: [],
        totalItems: 0,
        currentPage: 1,
        ipp: globalConfig.itemPerPage,
        showDatePicker: false,
      };
    },
    methods: {
      getMoneyRecords(currentPage, q={}) {
        let pageParams = { page: this.currentPage, ipp: this.ipp };
        let params = Object.assign(pageParams, q);
        requests.GetMoneyRecords(this.userId, params, this).then(res => {
          this.totalItems = res.data.maxPage;
          this.moneyRecords = res.data.records;
        });
      },
      searchMoneyRecords() {
        let q = {};
        if (this.content) q['content'] = this.content;
        if (this.time[0] !== undefined && this.time[1] !== undefined)
          q['time'] = 'time:' + this.time[0] + '-' + this.time[1];
        this.getMoneyRecords(this.currentPage, {q: utils.genSearchParams(q)});
      },
      handleCurrentChange (currentPage) {
        this.getMoneyRecords(currentPage);
      }
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的账户', '收账记录']);

      this.getMoneyRecords(this.currentPage);
    },
  };
</script>

<style lang="scss">

</style>
