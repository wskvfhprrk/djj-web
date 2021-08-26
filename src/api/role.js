import instance from './index';
const preUrlPath = '/AlipayAward';
//获取角色列表
const request = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/role?`+params)
  }
};
//角色删除
const rolesDelete = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.delete(`${preUrlPath}/role/${params}`)
  }
};

// 获取用角色信息
const rolesInfo = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/role/${params}`)
  }
};
const roleUpdate = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.put(`${preUrlPath}/role`,params)
  }
};
// 新增角色信息
const addRolesHandle = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/role`, params)
  }
};
//   人员关联角色
const connectRole = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/userRole`, params)
  }
};

// 角色关联菜单
const connectMenu = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/roleMenu`, params)
  }
};

// 请求权限数据
const rolesPower = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/allMenu/${params}`)
  }
};

const userList = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/user?`+params+'')
  }
};
const userInfo = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/user/${params}`)
  }
};
const userUpdate = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.put(`${preUrlPath}/user`, params)
  }
};
const userAdd = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/user`, params)
  }
};
const userRemove = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.delete(`${preUrlPath}/user/${params}`)
  }
};
const resetPassword = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/resetPassword`,params)
  }
};
const deptInfo = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/sys/dept/info/${params}`)
  }
};
const deptUpdate = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/sys/dept/update`, params)
  }
};
const deptAdd = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/sys/dept/save`, params)
  }
};
const deptRemove = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/sys/dept/delete`, params)
  }
};

// 请求部门信息
const rolesPart =  {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/dept`, {params})
  }
};

// 请求部门信息
const rolesPart01 =  {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/deptAllForDropDown`, {params})
  }
};
// 请求部门信息
const getPart =  {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/deptAllForDropDown`, {params})
  }
};
// 请求用户类型数据
const userType =  {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/tusertype/select`, {params})
  }
};
// 请求角色类型数据
const roleType =  {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/sys/role/select`, {params})
  }
};

// 菜单
const menuList = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/menu`)
  }
};
const menuInfo = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/menu/${params}`)
  }
};
const menuSelect = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/parentMenu`, {params})
  }
};
const menuUpdate = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.put(`${preUrlPath}/menu`, params)
  }
};
const menuAdd = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/menu`, params)
  }
};
const menuRemove = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.delete(`${preUrlPath}/menu/${params}`)
  }
};


const intevalList = { //定时任务查询
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/quartz`, {params})
  }
};
const intevalUpdate = { //定时任务更新
  p: ['get,/menu/list'],
  r: params => {
    return instance.put(`${preUrlPath}/quartz`, params)
  }
};
const intevalRemove = { //定时任务删除
  p: ['get,/menu/list'],
  r: params => {
    return instance.delete(`${preUrlPath}/quartz/${params}`)
  }
};
const intevalAdd = { //定时任务保存
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/quartz`, params)
  }
};
const intevalInfo = { //定时任务详情
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/quartz/${params}`)
  }
};
const intevalStop = { //定时任务暂停
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/sys/schedule/pause`, params)
  }
};
const intevalStart = { //定时任务立即执行
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/quartzStart`, params)
  }
};
const intevalBack = { //定时任务
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/sys/schedule/resume`, params)
  }
};
const logList = { //定时任务  日志获取
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/sys/scheduleLog/list`, {params})
  }
};

const log = { //系统日志  日志获取
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/sys/log/list`, {params})
  }
};

const roleList = { //系统日志  日志获取
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/allRole`, {params})
  }
};




export {
  roleList, 
  intevalList,
  intevalUpdate,
  intevalRemove,
  intevalInfo,
  intevalAdd,
  intevalStop,
  intevalStart,
  intevalBack,
  request,
  rolesPower,
  rolesPart,
  rolesInfo,
  roleUpdate,
  addRolesHandle,
  rolesDelete,
  userAdd,
  userInfo,
  userList,
  userRemove,
  userUpdate,
  resetPassword,
  deptAdd,
  deptInfo,
  deptRemove,
  deptUpdate,
  userType,
  roleType,
  getPart,

  menuAdd,
  menuInfo,
  menuList,
  menuSelect,
  menuRemove,
  menuUpdate,
  logList,
  log,
	
  rolesPart01,
	connectRole,
	connectMenu,
}
