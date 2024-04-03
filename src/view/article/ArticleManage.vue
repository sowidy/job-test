<template>
  <div>
    <div class="head">
      <el-descriptions
        class="margin-top"
        title="文章管理"
        :column="3"
        :size="size"
        border
      >
        <template slot="extra">
          <el-button type="primary" size="medium" @click="drawer = true"
            >发布文章</el-button
          >
        </template>
      </el-descriptions>
      <!-- <el-form-item label="活动区域"> </el-form-item> -->
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章分类">
          <!-- <el-input v-model="formInline.user" placeholder="文章分类"></el-input> -->
          <el-select v-model="formInline.categoryId" placeholder="文章分类">
            <el-option
              v-for="c in category"
              :key="c.id"
              :label="c.categoryName"
              :value="c.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="formInline.state" placeholder="发布状态">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button plain @click="resetFormInline">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="260">
        </el-table-column>
        <el-table-column prop="categoryName" label="分类" width="260">
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="260">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="260">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editArticle(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 添加文章 -->
    <el-drawer
      title="添加文章"
      :visible.sync="drawer"
      ref="addDrawer"
      :direction="direction"
      size="50%"
    >
      <!-- :before-close="false"<quill-editor v-model="addForm.goods_introduce"></quill-editor> -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="categoryId">
          <!-- <el-input v-model="formInline.user" placeholder="文章分类"></el-input> -->
          <el-select v-model="ruleForm.categoryId" placeholder="文章分类">
            <el-option
              v-for="c in category"
              :key="c.id"
              :label="c.categoryName"
              :value="c.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文章分类" prop="categoryName">
          <el-input v-model="ruleForm.categoryName"></el-input>
        </el-form-item> -->
        <el-form-item label="文章封面" prop="coverImg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            auto-upload
            :on-success="handleRuleAvatarSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload"
            :headers="{ Authorization: token }"
            name="image"
          >
            <img
              v-if="ruleForm.coverImg"
              :src="ruleForm.coverImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <quillEditor v-model="ruleForm.content" />
      <el-button type="primary" plain @click="addPublishArticle('已发布')"
        >发布</el-button
      >
      <el-button plain @click="addPublishArticle('草稿')">草稿</el-button>
    </el-drawer>

    <!-- 修改文章 -->
    <el-drawer
      title="编辑文章"
      :visible.sync="drawer2"
      ref="updateDrawer"
      :direction="direction"
      size="50%"
    >
      <!-- :before-close="false"<quill-editor v-model="addForm.goods_introduce"></quill-editor> -->
      <el-form
        :model="editTable"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="editTable.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="categoryId">
          <!-- <el-input v-model="formInline.user" placeholder="文章分类"></el-input> -->
          <el-select v-model="editTable.categoryId" placeholder="文章分类">
            <el-option
              v-for="c in category"
              :key="c.id"
              :label="c.categoryName"
              :value="c.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文章分类" prop="categoryName">
          <el-input v-model="editTable.categoryName"></el-input>
        </el-form-item> -->
        <el-form-item label="文章封面" prop="coverImg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            auto-upload
            :on-success="handleEditSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleError"
            :headers="{ Authorization: token }"
            name="image"
          >
            <img
              v-if="editTable.coverImg"
              :src="editTable.coverImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <quillEditor v-model="editTable.content" />
      <el-button type="primary" plain @click="updatePulishedArticle('已发布')"
        >发布</el-button
      >
      <el-button plain @click="updatePulishedArticle('草稿')">草稿</el-button>
    </el-drawer>
  </div>
</template>

<script>
import {
  getAllArticle,
  getUserAllCategory,
  getArticleItem,
  addArticle,
  updateArticle,
  deleteArticle,
} from "@/api/article";
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "ArticleManage",
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        id: "",
        title: "",
        content: "",
        coverImg: "",
        state: "",
        categoryId: "",
        createUser: "",
        crateTime: "",
        updateTime: "",
      },
      category: [],
      drawer2: false,
      drawer: false,
      direction: "rtl",
      totalPage: 1,
      pageSize: 3,
      currentPage: 1,
      size: "",
      formInline: {
        categoryId: "",
        state: "",
      },
      editTable: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        categoryId: [
          { required: true, message: "请输入文章分类", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        coverImg: [{ required: true, message: "请上传蹄片", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
  },
  methods: {
    async getFresh(currentPage, pageSize, categoryId, state) {
      const params = {
        currentPage,
        pageSize,
        categoryId,
        state,
      };
      await getAllArticle(params).then((resp) => {
        this.tableData = resp.data.items;
        this.totalPage = resp.data.total;
        this.getCategoryName();
      });
    },
    async getCategoryName() {
      await getUserAllCategory().then((resp) => {
        this.category = resp.data.items;
        for (let i = 0; i < this.tableData.length; i++) {
          let id = this.tableData[i].categoryId;
          for (let j = 0; j < this.category.length; j++) {
            if (this.category[j].id == id) {
              this.tableData[i].categoryName = this.category[j].categoryName;
            }
          }
        }
      });
    },
    onSubmit() {
      this.getFresh(
        this.currentPage,
        this.pageSize,
        this.formInline.categoryId,
        this.formInline.state
      );
    },
    resetFormInline() {
      (this.formInline.categoryId = ""), (this.formInline.state = "");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getFresh(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getFresh(this.currentPage, this.pageSize);
    },
    handleRuleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.coverImg = res.data;
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    handleEditSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.editTable.coverImg = res.data;
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    handleError() {
      this.$message.error("上传失败");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    editArticle(id) {
      getArticleItem(id).then((resp) => {
        this.editTable = {};
        this.editTable = resp.data;
        this.drawer2 = true;
      });
    },
    deleteArticle(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(id).then((resp) => {
            if (resp.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getFresh(this.currentPage, this.pageSize);
            } else this.$message.error("操作失败");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addArticleFun(state) {
      addArticle(this.ruleForm).then((resp) => {
        if (resp.code == 0) {
          this.$message({
            type: "success",
            message: `添加${state}成功`,
          });
          this.getFresh(this.currentPage, this.pageSize);
          this.$refs.addDrawer.closeDrawer();
        } else this.$message.error("添加失败");
      });
    },
    validateRuleForm() {
      if (
        this.ruleForm.title == "" ||
        this.ruleForm.categoryId == "" ||
        this.ruleForm.coverImg == "" ||
        this.ruleForm.content == ""
      ) {
        this.$message.error("请输入完整信息");
        return false;
      }
    },
    addPublishArticle(state) {
      this.ruleForm.state = state;
      console.log(this.ruleForm);
      const vali = this.validateRuleForm();
      if (vali) this.addArticleFun(state);
    },
    updateForm(formData) {
      updateArticle(formData).then((resp) => {
        if (resp.code == 0) {
          this.$refs.updateDrawer.closeDrawer();
          this.getFresh(this.currentPage, this.pageSize);
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else this.$message.error("修改失败");
      });
    },
    updatePulishedArticle(state) {
      this.editTable.state = state;
      console.log(this.ruleForm);
      const vali = this.validateRuleForm();
      if (vali) this.updateForm(this.editTable);
    },
  },
  async mounted() {
    await this.getFresh(this.currentPage, this.pageSize);
  },
  components: {
    quillEditor,
  },
};
</script>

<style>
.head {
  /* border: 1px solid salmon; */
  padding: 10px;
  background-color: white;
}
.search {
  /* display: flex; */

  background-color: white;
  width: 100%;
  float: left;
}
.table {
  /* border: 1px solid salmon; */
  /* border: none; */
  height: 405px;
}
.foot {
  position: absolute;
  bottom: 70px;
  right: 400px;
  background-color: #fff;
}
/* 解决富编辑器高度问题 */
.ql-editor {
  height: 300px !important;
}
/* 解决富文本编辑器不能加粗倾斜的问题,重置字体样式 */
* {
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-weight: normal;
  font-style: normal;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.block {
  /* border: 1px solid salmon; */
  text-align: center;
  padding-top: 20px;
  background-color: white;
  height: 60px;
}
</style>