<template>
  <div class="container">
    <div class="head">
      <el-descriptions
        class="margin-top"
        title="修改头像"
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
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/api/upload"
        :show-file-list="false"
        auto-upload
        :on-success="handleAvatarSuccess"
        :on-error="handleError"
        :before-upload="beforeAvatarUpload"
        :headers="{'Authorization':token}"
        name="image"
      >
        <img v-if="image" :src="image" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button
        type="success"
        :icon="Upload"
        size="large"
        @click="updateUserAvatar"
      >
        上传头像
      </el-button>
    </div>
  </div>
</template>

<script>
import {updateAvatar,getUserInfo} from '@/api/user'
export default {
  name: "UserAvatar",
  data() {
    return {
      Upload:'',
      size: "",
      image: "",
    };
  },
  computed:{
    token(){
      return localStorage.getItem('token');
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.image = URL.createObjectURL(file.raw);
      this.image = res.data;
      console.log(this.image);
      this.$message({
        type:'success',
        message:'上传成功',
      })
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
    updateUserAvatar(){
      console.log(this.image);
      updateAvatar(this.image).then(resp=>{
        console.log(resp);
        if(resp.code == 0){
          this.$message({
            type:'success',
            message:'修改成功'
          })
        }else this.$message.error("修改失败")
      })
    }
  },
  mounted(){
    getUserInfo().then(resp=>{
      this.image = resp.data.userPic;
    })
  }
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
</style>