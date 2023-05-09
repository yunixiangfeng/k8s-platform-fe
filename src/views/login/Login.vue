<template>
  <div class="login">
    <!-- 用户登录卡片 -->
    <el-card class="login-card">
      <template #header>
        <div class="login-card-header">
          <span>用户登录</span>
        </div>
      </template>
      <!-- 表单 -->
      <el-form :model="loginData" :rules="loginDataRules" ref="loginData">
        <el-form-item prop="username">
          <!-- 用户名 -->
          <el-input prefix-icon="UserFilled" v-model.trim="loginData.username" maxlength="32" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 密码 -->
          <el-input prefix-icon="Lock" v-model.trim="loginData.password" maxlength="16" show-password placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width: 100%;border-radius: 2px" :loading="loginLoading" @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import common from "../common/Config";
import httpClient from '../../utils/request';
import moment from 'moment';
import md5 from 'md5';

export default{
  data() {
    return {
      //加载等待动画
      loginLoading: false,
      //登录验证的后端接口
      loginUrl: common.loginAuth,
      loginData: {
        username: '',
        password: ''
      },
      //校验规则
      loginDataRules: {
        username: [{
          required: true,
          message: '请填写用户名',
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: 'change'
        }],
      }
    }
  },
  methods: {
    //登录方法
    handleLogin() {
      httpClient.post(this.loginUrl, this.loginData)
          .then(res => {
            //账号密码校验成功后的一系列操作
            localStorage.setItem('username', this.loginData.username);
            localStorage.setItem('loginDate', moment().format('YYYY-MM-DD_HH:mm:ss'));
            const salt = localStorage.getItem('username')+localStorage.getItem('loginDate')
            //生成token
            const tokenExpireTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 过期时间，24小时后
            // const token = jwt.sign(this.loginData.username, 'test', options);
            const token = md5(salt);
            localStorage.setItem('token', token); // 将Token保存到localStorage中
            localStorage.setItem('tokenExpireTime', tokenExpireTime.getTime().toString()); // 将过期时间保存到localStorage中
            //跳转至根路径
            this.$router.push('/');
            this.$message.success({
              message: res.msg
            })
          })
          .catch(res => {
            this.$message.error({
              message: res.msg
            })
          })
    }
  }
}
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: aquamarine;
  background-image: url(../../assets/img/login.png);
  background-size: 100%;
}
.login-card {
  position: absolute;
  left: 70%;
  top: 15%;
  width: 350px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  overflow: hidden;
}
.login-card-header {
  text-align: center;
}
</style>
