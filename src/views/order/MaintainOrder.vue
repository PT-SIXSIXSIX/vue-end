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
        <el-button type="primary" icon="el-icon-search"  @click="queryOrder"></el-button>
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
          label="维修预约单号">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          min-width="10%"
          label="预约时间">
        </el-table-column>
        <el-table-column
          prop="projectDescp"
          min-width="25%"
          label="预约项目"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          min-width="12%"
          :formatter="formatter"
          label="预约单状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="10%"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleOrder(scope.$index, scope.row.orderId, 1)" type="text">接受</el-button>
            <el-button @click="handleOrder(scope.$index, scope.row.orderId, -1)" type="text" >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="10" :offset="12">
      <div class="block" style="padding-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="ipp"
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
      getOrders (ipp, page=1, q='') {
        let params = {ipp: ipp, page: page, q: q};
        requests.GetOrders(this.userId, this.projType, params, this).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.tableOrgData = res.data.records;
          this.tableData = this.tableOrgData;
        });
      },
      queryOrder () {
        let q = 'time:' + this.value7[0] + '-' + this.value7[1];
        let params = {ipp: this.ipp, q: q};
        this.getOrders(this.userId, this.projType, params);
      },
      handleOrder (rowIndex, orderId, state) {
        let opr = {
          '1': '接受',
          '-1': '拒绝'
        };
        this.$confirm('此操作将' + opr[state] + '该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          requests.UpdateOrderState(this.userId, this.projType, orderId, {state: state}, this).then(res => {
            this.tableData[rowIndex].state = state;
            this.$message.success('操作成功!')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        })
      },
      handleCurrentChange (currentPage) {
        this.getOrders(this.ipp, currentPage);
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的订单', '保养预约']);

      this.userId = this.$cookies.get('userId');
      this.projType = 1;
      this.ipp = 6;
      this.getOrders(this.ipp);
    },
  };
</script>

<style scoped>

</style>
