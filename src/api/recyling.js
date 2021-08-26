import instance from './index';
const preUrlPath = '/AlipayAward';
//获取列表
const list = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/recyclingChannels?`+params)
  }
};
const remove ={
  p: ['get,/menu/list'],
  r: params => {
    return instance.delete(`${preUrlPath}/recyclingChannels/${params}`)
  }
}
const view = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/recyclingChannels/${params}`)
  }
};
const edit = {
  p: ['get,/roles'],
  r: params => {
    return instance.put(`${preUrlPath}/recyclingChannels`, params)
  }
};
const add = {
  p: ['get,/roles'],
  r: params => {
    return instance.post(`${preUrlPath}/recyclingChannels`, params)
  }
};
export {
  list,
  remove,
  view,
  edit,
  add,
}
