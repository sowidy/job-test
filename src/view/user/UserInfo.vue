<template>
  <div class="container">
    <div class="head">
      <el-descriptions
        class="margin-top"
        title="个人信息"
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
        <el-form-item label="登录名称">
          <el-input v-model="ruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" plain @click="updateUserInfoForm">提交修改</el-button>
    </div>
  </div>
</template>

<script>
import {getUserInfo,updateUserInfo} from '@/api/user'
export default {
  name: "UserInfo",
  data() {
    return {
      size: "",
      ruleForm: {
        id:'',
        username: "",
        nickname: "",
        email: "",
        userPic:'',
        createTime:'',
        updateTime:''
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods:{
    getUserInfoForm(){
      getUserInfo().then(resp=>{
        this.ruleForm = resp.data;
      })
    },
    updateUserInfoForm(){
      updateUserInfo(this.ruleForm).then(resp=>{
        console.log(resp);
        if(resp.code == 0){
          this.$message({
            type:'success',
            message:'修改成功'
          });
        }else this.$message.error("修改失败");
      })
    }
  },
  mounted(){
    this.getUserInfoForm();
  }
};
</script>

<style scoped>
.main {
  width: 50%;
  /* border: 1px salmon solid; */
  margin: 0 auto;
  margin-top: 50px;
}
.margin-top {
  background-color: white;
  padding-top: 10px;
  padding-left: 10px;
}
</style>