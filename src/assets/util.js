import Vue from 'vue'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)

//sessionStorage
export const session = function(key, value){
  if (value === void(0)) {
    var lsVal = sessionStorage.getItem(key);
    if(lsVal && lsVal.indexOf('autostringify-') === 0 ){
      return JSON.parse(lsVal.split('autostringify-')[1]);
    }else{
      return lsVal;
    }
  }else {
    if (typeof(value)==="object" || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value);
    }
    return sessionStorage.setItem(key, value);
  }
} 

//生成随机数
export const getUUID = function (len) {
  len = len || 6;
  len = parseInt(len, 10);
  len = isNaN(len) ? 6 : len;
  var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
  var seedLen = seed.length - 1;
  var uuid = "";
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)];
  }
  return uuid;
};
//深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};
//菜单数据组织
export const buildMenu = function (array, ckey) {
  let menuData = [];
  let indexKeys = Array.isArray(array) ? array.map((e) => {return e.menuId}) : [];
  ckey = ckey || 'parentId';
  array.forEach(function (e) {
    //一级菜单
    if (!e[ckey] || (e[ckey]===e.menuId)) {
      delete e[ckey];
      menuData.push(deepcopy(e)); //深拷贝
    }else if(Array.isArray(indexKeys)){
      //检测ckey有效性
      let parentIndex = indexKeys.findIndex(function(id){
        return id == e[ckey];
      });
      if(parentIndex===-1){
        menuData.push(e);
      }
    }
  });
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.menuId === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node);
            } else {
              parentNode.children = [node];
            }
          }
        });
        if (parentNode.children) {
          findChildren(parentNode.children);
        }
      });
    }
  };
  findChildren(menuData);
  return menuData;
}
//日期格式化
export const dateFormat = function (fmt, date) {
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};
//ajax错误处理
export const catchError = function(error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.data.message || '请求参数异常',
          type: 'error'
        });
        break;
      case 401:
        sessionStorage.removeItem('user');
        Vue.prototype.$message({
          message: error.response.data.message || '密码错误或账号不存在！',
          type: 'warning',
          onClose: function(){
            location.reload();
          }
        });
        break;
      case 403:
        Vue.prototype.$message({
          message: error.response.data.message || '无访问权限，请联系企业管理员',
          type: 'warning'
        });
        break;
      default:
        Vue.prototype.$message({
          message: error.response.data.message || '服务端异常，请联系技术支持',
          type: 'error'
        });
    }
  }
  return Promise.reject(error);
}

// 树状结构组合函数
export const getTreeData= function (data,startNumber){
  startNumber = startNumber?startNumber:'0';
      var menudata = [];
      for(var i=0;i<data.length;i++){
        if(data[i].parentId==startNumber){
          data[i].label = data[i].menuName;
          data[i].id = data[i].menuId;
          data[i].children = [];
          menudata.push(data[i]);
          data.splice(i,1);
          i--
        }
      }
      function getRoute(menudata){
        for(var j=0;j<menudata.length;j++){
          for(var h = 0;h<data.length;h++){
            if(menudata[j].menuId==data[h].parentId){
              data[h].label = data[h].menuName;
              data[h].id = data[h].menuId;
              data[h].children = [];
              menudata[j].children.push(data[h]);
              data.splice(h,1);
              h--;
            }
          }
        }
        if(data.length){
          for(var i = 0;i<menudata.length;i++){
            
            getRoute(menudata[i].children)
          }
        }
      }
      getRoute(menudata)
      return menudata
    }
    // 树状结构组合函数
export const getPartTreeData= function (data,startNumber){
      startNumber = startNumber?startNumber:'0';
      var menudata = [];
      for(var i=0;i<data.length;i++){
        if(data[i].parentId==startNumber){
          data[i].label = data[i].name;
          data[i].id = data[i].deptId;
          data[i].children = [];
          menudata.push(data[i]);
          data.splice(i,1);
          i--
        }
      }
      function getRoute(menudata){
        for(var j=0;j<menudata.length;j++){
          for(var h = 0;h<data.length;h++){
            if(menudata[j].deptId==data[h].parentId){
              data[h].label = data[h].name;
              data[h].id = data[h].deptId;
              data[h].children = [];
              menudata[j].children.push(data[h]);
              data.splice(h,1);
              h--;
            }
          }
        }
        if(data.length){
          for(var i = 0;i<menudata.length;i++){
            getRoute(menudata[i].children)
          }
        }
      }
      getRoute(menudata)
      return menudata
    }
