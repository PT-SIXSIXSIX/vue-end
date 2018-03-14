<template>
  <div>
    <div class="content-top">
      <el-row v-if="loaded && depositThreshold > currentDeposit">
        <el-col :span="5" :offset="2">
          <div class="fl" style="font-size: 15px;height: 30px;line-height: 30px;border-bottom: 1px solid #d1d1d1;">
            当前保证金余额: {{ currentDeposit }}元,
            <span style="color: #409EFF;cursor: pointer;" @click="dialogFormVisible = true">去补足</span>
          </div>
        </el-col>
        <el-col :span="8" :offset="5">
          <el-input placeholder="根据状态查询" v-model="state" class="input-with-select">
            <el-button slot="append" type="primary" @click="searchDeposit" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="8" :offset="12">
          <el-input placeholder="根据状态查询" v-model="state" class="input-with-select">
            <el-button slot="append" type="primary" @click="searchDeposit" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="15">
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
    <el-col :span="18" :offset="3">
      <el-table
        :data="deposits"
        tooltip-effect="dark"
        max-height="520">
        <el-table-column
          prop="desRcgId"
          min-width="10%"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="rechargeMoney"
          min-width="20%"
          align="center"
          label="补足金额">
        </el-table-column>
        <el-table-column
          prop="rechargeTime"
          min-width="10%"
          align="center"
          label="补足时间">
        </el-table-column>
        <el-table-column
          prop="currentDeposit"
          min-width="18%"
          align="center"
          label="当前金额">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="state"
          min-width="12%"
          :formatter="stateFormatter"
          label="状态">
          <template slot-scope="scope">
            <p style="color: #f56c6c;" v-if="scope.row.state === 0">不足</p>
            <p style="color: #67c23a;" v-else>充足</p>
          </template>
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
    <el-dialog title="补足保证金" :visible.sync="dialogFormVisible">
      <el-form :model="depositForm" :rules="rules" ref="depositForm" v-model="depositForm">
        <el-form-item label="补足金额" :label-width="formLabelWidth" prop="money">
          <el-input v-model="depositForm.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('depositForm')" type="primary">补足</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import globalConfig from '../../config';
  import requests from '../../common/api';
  import utils from '../../common/utils';

  export default {
    data() {
      let validateDeposit = (rule, value, callback) => {
        if (!/\d+/.test(value)) {
          callback(new Error('请输入数字'))
        } else if (parseInt(value) < (this.depositThreshold - this.currentDeposit)) {
          let need = this.depositThreshold - this.currentDeposit;
          callback(new Error('输入金额不足，至少' + need + '元'))
        } else {
          callback();
        }
      };
      return {
        userId: this.$cookies.get('userId'),
        deposits: [],
        time: [],
        state: '',
        totalItems: 0,
        currentPage: 1,
        ipp: globalConfig.itemPerPage,
        showDatePicker: false,
        dialogFormVisible: false,
        currentDeposit: 0,
        depositThreshold: globalConfig.depositThreshold,
        formLabelWidth: '120px',
        loaded: false,
        depositForm: {
          money: ''
        },
        rules: {
          money: [
            { required: true, message: '请输入补足金额', trigger: 'blur' },
            { validator: validateDeposit, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      stateFormatter (row) {
        let states = { '0': '不足', '1': '充足'};
        return states[row.state];
      },
      getDeposits(currentPage, q={}) {
        let pageParams = { page: this.currentPage, ipp: this.ipp };
        let params = Object.assign(pageParams, q);
        requests.GetDeposits(this.userId, params, this).then(res => {
          this.deposits = res.data.records;
          this.currentDeposit = res.data.currentDeposit;
          this.loaded = true;
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requests.RechargeDeposit(this.userId, this.depositForm, this).then(res => {
              if (res) {
                this.$message.success('补足成功');
                this.$router.push('/index/account/depositList')
              }
            });
            return true;
          } else {
            return false;
          }
        });
      },
      searchDeposit() {
        let q = {};
        if (this.state) {
          if (this.state === '不足')
            q['state'] = '0';
          else if (this.state === '充足')
            q['state'] = '1';
        }
        if (this.time[0] !== undefined && this.time[1] !== undefined)
          q['time'] = 'time:' + this.time[0] + '-' + this.time[1];
        this.getDeposits(this.currentPage, {q: utils.genSearchParams(q)});
      },
      handleCurrentChange (currentPage) {
        this.getDeposits(currentPage);
      }
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['我的账户', '保证金']);

      this.getDeposits(this.currentPage);
    },
  };
</script>

<style lang="scss">

</style>
