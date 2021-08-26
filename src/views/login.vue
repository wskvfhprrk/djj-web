  <style scoped>
  #app{display: table;width:100%;}
  .main-title{text-align: center;color: #fff;font-size:30px;margin: 0px;margin-bottom: 40px;line-height: 30px}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 440px;margin:11vh auto 0px}
  .login-page{background:#1f2545 url(../assets/img/login_bg.jpg) center bottom no-repeat;height: 100vh;background-size:100vw 43vh;overflow: hidden;display: block; }
  .yzm{height: 30px;vertical-align: middle!important;padding-left: 10px;color:#606266;width:170px;border-radius: 5px;outline: none}
  .yzmimg{height: 37px;vertical-align: middle!important;float: right;margin-top: 2px;width: 120px}
  .bgBox{color: #fff;background: #376871;width: 440px;height: 440px;border-radius: 7px;overflow: hidden;}
  .login_title{background: #5b8f90;height: 60px;border-bottom: 1px solid #4c8484;text-align: center;line-height: 60px;font-size: 26px;font-weight: 200}
  .login_contentBox{padding: 20px 50px}
  .el-button--primary{
    background: #55bc9f!important;border: none;margin-top: 35px
  }
  .el-input-group--prepend .el-input__inner,{
    background: #345f6b!important;
  }
  .el-input-group--prepend .el-input__inner, .el-input-group__append input{
    background:  #345f6b!important;
  }
  .el-input-group__prepend{
    background: #345f6b!important;
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus{
    border: 1px solid #fff!important;
  }
</style>
<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <h1 class="main-title">花博会主题彩票纪念册营销活动抽奖验证系统 </h1>
        <!-- <p class="des">后台管理系统欢迎您的登录</p> -->
        <div class="bgBox">
          <h4 class="login_title">登 录</h4>
          <div class="login_contentBox">
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="username">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <input type="text" v-model="captcha"  placeholder="验证码" class="yzm">
          <img alt="如果看不清楚，请单击图片刷新！" :src="'data:image/png;base64,'+src" @click="refreshCode" class="yzmimg">
          <template slot="prepend"><i class="el-icon-info"></i></template>
        </el-form-item>

        <el-form-item>
          <el-button style="width:100%;border-radius:5px;font-size:20px" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
       </div>
      </div>
      <!--   <el-row style="text-align:center">
          <el-col :span="8">
            <a href="https://github.com/tower1229/Vue-Access-Control" target="_blank"><el-button type="text" icon="el-icon-info">Github</el-button></a>
          </el-col>
          <el-col :span="8">
            <a href="https://refined-x.com/2017/11/28/Vue2.0%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/" target="_blank"><el-button type="text" icon="el-icon-info">介绍</el-button></a>
          </el-col>
          <el-col :span="8">
            <a href="https://refined-x.com/" target="_blank"><el-button type="text" icon="el-icon-info">博客</el-button></a>
          </el-col>

        </el-row> -->

      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import CryptoJS from "crypto-js";
import * as util from '../assets/util.js';
axios.defaults.withCredentials= true;

//登录
const requestLogin = params => {
  return axios.post(`/AlipayAward/login`,params,{
    headers: {
      "Content-Type":"application/json"
    }})
};

export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false,
      usertype:'',
      src:'',
      captcha:'',
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登 录 中...';
      return '登 录';
    }
  },
  methods: {
    refreshCode: function(){
		axios.get('/AlipayAward/checkPicture').then(res=>{
			this.src = res.data.content.picStr;
		})

    },
    login() {
      var vm = this;
      if (!vm.username) {
        vm.$message.error('请填写用户名！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('请填写密码');
        return;
      }
      if (!vm.captcha) {
        vm.$message.error('请填写验证码');
        return;
      }

      let loginParams = {"username": vm.username, "password": vm.password, "checkCode":vm.captcha};
      vm.isBtnLoading = true;
      requestLogin(loginParams).then(res => {
        vm.isBtnLoading = false;
        if(res.data.success){
          util.session('token', res.data.content.token);

         vm.$root.userData = res.data.content;
					util.session('userData',res.data.content)
          // vm.$root.user
          vm.$emit('login', vm.$router.currentRoute.query.from);//在此处调用父组件@login 对应函数
        }else{
          vm.refreshCode();
          vm.$message.error(res.data.msg);
          return Promise.reject({
            message: res.data.msg
          });
        }
      }).catch(util.catchError);
    }
  },
  created() {
    sessionStorage.clear();
	this.refreshCode();

  }
};
</script>
