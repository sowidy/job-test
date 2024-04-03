<template>
  <div>
    <div class="head">
      <el-descriptions
        class="margin-top"
        title="文章分类"
        :column="3"
        :size="size"
        border
      >
        <template slot="extra">
          <el-button
            type="primary"
            size="medium"
            @click="dialogVisible = !dialogVisible"
            >添加分类</el-button
          >
        </template>
      </el-descriptions>
      <!-- <el-form-item label="活动区域"> </el-form-item> -->
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序号" width="350">
        <template slot-scope="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="id" label="序号" width="350"> </el-table-column> -->
      <el-table-column prop="categoryName" label="分类名称" width="350">
      </el-table-column>
      <el-table-column prop="categoryAlias" label="分类别名" width="350">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editCategory(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteCategory(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加 -->
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
      <!-- :before-close="handleClose" -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="ruleForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="categoryAlias">
          <el-input v-model="ruleForm.categoryAlias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unaddCategory('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="编辑分类" :visible.sync="dialogVisible2" width="30%">
      <!-- :before-close="handleClose" -->
      <el-form
        :model="editForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="editForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="categoryAlias">
          <el-input v-model="editForm.categoryAlias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unaddCategory('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="formUpadteCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllCategory,
  addCategory,
  // editCategory,
  updateCategory,
  deleteCategory,
} from "@/api/article";
export default {
  name: "ArticleCategory",
  data() {
    return {
      size: "",
      ruleForm: {
        id: "",
        crateUser: "",
        crateTime: "",
        updateTime: "",
        categoryName: "",
        categoryAlias: "",
      },
      editForm: [],
      rules: {
        categoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        categoryAlias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      dialogVisible2: false,
      dialogVisible: false,
      tableData: [],
    };
  },
  methods: {
    getFresh() {
      getAllCategory().then((resp) => {
        this.tableData = resp.data;
        // console.log(this.tableData);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    unaddCategory(formName) {
      this.resetForm(formName);
      this.dialogVisible = false;
      this.dialogVisible2 = false;
      this.editForm = [];
    },
    addCategory() {
      // console.log(this.ruleForm);
      addCategory(this.ruleForm)
        .then((resp) => {
          if (resp.code == 0) {
            this.getFresh();
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.dialogVisible = false;
          } else this.$message.error("添加失败");
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    editCategory(id) {
      console.log(this.editForm);
      this.dialogVisible2 = true;
      // console.log(id);
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == id) this.editForm = this.tableData[i];
      }
    },
    deleteCategory(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCategory(id).then((resp) => {
            if (resp.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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
    formUpadteCategory() {
      // console.log(this.editForm);
      updateCategory(JSON.stringify(this.editForm)).then((resp) => {
        // console.log(resp);
        if (resp.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.dialogVisible2 = false;
          this.getFresh();
        }
      });
    },
  },
  mounted() {
    this.getFresh();
  },
};
</script>

<style scoped>
.head {
  /* border: 1px solid salmon; */
  padding: 10px;
  background-color: white;
}
.op {
  display: flex;
  justify-content: space-around;
  /* border: 1px solid salmon; */
  width: 70%;
}
</style>