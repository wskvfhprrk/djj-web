import instance from './index';
const preUrlPath = '/AlipayAward';

// 用户下拉
const userSelect = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/alluser/${params}`)
  }
}
// 用户下拉
const businessSelect = {
  p: ['get,/roles'],
  r: params => {
    return instance.get(`${preUrlPath}/getMerchantDown`)
  }
}



export {
  userSelect,
	businessSelect
}
