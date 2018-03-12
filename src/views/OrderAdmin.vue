<template>
  <el-container>
    <el-header>
      <ai-header></ai-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="inherit"
            text-color="white"
            style=""
          >
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title">门店信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">信息修改</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <el-col :span="12" :offset="1">
          <div class="block" style="padding-bottom: 5px;">
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
            <el-button type="primary" plain>查询</el-button>
          </div>
        </el-col>
        <el-col :span="22" :offset="1">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border="true"
            max-height="640"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="center"
              min-width="45">
            </el-table-column>
            <el-table-column
              prop="orderId"
              min-width="120px"
              align="center"
              label="维修预约单号">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              min-width="90px"
              align="center"
              label="预约时间">
            </el-table-column>
            <el-table-column
              prop="projectDescp"
              min-width="250px"
              align="center"
              label="预约项目"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="state"
              min-width="100px"
              align="center"
              :formatter="formatter"
              label="预约单状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="200"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">接受</el-button>
                <el-button type="text">拒绝</el-button>
                <el-button type="text">改签</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16" :offset="4">
          <div class="block" style="padding-top: 10px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import requests from '../common/api';
  export default {
    beforeCreate (){
      let userId = 1;
      let type = 1;
      let params = {
        page: 1,
        ipp: 7,
        q: 'state:0|1|-1+time:2018年3月6日-2018年3月7日'
      };
      requests.GetOrders(userId, type, params).then(res => {
        this.tableData = JSON.parse(JSON.stringify(res.data.records));
      })
        .catch(error => {
          this.$message.error(error.response.data.errorDesc);
        });
    },
    data() {
      return {
        tableData: [],
        multipleSelection: []
      };
    },
    methods: {
      formatter (row) {
        let states = {'1': '已接受',
          '-1': '已拒绝',
          '0': '待司机确认'
        };
        return states[row.state];
      }
    }
  };
</script>

<style scoped>

</style>
