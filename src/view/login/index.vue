<template>
  <div class="body">
    <div
      :class="{ container: container, 'right-panel-active': rightPanelActive }"
    >
      <!-- 注册 -->
      <div class="container__form container--signup">
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="reRuleForm"
          label-width="80px"
          class="form"
        >
          <h2 class="form__title">注册</h2>
          <el-form-item label="用户名" prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="registerForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-unlock"
              v-model="registerForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input
              prefix-icon="el-icon-unlock"
              v-model="registerForm.repassword"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleRegister('reRuleForm')"
              >注册</el-button
            >
            <el-button @click="resetReForm('reRuleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录 -->
      <div class="container__form container--login">
        <el-form
          :model="loginForm"
          :rules="logRules"
          ref="logRuleForm"
          label-width="72px"
          class="form"
        >
          <h2 class="form__title">登录</h2>
          <el-form-item label="用户名" prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-unlock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleLogin('logRuleForm')"
              >登录</el-button
            >
            <el-button @click="resetLogForm('logRuleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn" @click="signIn">登录</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp" @click="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, register } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      container: true,
      rightPanelActive: true,

      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        repassword: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      logRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
        logcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        logidentity: [
          { required: true, message: "请选择身份", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    signIn() {
      this.rightPanelActive = false;
    },
    signUp() {
      this.rightPanelActive = true;
    },
    handleLogin() {
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message.error("用户名或密码不能为空");
        return;
      } else {
        // console.log(this.loginForm);
        // this.$store.dispatch('user/login', this.loginForm)
        Login(this.loginForm)
          .then((resp) => {
            console.log(resp);
            if (resp.code == 0) {
              console.log(resp.data);
              localStorage.setItem("token", resp.data);
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$router.push("/user");
            }
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      }
    },
    handleRegister() {
      if (
        this.registerForm.username === "" ||
        this.registerForm.password === "" ||
        this.registerForm.repassword === ""
      ) {
        this.$message.error("用户名或密码不能为空");
        return;
      } else if (this.registerForm.password != this.registerForm.repassword) {
        this.$message.error("两次密码输入不一致");
      } else {
        register(this.registerForm).then((resp) => {
          if (resp.code == 0) {
            this.$message({
              message: "注册成功，请登录",
              type: "success",
            });
          }
        }).catch(err=>{
            this.$message.error(err.message);
        })
      }
    },
    resetLogForm(formName) {
      this.$refs[formName].resetFields();
      this.value2 = "";
    },
    resetReForm(formName) {
      this.$refs[formName].resetFields();
      this.value1 = "";
    },
  },
};
</script>

<style scope>
/* :root是指文档的根元素，在其中定义的变量可作为全局变量 */
:root {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 758px;
  --max-height: 420px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.body {
  align-items: center;
  background-color: var(--white);
  background: url("https://picsum.photos/id/1002/1928/1080");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 70%;
  z-index: 2;
}

.container--login {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin,
.container.right-panel-active .container--login {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup,
.container.right-panel-active .container--logup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: var(--lightblue);
  background: url("https://picsum.photos/id/1002/1928/1080");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: var(--blue);
  background-image: linear-gradient(
    90deg,
    var(--blue) 0%,
    var(--lightblue) 74%
  );
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

.errorMsg {
  color: red;
  text-align: left;
  font-size: 14px;
}

.nameNotError,
.pwdNotError,
.codeNotError {
  display: none;
}
.code {
  /* border:  1px salmon solid; */
  width: 100%;
  display: flex;
  border: none;
  /* padding: 0.9rem 0.9rem; */
  /* margin: 0.5rem 0; */
  text-align: center;
}
.inputCode {
  background-color: #fff;
  /* border: 1px salmon solid; */
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 45%;
  border: none;
  margin-right: 20px;
}

.verification {
  /* border: 1px salmon solid; */
  padding: 0.3rem 0.3rem;
  /* margin: 0.5rem 0; */
  width: 40%;
}

.el-form-item {
  /* border: 1px salmon solid; */
  width: 100%;
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>