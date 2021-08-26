import instance from './index';

const preUrlPath = '/AlipayAward';
//获取列表
const list = {
    p: ['get,/roles'],
    r: params => {
        return instance.get(`${preUrlPath}/blacklist?` + params)
    }
};
const remove = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.delete(`${preUrlPath}/blacklist/${params}`)
    }
}
const lock = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.get(`${preUrlPath}/blacklistLock/${params}`)
    }
}
const noLock = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.get(`${preUrlPath}/blacklistNotLock/${params}`)
    }
}
const clock = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.get(`${preUrlPath}/blacklistLock/${params}`)
    }
};
const NoClock = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.get(`${preUrlPath}/blacklistNotLock/${params}`)
    }
};

export {
    list,
    remove,
    lock,
    noLock,
    // view,
    clock,
    NoClock,
}
