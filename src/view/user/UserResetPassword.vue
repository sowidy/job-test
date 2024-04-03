<template>
  <div class="container">
    <div class="head">
      <el-descriptions
        class="margin-top"
        title="修改密码"
        :column="3"
        :size="size"
        border
      >
        <template slot="extra">
          <!-- <el-button type="primary" size="small">操作</el-button> -->
        </template>
      </el-descriptions>
    </div>
    <div class="main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input v-model="ruleForm.old_pwd" prefix-icon="el-icon-unlock" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="ruleForm.new_pwd" prefix-icon="el-icon-unlock" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input v-model="ruleForm.re_pwd" prefix-icon="el-icon-unlock" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="primary" plain @click="updatePwd">修改密码</el-button>
        <el-button plain @click="resetForm('ruleForm')">重置</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import {updateUserPwd} from '@/api/user'
export default {
  name: "UserResetPassword",
  data() {
    return {
      size: "",
      ruleForm: {
        old_pwd: "",
        new_pwd: "",
        re_pwd: "",
      },
      rules: {
        old_pwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        new_pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        re_pwd: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { min: 5, max:15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    updatePwd(){
      updateUserPwd(this.ruleForm).then(resp=>{
        if(resp.code==0){
          this.$message({
            type:'success',
            message:'修改成功，请重新登录'
          })
          this.$router.replace("/login");
        }
        else this.$message.error("修改失败");
      })
    }
  },
};
</script>

<style scoped>
.margin-top {
  background-color: white;
  padding-top: 10px;
  padding-left: 10px;
}
.main {
  width: 50%;
  /* border: 1px salmon solid; */
  margin: 0 auto;
  margin-top: 50px;
}
</style>