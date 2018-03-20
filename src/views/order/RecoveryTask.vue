<template>
  <div>
    <div class="content-top">
      <el-row>
        <el-col :span="8" :offset="14">
          <el-input placeholder="模糊查询" v-model="queryContent" class="input-with-select">
            <el-button slot="append" type="primary" @click="queryOrder" icon="el-icon-search"></el-button>
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
            :default-time="defaultTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <el-col :span="20" :offset="2" style="padding-top: 5px">
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
          prop="orderedAt"
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
            <el-button @click="handleOrder(scope.$index, scope.row.orderId, 1)" type="text" :disabled="scope.row.state == 1">接受</el-button>
            <el-button @click="handleOrder(scope.$index, scope.row.orderId, -1)" type="text" :disabled="scope.row.state != 0">拒绝</el-button>
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
  import utils from '../../common/utils'
  export default {
    data() {
      return {
        userId: this.$cookies.get('userId'),
        tableData: [],
        queryContent: '',
        queryTime: [],
        totalItems: 0,
        currentPage: 1,
        defaultTime: ["00:00:00", "23:59:59"],
        showDatePicker: false
      };
    },
    methods: {
      //格式化状态内容
      formatter (row) {
        let states = {'1': '已接受',
          '-1': '已拒绝',
          '0': '待司机确认'
        };
        return states[row.state];
      },
      //获得订单信息
      getOrders (ipp, page=1, q='') {
        let params = {ipp: ipp, page: page, q: q};
        requests.GetOrders(this.userId, this.projType, params, this).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.tableOrgData = res.data.records;
          this.tableData = this.tableOrgData;
        });
      },
      //查询订单信息
      queryOrder () {
        console.log(this.queryContent, this.queryTime);
        if (this.queryContent || (this.queryTime[0] && this.queryTime[1])){
          console.log('yes');
          let q = {};
          if (this.queryContent) q['content'] = this.queryContent;
          if (this.queryTime[0] && this.queryTime[1]) q['time'] = this.queryTime[0] + '-' + this.queryTime[1];
          this.getOrders(this.ipp, 1, utils.genSearchParams(q));
        } else {
          this.$message.error('请输入需要查询的信息！');
        }
      },
      //处理订单请求
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
      //分页跳转页面
      handleCurrentChange (currentPage) {
        this.getOrders(this.ipp, currentPage);
      },
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的订单', '抢修任务']);

      this.projType = 3;
      this.ipp = 6;
      this.getOrders(this.ipp);
    },
  };
</script>

<style scoped>

</style>
