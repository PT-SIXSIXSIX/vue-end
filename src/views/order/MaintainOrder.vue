<template>
  <div>
    <el-col :span="12" :offset="11">
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
        <el-button type="primary" @click="queryOrder" plain>查询</el-button>
      </div>
    </el-col>
    <el-col :span="20" :offset="2" style="padding-top: 15px">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        max-height="520">
        <el-table-column
          prop="orderId"
          min-width="12%"
          align="center"
          label="维修预约单号">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          min-width="10%"
          align="center"
          label="预约时间">
        </el-table-column>
        <el-table-column
          prop="projectDescp"
          min-width="25%"
          align="center"
          label="预约项目"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          min-width="12%"
          align="center"
          :formatter="formatter"
          label="预约单状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="10%"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleOrder(scope.row.orderId, 1)" type="text">接受</el-button>
            <el-button @click="handleOrder(scope.row.orderId, -1)" type="text" >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="10" :offset="14">
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
  import requests from '../../common/api';
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
      formatter (row) {
        let states = {'1': '已接受',
          '-1': '已拒绝',
          '0': '待司机确认'
        };
        return states[row.state];
      },
      getOrders (userId, type, params) {
        console.log('req');
        requests.GetOrders(userId, type, params, this).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.tableOrgData = JSON.parse(JSON.stringify(res.data.records));
          this.tableData = this.tableOrgData.slice(0, this.ipp);
        })
          .catch(error => {
            this.$message.error(error.response.data.errorDesc);
          });
      },
      queryOrder () {
        let q = 'time:' + this.value7[0] + '-' + this.value7[1];
        let params = {ipp: this.ipp, q: q};
        this.getOrders(this.userId, this.projType, params);
      },
      handleOrder (orderId, state) {
        requests.UpdateOrderState(this.userId, this.type, orderId, {state: state}, this).then(res => {
          this.$message.success('操作成功!')
        })
          .catch(error => {
            this.$message.error(error.response.data.errorDesc);
          });
      },
      handleCurrentChange (currentPage) {
        let edge = this.ipp*currentPage;
        this.tableData = this.tableOrgData.slice(edge - this.ipp, edge);
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的订单', '保养预约']);

      this.userId = this.$cookies.get('userId');
      this.projType = 1;
      this.ipp = 4;
      this.getOrders(this.userId, this.type, {ipp: this.ipp});
    },
  };
</script>

<style scoped>

</style>
