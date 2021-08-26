import instance from './index';
const preUrlPath = '/AlipayAward';
//获取列表
const list = {
  p: ['get,/roles'],
  r: params => {
    return instance.post(`${preUrlPath}/business/list`, params)
  }
};
const Info ={
  p: ['get,/menu/list'],
  r: params => {
    return instance.post(`${preUrlPath}/business/detail`, params)
  }
}

export {
  list,
	Info,
}
