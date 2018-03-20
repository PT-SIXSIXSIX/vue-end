<template>
  <div>
    <el-col :span="6" :offset="17">
      <el-button  type="text" icon="el-icon-plus" @click="dialogFormVisible = true">添加项目</el-button>
      <el-dialog title="项目内容" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" :rules="rules">
          <el-form-item label="项目类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择活动区域" style="width: 100%">
              <el-option label="保养预约" value="1"></el-option>
              <el-option label="维修任务" value="2"></el-option>
              <el-option label="抢修任务" value="3"></el-option>
              <el-option label="拖车任务" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目描述" prop="descp">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.descp">
            </el-input>
          </el-form-item>
          <el-form-item label="项目价格" prop="price">
            <el-input
              type="number"
              :rows="2"
              v-model="form.price">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
    <el-col :span="14" :offset="5">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="type"
          label="项目类型"
          :formatter="formatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="descp"
          label="项目描述">
        </el-table-column>
        <el-table-column
          prop="price"
          label="项目价格">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="dialogVisible = true">删除</el-button>
            <el-dialog
              title="删除项目"
              :visible.sync="dialogVisible"
              width="30%">
              <span>你确定删除这个项目吗？</span>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleDelete(scope.row)">确 定</el-button>
                </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <div class="block" style="padding-top: 10px;">
      <el-col :span="12" :offset="11">
        <el-pagination
          :current-page="currentPage"
          :page-size="7"
          :total="totalItems"
          layout="prev, pager, next, jumper">
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
  import requests from '../../common/api.js'
    export default {
      data () {
        //验证价格
        let validatePrice = (rule, value, callback) => {
          if (value < 0)
            callback(new Error('价格不能小于零！'));
          else
            callback();
        };
        return {
          userId: this.$cookies.get('userId'),
          tableData: [],
          dialogFormVisible: false,
          dialogVisible: false,
          totalItems: 0,
          currentPage: 1,
          rules: {
            type: [{
               required: true, message: '请选择项目类型', trigger: 'blur'
            }],
            descp: [{
               required: true, message: '请输入项目内容描述', trigger: 'blur'
            }],
            price: [{
               required: true, message: '请输入价格', trigger: 'blur'
            },
              {validator: validatePrice, trigger:'blur'}],
          },
          form: {

          },
        }
      },
      methods: {
        //格式化状态内容
        formatter (row) {
          let types = {
            '1': '保养预约',
            '2': '维修任务',
            '3': '抢修任务',
            '4': '拖车任务',
          };
          return types[row.type];
        },
        //提交表单信息
        onSubmit () {
          this.form.price = parseInt(this.form.price);
          requests.AddProject(this.userId, this.form, this).then(res => {
            this.$message.success('添加成功！');
            this.dialogFormVisible = false;
            this.getProjects();
          });
        },
        handleDelete (row) {
            requests.DeleteProject(this.userId, {projectsIds: [row.id]}, this).then(res => {
              this.tableData.pop(row.rowIndex);
              this.$message({
                type: 'success',
                message: '删除项目成功!'
              });
              this.dialogVisible = false;
            });
        },
        //获取项目信息
        getProjects () {
          requests.GetProjects(this.userId, {}, this).then(res => {
            this.tableData = res.data.projects;
            this.totalItems = res.data.total;
          });
        }
      },
      created() {
        this.$store.commit('SET_BREADCRUMBS', ['门店管理', '项目列表']);

        this.getProjects();
      }
    }
</script>

<style scoped>

</style>
