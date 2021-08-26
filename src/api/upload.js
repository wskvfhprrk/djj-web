import instance from './index';
//与后台保持一致的url前置
const preUrlPath = '/AlipayAward';

const upload = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.post(`${preUrlPath}/fdfs`, params)
    }
};
const remove = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.delete(`${preUrlPath}/fdfs`+params)
    }
};

export {
    upload,
    remove
}
