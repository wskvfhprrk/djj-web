import instance from './index';
const preUrlPath = '/AlipayAward';
//获取账户列表
const request = {
  p: ['get,/accounts'],
  r: params => {
    return instance.get(`${preUrlPath}/accounts`, {params})
  }
}
//删除账户
const remove = {
  p: ['delete,/account/**'],
  r: params => {
    return instance.delete(`${preUrlPath}/account/${params.id}`)
  }
};

//修改账户
const edit = {
  p: ['get,/account/**'],
  r: params => {
    return instance.get(`${preUrlPath}/setPassword`, {params})
  }
};
//越权请求
const notAllowed = {
  p: ['get,/roles/notAllowed'],
  r: params => {
    return instance.get(`${preUrlPath}/roles/notAllowed`, {params})
  }
}

export {
  request,
  remove,
  edit,
  notAllowed
}
