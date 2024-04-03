<template>
  <el-container>
    <el-aside width="200px">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#000"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <router-link
              class="roterLink"
              active-class="linkActive"
              to="/user/category"
            >
              <i class="el-icon-set-up"></i>
              <span>文章分类</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link
              class="roterLink"
              active-class="linkActive"
              to="/user/manage"
            >
              <i class="el-icon-document"></i>
              <span>文章管理</span>
            </router-link>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">个人中心</span>
            </template>
            <el-menu-item-group>
              <router-link
                class="roterLink"
                active-class="linkActive"
                to="/user/info"
              >
                <el-menu-item index="1-1">基本资料</el-menu-item>
              </router-link>
              <router-link
                class="roterLink"
                active-class="linkActive"
                to="/user/avatar"
              >
                <el-menu-item index="1-2">更换头像</el-menu-item>
              </router-link>
              <router-link
                class="roterLink"
                active-class="linkActive"
                to="/user/resetpwd"
              >
                <el-menu-item index="1-3">更换密码</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <router-link
              class="roterLink"
              active-class="linkActive"
              to="/user/chart"
            >
              <i class="el-icon-pie-chart"></i>
              <span>数据处理</span>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header class="clearfix">
        <div class="welcome">欢迎您：{{ userInfo.nickname }}</div>
        <el-row>
          <el-col :span="2">
            <el-dropdown>
              <span class="el-dropdown-link">
                <!-- <i class="el-icon-user-solid"></i> -->
                <div>
                  <el-avatar :src="userInfo.userPic"></el-avatar>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-message-solid"
                  >我的消息</el-dropdown-item
                >
                <div class="logout" @click="logout">
                  <el-dropdown-item icon="el-icon-switch-button"
                    >退出登录</el-dropdown-item
                  >
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>@COPYRIGTH</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from "@/api/user";
export default {
  name: "Layout",
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      console.log("out");
      this.$router.replace("/");
      window.localStorage.removeItem("token");
    },
  },
  mounted() {
    getUserInfo().then((resp) => {
      this.userInfo = resp.data;
      console.log(this.userInfo);
    });
  },
};
</script>

<style scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #000000;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  height: 622px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.logo {
  /* border-bottom: 1px solid gray; */
  /* padding-bottom: -40px; */
  margin-bottom: -40px;
}
.welcome {
  float: left;
  line-height: 60px;
}
.el-header .el-row {
  float: right;
  /* width: 30%; */
  text-align: center;
  /* border: 1px salmon solid; */
  padding-left: 190px;
}
.roterLink {
  color: #fff;
  text-decoration: none;
}
.linkActive {
  color: #ffd04b;
}
</style>