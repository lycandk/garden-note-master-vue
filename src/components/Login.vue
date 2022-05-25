<template>
  <body id="poster">
  <el-form v-loading="loading" :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" auto-complete="off" placeholder="账户" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" auto-complete="off" placeholder="密码" typeof="password"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="login_remember"
                 label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
    <el-form-item style="width: 100%">
      <el-button style="width: 100%;background: #505458;border: none" type="primary" v-on:click="login">登录</el-button>
      <router-link to="register">
        <el-button style="width: 100%;background: #505458;border: none" type="primary">注册</el-button>
      </router-link>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      checked: true,
      loginForm: {
        username: 'admin',
        password: ''
      },
      loading: false
      // responseResult: []
    }
  },
  methods: {
    login () {
      const _this = this
      console.log(this.$store.state)// 打印本地存储状态
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            // var data = this.loginForm
            this.$alert('登录成功！', '提示', {
              confirmButtonText: '确定'
            })
            _this.$store.commit('login', _this.loginForm)
            const path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
#poster {
  background: url("../assets/splashWT.png") no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  left: 0px;
  top: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
