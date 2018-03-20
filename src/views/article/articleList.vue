<template>
  <div>
    <div class="content-top">
      <el-row>
        <el-col :span="2" :offset="1">
          <el-button @click="batchDelete" plain>批量删除</el-button>
        </el-col>
        <el-col :span="2" style="padding-left: 10px">
          <el-button @click="$router.push('/index/addArticle')" plain>新建文章</el-button>
        </el-col>
        <el-col :span="3" :offset="5">
          <el-select v-model="type" placeholder="文章类型" @change="handleSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" style="margin-left: calc(100% / 28)">
          <el-input placeholder="模糊查询" v-model="queryContent" class="input-with-select">
            <el-button slot="append" type="primary" @click="searchArticleList" icon="el-icon-search"></el-button>
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
    <el-col :span="22" :offset="1">
      <el-table
        ref="multipleTable"
        :data="articles"
        tooltip-effect="dark"
        max-height="520">
        <el-table-column
          type="selection"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="articleId"
          min-width="15%"
          label="文章序号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="title"
          min-width="10%"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="bannerUrl"
          min-width="15%"
          label="文章配图">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              trigger="hover">
              <img :src="scope.row.bannerUrl" style="width: 500px;height: 300px;"  alt="头图"/>
              <div slot="reference">
                <img :src="scope.row.bannerUrl" style="width: 50px;height: 50px;" alt="头图"/>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="summary"
          min-width="20%"
          label="摘要"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          min-width="10%"
          label="文章类型"
          :formatter="typeFormatter">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          min-width="15%"
          label="更新时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="updateArticle(scope.row.type, scope.row.articleId)" type="text" size="small">编辑</el-button>
            <el-button @click="dialogVisible = true" type="text" size="small">预览</el-button>
            <el-dialog title="预览" :visible.sync="dialogVisible" :modal="false">
              <span v-html="scope.row.content">
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12" :offset="12">
      <div class="block" style="padding-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="6"
          :total="totalItems"
          layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
  import requests from '../../common/api';
  import utils from '../../common/utils';

  export default {
    data() {
      return {
        userId: this.$cookies.get('userId'),
        articles: [],
        totalItems: 0,
        currentPage: 1,
        queryContent: '',
        queryTime: [],
        ipp: 6,
        showDatePicker: false,
        dialogVisible: false,
        options: [{
          value: '0',
          label: '案例分享'
        }, {
          value: '1',
          label: '修车助手'
        }, {
          value: '2',
          label: '自我诊断'
        }, {
          value: '3',
          label: '健康助手'
        }, {
          value: '4',
          label: '为你省钱'
        }],
        type: '0'
      };
    },
    methods: {
      typeFormatter (row) {
        let types = {
          '0': '案例分享',
          '1': '修车助手',
          '2': '自我诊断',
          '3': '健康助手',
          '4': '为你省钱'
        };
        return types[row.type];
      },
      getArticleList (currentPage, q='') {
        let params = {ipp: this.ipp, page: currentPage, q: q, type: this.type};
        requests.GetArticles(this.userId, params, this).then(res => {
          this.totalItems = res.data.maxPage * this.ipp;
          this.articles = res.data.articles;
          console.log(this.totalItems);
        })
      },
      searchArticleList () {
        let q = {};
        if (this.queryContent) q['content'] = this.queryContent;
        if (this.queryTime[0] && this.queryTime[1]) q['time'] = this.queryTime[0] + '-' + this.queryTime[1];
        this.getArticleList(this.currentPage, utils.genSearchParams(q));
      },
      handleCurrentChange (currentPage) {
        this.getArticleList(currentPage);
      },
      batchDelete (){
        this.$confirm('此操作将批量删除文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let selected = this.$refs.multipleTable.selection;
          let data = {
            articleIds: []
          };
          for (let item in selected){
            data.articleIds.push(selected[item].articleId);
          }
          requests.BatchDeleteArticle(this.userId, data, this).then(res => {
            this.$message.success('删除成功');
            this.getArticleList(this.currentPage);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateArticle (type, articleId) {
        this.$router.push('/index/updateArticle/' + articleId);
      },
      handleSelect () {
        this.getArticleList(this.currentPage);
      }
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['知识库管理', '文章列表']);

      this.getArticleList(this.currentPage);
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
