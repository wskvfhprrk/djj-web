import instance from './index';

const preUrlPath = '/AlipayAward';
//获取列表
const list = {
    p: ['get,/roles'],
    r: params => {
        return instance.get(`${preUrlPath}/orders?` + params)
    }
};
const historylist = {
    p: ['get,/roles'],
    r: params => {
      return instance.get(`${preUrlPath}/ordersHistory?`+params)
    }
  };
const getOrderByDay = {
    p: ['get,/roles'],
    r: params => {
        return instance.get(`${preUrlPath}/getOrderByDay?` + params)
    }
};
const downloadExcel = {
    p: ['get,/roles'],
    r: params => {
        return instance.get(`${preUrlPath}/downloadExcel?` + params,{responseType:'blob'})
    }
};
const remove = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.delete(`${preUrlPath}/orders/${params}`)
    }
};
const canal = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.put(`${preUrlPath}/canalOrder?${params}`)
    }
};
const view = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.get(`${preUrlPath}/orders/${params}`)
    }
};
const edit = {
    p: ['get,/roles'],
    r: params => {
        return instance.put(`${preUrlPath}/orders`, params)
    }
};
const add = {
    p: ['get,/roles'],
    r: params => {
        return instance.post(`${preUrlPath}/orders`, params)
    }
};

const add01 = {
    p: ['get,/roles'],
    r: params => {
        return instance.post(`${preUrlPath}/coupon`, params)
    }
};
const batchCanalOrder = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.put(`${preUrlPath}/batchCanalOrder?${params}`)
    }
};
const batchAffirmOrder = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.put(`${preUrlPath}/batchAffirmOrder/${params}`)
    }
};
const batchSign = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.put(`${preUrlPath}/batchSign/${params}`)
    }
};
const batchDeliveryStroe = {
    p: ['get,/menu/list'],
    r: params => {
        return instance.put(`${preUrlPath}/batchDeliveryStroe?${params}`)
    }
};
export {
    list,
    remove,
    view,
    edit,
    add,
    canal,
    downloadExcel,
    batchDeliveryStroe,
    batchAffirmOrder,
    batchCanalOrder,
    getOrderByDay,
    batchSign,
    historylist
}
