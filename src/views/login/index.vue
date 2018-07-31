<template>
  <div class="login-container">
    <el-form autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             label-position="left"
             label-width="0px"
      class="card-box login-form">
      <h3 class="title unselectable">综合管理系统</h3>
      <el-form-item prop="username" style="margin-bottom: 20px;">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          name="username"
          type="text"
          size="medium"
          autofocus
          @keyup.enter.native="setFocus"
          v-model="loginForm.username"
          autoComplete="off"
          placeholder="请输入用户名..."></el-input>
      </el-form-item>
      <el-form-item prop="password" style="margin-bottom: 20px;">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password"
                  :type="pwdType"
                  size="medium"
                  ref="password"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  autoComplete="off"
                  placeholder="请输入密码..."></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="width:100%;"
                   size="medium"
                   @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
      <div class="tips unselectable">Copyright ©2017 浙江帝杰曼信息科技股份有限公司</div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername, isvalidPassword } from '@/utils/validate'
import { Message } from 'element-ui'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('用户名必须由英文、数字或下划线组成，长度3到16位'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!isvalidPassword(value)) {
        callback(new Error('密码必须包含至少1位英文、数字和特殊字符，长度3到16位'))
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        password: [{ required: true, trigger: 'change', validator: validatePass }]
      },
      pwdType: 'password'
    }
  },
  methods: {
    //显示隐藏密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    //回车焦点跳到下一行
    setFocus() {
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
      
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
          })
        } else {
          Message.error('请输入正确的用户名和密码')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #85b3c3;
  //$dark_gray:#889aa4;
  $dark_gray:#2d3a4b;
  //$light_gray:#eee;
  $light_gray: #aaa;
  $font_color: #333;
  
  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    /*input:-webkit-autofill {*/
      /*-webkit-box-shadow: 0 0 0 1000px #293444 inset !important;*/
      /*-webkit-text-fill-color: #fff !important;*/
    /*}*/
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $font_color;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      //color: $font_color;
      color: #999;
      margin-bottom: 10px;
      text-align: center;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      //color: $font_color;
      color: $bg;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      border: 1px solid #a6a9ad;
      border-radius: 8px;
      background-color: #fff;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
