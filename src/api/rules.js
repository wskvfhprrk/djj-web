import instance from './index';
const preUrlPath = '/AlipayAward';
//获取列表
const list = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/rycDeliveryRule/list`, {params})
  }
};
const remove ={
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/rycDeliveryRule/delete`, {params})
  }
}
const view01 = {
  p: ['get,/menu/list'],
  r: params => {
    return instance.get(`${preUrlPath}/rycDeliveryRule/info`, {params})
  }
};
const edit = {
  p: ['get,/roles'],
  r: params => {
    return instance.post(`${preUrlPath}/rycDeliveryRule/update`, params)
  }
};
const add = {
  p: ['get,/roles'],
  r: params => {
    return instance.post(`${preUrlPath}/rycDeliveryRule/save`, params)
  }
};
export {
  list,
  remove,
  view01,
  edit,
  add,
}
