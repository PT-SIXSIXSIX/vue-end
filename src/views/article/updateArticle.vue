<template>
  <el-col :span="16" :offset="2">
    <el-form ref="articleForm" :rules="rules" :model="articleForm" label-width="120px" label-position="left" style="padding-top: 20px">
      <el-form-item label="文章标题" prop="title">
        <el-input type="text" v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="articleForm.type" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头图" prop="bannerUrl">
        <el-upload
          name="image"
          style="float: left; text-align: left !important;"
          class="image-uploader"
          :action="uploadUrl"
          :on-success="handleBannerSuccess"
          :on-error="handleImageFail"
          :before-upload="beforeImageUpload"
          :file-list="uploadImages"
          :limit="uploadImageLimit"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input type="text" v-model="articleForm.author">
        </el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6}"
          v-model="articleForm.summary">
        </el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <ai-simditor @change="change" v-bind:content="articleForm.content"></ai-simditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('articleForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import requests from '../../common/api';
  import globalConfig from '../../config';
  import AiSimditor from '../../components/AiSimditor'

  export default {
    components: {
      AiSimditor
    },
    data() {
      return {
        userId: this.$cookies.get('userId'),
        uploadUrl: globalConfig.nodeJsUrl + '/images',
        contentTemp: '',
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
        uploadImages: [],
        uploadImageName: '',
        uploadImageLimit: 2,
        articleForm: {
          title: '',
          type: '',
          bannerUrl: '',
          author: '',
          summary: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择文章类型', trigger: 'blur' },
          ],
          author: [
            { required: true, message: '请输入作者姓名', trigger: 'blur' },
          ],
          summary: [
            { required: true, message: '请输入摘要', trigger: 'blur' },
            { max: 140, message: '最多140个字', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateArticle();
            return true;
          } else {
            return false;
          }
        });
      },
      updateArticle() {
        this.articleForm.content = this.contentTemp;
        requests.UpdateArticle(this.userId, this.$route.params.articleId, this.articleForm, this).then(res => {
          if (res) {
            this.$message.success('修改成功');
            this.$router.push('/index/articleList');
          }
        });
      },
      handleBannerSuccess(res, file) {
        this.$message.success('图片上传成功');
        this.articleForm.bannerUrl = res.url;
        this.uploadImages = [{ name: this.uploadImageName, url: res.url }]
      },
      handleImageFail(err) {
        let error = eval('(' + err.message + ')');
        this.$notify.error({
          title: '错误',
          message: error.errorDesc
        });
      },
      beforeImageUpload(file) {
        const isAllowed = globalConfig.allowedImageType.indexOf(file.type) >= 0;
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isAllowed) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }

        this.uploadImageName = file.name;
        return isAllowed && isLt2M;
      },
      change(val) {
        this.contentTemp = val;
      }
    },
    created() {
      this.$store.commit('SET_BREADCRUMBS', ['知识库管理', '编辑文章']);

      requests.GetArticle(this.userId, this.$route.params.articleId, {}, this).then(res => {
        this.articleForm = res.data.article;
        this.contentTemp = this.articleForm.content;
        this.uploadImageName = 'banner.jpg';
        this.uploadImages = [{ name: this.uploadImageName, url: this.articleForm.bannerUrl }];
      });
    },
  }
</script>

<style lang="scss">
  .simditor {
    text-align: left !important;
  }
</style>
