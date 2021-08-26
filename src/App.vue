<style>
@import './assets/common.css';
</style>

<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>

<script>
import Vue from 'vue';
import instance from './api';
import AllRoutesData from './router/fullpath';
import * as util from './assets/util.js';

// axios Interceptor

let myInterceptor;

export default {
  data() {
    return {
      menuData: null,
      userData: null,
      usertype:null,
      userSr:'',
    }
  },
  methods: {
    setInterceptor: function(resourcePermission) {//判断是否有权限请求当前链接  添加请求拦截
      myInterceptor = instance.interceptors.request.use(config => {//instance为axios  instance.interceptors 为请求拦截器
        // Get request path   instance.interceptors.request.use请求发送前  axios.interceptors.response.use  对响应数据进行处理
        
        let perName = config.url.replace(config.baseURL, '').split('?')[0];
        //RESTful type 1 /path/**
        let reg1 = perName.match(/^(\/[^\/]+\/)[^\/]+$/);
        if (reg1) {
          perName = reg1[1] + '**';
        }
        //RESTful type 2 /path/*/path
        let reg2 = perName.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/);
        if (reg2) {
          perName = perName.replace(reg2[1], '*');
        }

        // Check permissions
        if (!resourcePermission[config.method + ',' + perName]) {
          this.$message({
            message: '无访问权限，请联系企业管理员',
            type: 'warning'
          });
          return Promise.reject({
            message: 'no permission'
          });
        }
        return config;
      });
    },
    // getResources: function(userPermissions) {
    //   // let resourceHash = {};
    //   // if (Array.isArray(userPermissions.permissions)) {
        
    //   //   Input like this:
    //   //   [{
    //   //     id: "2c9180895e172348015e1740805d000d"
    //   //       method: "GET"
    //   //       url: "/some-url"
    //   //   }]
        
    //   //   userPermissions.resources.forEach(e => {
    //   //     let key = e.method.toLowerCase() + ',' + e.url;
    //   //     resourceHash[key] = true;
    //   //   });
    //   // }
    //   // Get hash structure
    //   return resourceHash;
    // },
    getRoutes: function(userPermissions) {  
      let routeHash = {};
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.url) {
            let hashKey = ((base ? base + '/' : '') + key.url).replace(/^\//, '');
            routeHash['/' + hashKey] = true;
            
          }
          if (Array.isArray(key.children)) {
              setMenu2Hash(key.children);
            }
        });
      };
      if (Array.isArray(userPermissions.menuList)) {
      /*
      * Input Like this: 
      * [{
      *   id: "2c9180895e13261e015e13469b7e0000",
      *   name: "账户管理",
      *   parent_id: "2c9180895e13261e015e13469b7e0000",
      *   route: "some-route"
      * }]
      */
        let arrayMenus = util.buildMenu(userPermissions.menuList);
        setMenu2Hash(arrayMenus);
      }
      // Get hash structure   获取hash 格式的route
      return routeHash;
    },
    extendRoutes: function(routePermission) {
      // Filtering local routes, get actual routing
      let actualRouter = [];
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(route => {
          let pathKey = (base ? base + '/' : '') + route.path;
          if (routePermission[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path);
            }
            replyResult.push(route);
          }
        });
        if (base) {
          return replyResult;
        } else {
          actualRouter = actualRouter.concat(replyResult);
        }
      }
      findLocalRoute(AllRoutesData[0].children);
      
      // If the user does not have any routing authority
      if (!actualRouter || !actualRouter.length) {
        // clear token, refresh page will jump to login screen.
        util.session('token','');
        // Interface hints
        return document.body.innerHTML = ('<h1>账号访问受限，请联系系统管理员！</h1>');
      }
      
      actualRouter.map(e => {

        // Copy 'children' to 'meta' for rendering menu.(This step is optional.)

        if (e.children) {
          if (!e.meta) e.meta = {};
          e.meta.children = e.children;
        }
        
        // Add Per-Route Guard
        // To prevent manual access to ultra vires routing after switching accounts
        
        return e.beforeEnter = (to, from, next) => {
          if(routePermission[to.path]){
            next()
          }else{
            next('/401')
          }
        }
      });

      // Add actual routing to application

      let originPath = util.deepcopy(AllRoutesData);
      originPath[0].children = actualRouter;
      this.$router.addRoutes(originPath.concat([{
        path: '*',
        redirect: '/404'
      }]));

      // Save information for rendering menu.(This step is optional.)
      
      // this.$root.menuData = actualRouter;

    },
    signin: function(callback) {
      let vm = this;
      /*
      * Step 1
      * Check whether the user has access  //检查用户是否已经有访问权限
      */
      let localUser = util.session('token');
      if (!localUser) {
        return vm.$router.push({ path: '/login', query: { from: vm.$router.currentRoute.path } });
      }

      /*
      * Step 2
      * Set Authorization   //授权
      */

      instance.defaults.headers.common['token'] = localUser;
      /*
      * Step 2-1(This step is optional.)
      * Get user`s permissions  获取权限
      * You can also get permission information upon user login, it depends on the implementation of the backend interface
      */
//        instance.get(`/ruyingcai-web/sys/user/info`, {//获取登录后的用户信息
//             params: {
//               Authorization: localUser
//             }
//           }).then((res) => {//获取用户信息后展示
//             // 保存用户信息至全局状态
//             vm.$root.userData = res.data.user
//   
// 
//           });
    instance.get(`/AlipayAward/menus`).then((res)=>{//请求权限接口
      if(res.data.success){
          let userPermissions = res.data.content;
          let setMenuData = JSON.parse(JSON.stringify(res.data.content.menuList));
          vm.$root.menuData = util.getTreeData(setMenuData);
					
					// 当用户刷新时从本地存储读取用户信息
					vm.$root.userData = util.session('userData');
        /*
        * Step 3
        * Get resourcePermission form user permissions  获取用户资源权限
        * Like this:
        * { "get,/url1": true, "post,/url2": true, ... }
        */
        
        let resourcePermission = String(userPermissions.permissions);
        util.session('btn',resourcePermission)
        
        /*
        * Step 4
        * Get routePermission form user permissions  获取用户路由访问权限
        * Like this:
        * { "/route1": true, "/route2": true, ... }
        */
        
        let routePermission = vm.getRoutes(userPermissions);
        
        /*
        * Step 5
        * Setting request permission control through resourcePermission 设置请求权限控制资源权限
        */

        // vm.setInterceptor(resourcePermission);   当前先注销掉   请求权限判断
        
        /*
        * Step 6
        * Adding routing privileges to users   添加用户router 访问权限
        */

        vm.extendRoutes(routePermission);

        /*
        * Step 7
        * Implementing $_has function, support for the directive "has" (in /main.js)
        * Input: Array, like this: ['get,/some-uri']
        * Output: Boolean
        */
        Vue.prototype.$_allow =function(btn){
          return true
        }
        Vue.prototype.$_has = function(rArray) {
          let RequiredPermissions = [];
          let permission = true;
          
          if (Array.isArray(rArray)) {
            rArray.forEach(e => {
              if(e && e.p){
                RequiredPermissions = RequiredPermissions.concat(e.p);
              }
            });
          } else {
            if(rArray && rArray.p){
              RequiredPermissions = rArray.p;
            }
            
          }
          
          for(let i=0;i<RequiredPermissions.length;i++){
            let p = RequiredPermissions[i];
            if (!resourcePermission[p]) {
              permission = false; 
              break;
            }
          }
          
          return permission;
        }
        typeof callback === 'function' && callback();
        }else{
          vm.$message(res.data.msg);
          vm.logoutDirect();
        }
      })
      
     
    },
    loginDirect: function(newPath){
      /*
      * Monitor login events
      * Will trigger the events in views/login.vue
      */
      this.signin(() => {
        this.$router.replace({path: newPath || '/'});
      });
    },
    logoutDirect: function(){
      /*
      * Monitor logout events
      * Will trigger the events in views/index.vue
      */
      this.$root.menuData = {};
			this.$root.userData = ''
			util.session('userData','');
      //Clear local user information
      util.session('token','');
      //Clear request permission
      instance.interceptors.request.eject(myInterceptor);
      //Clear Authorization
      instance.defaults.headers.common['token'] = '';
      //Back to login page
      this.$router.replace({path: '/login'});
    }
  },
  created: function(newPath) {
    /*
    * Start from here!
    */
    this.signin();
  }
}
</script>