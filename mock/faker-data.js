module.exports = function () {
    var faker = require("faker");
    faker.locale = "zh_CN";
    var _ = require("lodash");
    return {
        people: _.times(100, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        }),
        address: _.times(100, function (n){
            return {
                id: faker.random.uuid(),
                city: faker.address.city(),
                county: faker.address.county()
            }
        }),
        login:{
            code:'0',
            token:faker.random.uuid()
        },
        info:{"code":0,"user":{"userId":1,"username":"businessDistrict","password":"9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d","salt":"YzcmCZNvbXocrsz9dm8e","email":"2170983087@qq.com","mobile":"15888888888","status":1,"roleIdList":null,"createUserId":null,"createTime":"2016-11-11 11:11:11","deptId":1,"deptName":null}},
        nav1:{
                "menuList": [{
                    "menuId": 1,
                    "parentId": 0,
                    "parentName": null,
                    "name": "系统管理",
                    "url": null,
                    "perms": null,
                    "type": 0,
                    "icon": "fa fa-cog",
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 2,
                    "parentId": 1,
                    "parentName": null,
                    "name": "用户管理",
                    "url": "modules/sys/user.html",
                    "perms": null,
                    "type": 1,
                    "icon": "fa fa-user",
                    "orderNum": 1,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 31,
                    "parentId": 1,
                    "parentName": null,
                    "name": "部门管理",
                    "url": "modules/sys/dept.html",
                    "perms": null,
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 1,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 3,
                    "parentId": 1,
                    "parentName": null,
                    "name": "角色管理",
                    "url": "modules/sys/role.html",
                    "perms": null,
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 2,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 4,
                    "parentId": 1,
                    "parentName": null,
                    "name": "菜单管理",
                    "url": "modules/sys/menu.html",
                    "perms": null,
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 27,
                    "parentId": 1,
                    "parentName": null,
                    "name": "配置管理",
                    "url": "modules/sys/config.html",
                    "perms": "sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete",
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 6,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 38,
                    "parentId": 0,
                    "parentName": null,
                    "name": "调度管理",
                    "url": null,
                    "perms": null,
                    "type": 0,
                    "icon": "fa fa-cog",
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 6,
                    "parentId": 38,
                    "parentName": null,
                    "name": "定时任务",
                    "url": "modules/job/schedule.html",
                    "perms": null,
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 1,
                    "open": null,
                    "list": null
                }, { 
                    "menuId": 39,
                    "parentId": 0,
                    "parentName": null,
                    "name": "日志管理",
                    "url": null,
                    "perms": null,
                    "type": 0,
                    "icon": "fa fa-cog",
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 29,
                    "parentId": 39,
                    "parentName": null,
                    "name": "系统日志",
                    "url": "modules/sys/log.html",
                    "perms": "sys:log:list",
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 7,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 40,
                    "parentId": 0,
                    "parentName": null,
                    "name": "系统监控",
                    "url": null,
                    "perms": null,
                    "type": 0,
                    "icon": "fa fa-cog",
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 41,
                    "parentId": 40,
                    "parentName": null,
                    "name": "eureka",
                    "url": "http://localhost:8761/",
                    "perms": null,
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 5,
                    "parentId": 40,
                    "parentName": null,
                    "name": "连接池监控",
                    "url": "druid/sql.html",
                    "perms": null,
                    "type": 1,
                    "icon": "fa fa-cubes",
                    "orderNum": 4,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 43,
                    "parentId": 0,
                    "parentName": null,
                    "name": "订单管理",
                    "url": "",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                },{
                    "menuId": 45,
                    "parentId": 43,
                    "parentName": null,
                    "name": "订单新增",
                    "url": "terminal",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                },{
                    "menuId": 46,
                    "parentId": 43,
                    "parentName": null,
                    "name": "订单确认",
                    "url": "confirmOrder",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                },{
                    "menuId": 47,
                    "parentId": 43,
                    "parentName": null,
                    "name": "交接单",
                    "url": "sign",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                },{
                    "menuId": 48,
                    "parentId": 43,
                    "parentName": null,
                    "name": "交接单发货",
                    "url": "sign_agin",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                },{
                    "menuId": 49,
                    "parentId": 43,
                    "parentName": null,
                    "name": "订票查询",
                    "url": "localOrder",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                },{
                    "menuId": 50,
                    "parentId": 43,
                    "parentName": null,
                    "name": "首页",
                    "url": "indexView",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                },{
                    "menuId": 51,
                    "parentId": 43,
                    "parentName": null,
                    "name": "增删改",
                    "url": "standard",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 55,
                    "parentId": 0,
                    "parentName": null,
                    "name": "取票查询",
                    "url": "",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 56,
                    "parentId": 55,
                    "parentName": null,
                    "name": "取票查询(sr)",
                    "url": "SRTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 56,
                    "parentId": 55,
                    "parentName": null,
                    "name": "取票查询(DC)",
                    "url": "DCTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 56,
                    "parentId": 55,
                    "parentName": null,
                    "name": "取票查询(wd)",
                    "url": "WDTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 56,
                    "parentId": 55,
                    "parentName": null,
                    "name": "取票查询(zd)",
                    "url": "ZDTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                },{
                    "menuId": 51,
                    "parentId": 43,
                    "parentName": null,
                    "name": "增删改",
                    "url": "standard",
                    "perms": "",
                    "type": 1,
                    "icon": null,
                    "orderNum": 0,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 55,
                    "parentId": 0,
                    "parentName": null,
                    "name": "取票查询",
                    "url": "",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 56,
                    "parentId": 55,
                    "parentName": null,
                    "name": "综合查询",
                    "url": "ZMTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 57,
                    "parentId": 55,
                    "parentName": null,
                    "name": "SR",
                    "url": "SRTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                }, {
                    "menuId": 58,
                    "parentId": 55,
                    "parentName": null,
                    "name": "DC",
                    "url": "DCTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                },{
                    "menuId": 61,
                    "parentId": 55,
                    "parentName": null,
                    "name": "网点",
                    "url": "WDTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                },{
                    "menuId": 62,
                    "parentId": 55,
                    "parentName": null,
                    "name": "终端",
                    "url": "ZDTicketSearch",
                    "perms": null,
                    "type": 0,
                    "icon": null,
                    "orderNum": 3,
                    "open": null,
                    "list": null
                },{
                "menuId": 52,
                "parentId": 0,
                "parentName": null,
                "name": "电子券",
                "url": "",
                "perms": null,
                "type": 0,
                "icon": null,
                "orderNum": 3,
                "open": null,
                "list": null
            }, {
                "menuId": 53,
                "parentId": 52,
                "parentName": null,
                "name": "彩票关联",
                "url": "couponBatch",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            }, {
                "menuId": 54,
                "parentId": 52,
                "parentName": null,
                "name": "取票统计",
                "url": "couponBatchPay",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            },{
                "menuId": 58,
                "parentId": 0,
                "parentName": null,
                "name": "库存管理",
                "url": "",
                "perms": null,
                "type": 0,
                "icon": null,
                "orderNum": 3,
                "open": null,
                "list": null
            },{
                "menuId": 59,
                "parentId": 58,
                "parentName": null,
                "name": "综合查询",
                "url": "ZMInevntor",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            }, {
                "menuId": 60,
                "parentId": 58,
                "parentName": null,
                "name": "SR",
                "url": "SRInevntor",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            }, {
                "menuId": 63,
                "parentId": 58,
                "parentName": null,
                "name": "DC",
                "url": "DCInevntor",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            },  {
                "menuId": 64,
                "parentId": 58,
                "parentName": null,
                "name": "网点",
                "url": "WDInevntor",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            }, {
                "menuId": 65,
                "parentId": 58,
                "parentName": null,
                "name": "终端",
                "url": "ZDInevntor",    
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            }, {
                "menuId": 66,
                "parentId": 58,
                "parentName": null,
                "name": "出入库查询",
                "url": "Access",
                "perms": "",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
            }],
                "code": 0,
                "permissions": ["sys:schedule:info", "sys:menu:update", "sys:menu:delete", "sys:dept:update", "sys:config:info", "sys:dept:info", "sys:menu:list", "sys:config:save", "sys:menu:perms", "sys:dept:delete", "sys:config:update", "sys:schedule:resume", "sys:dept:list", "sys:user:delete", "sys:dept:select", "sys:config:list", "sys:user:update", "sys:role:list", "sys:menu:info", "sys:menu:select", "sys:schedule:update", "sys:schedule:save", "sys:role:select", "sys:user:list", "roles:add", "sys:menu:save", "sys:role:save", "sys:schedule:log", "sys:role:info", "sys:schedule:delete", "sys:role:update", "sys:schedule:list", "sys:user:info", "sys:schedule:run", "sys:config:delete", "sys:role:delete", "sys:user:save", "sys:dept:save", "sys:schedule:pause", "sys:log:list"]

            },
            view01:{
                code:'0',
                msg:"",
                list:{
                    provinceName:faker.address.city(),
                    dcName:faker.address.city(),
                    orderMoney:faker.random.number(),
                    orderClassName:faker.name.firstName(),//订单名称
                    orderItemMoney:faker.random.number(10),//票种面值
                    orderItemPMoney:faker.random.number(500),//票种面值
                    orderItemNumber:faker.random.number(50),//票种箱数
    
                    // 电子券-彩票关联
                    activityId: faker.random.number(), //批号
                    gameId: faker.name.firstName(), //票种编号
                    gameName: faker.name.lastName(), //票种名称
                    createTime: faker.date.past(), //生成日期

                    activationTime: faker.date.recent(), //激活日期
                    effectiveTime: faker.date.recent(), //生效日期
                    expirationTime: faker.date.future(), //失效日期
    
                    payCount: faker.random.number(), //取票量
                    // orderDate:faker.date.past(),
    
    
                    // 用户管理
                    userId:faker.internet.userName(12),
                    userName:faker.name.firstName()+faker.name.lastName(),
                    passWord:faker.random.uuid(6),
                    userPart:faker.company.companyName(),
                    userConnect:faker.phone.phoneNumber(),
                    passWord:faker.internet.password(),
                }
            },
        list:{
                code:0,
                pageSize:10,
                pageNumber:1,
                totalCount:15,
                totalMoney:faker.random.number(10000,2000000000),
                list:_.times(15,function(n){
                   return {
                        orderId :faker.random.uuid(),//省份代码
                        orderNumber:faker.random.number(20),//订单数量
                        orderFlag:faker.random.boolean(),//订单金额
                        orderId:faker.random.uuid(),//订单id
                        deliverId:faker.random.uuid(),//订单发货批次
                        orderDate:faker.date.past(),

                        provinceName:faker.address.city(),
                        dcName:faker.address.city(),
                        orderMoney:faker.random.number(),
                        orderClassName:faker.name.firstName(),//订单名称
                        orderItemMoney:faker.random.number(10),//票种面值
                        orderItemPMoney:faker.random.number(500),//票种面值
                        orderItemNumber:faker.random.number(50),//票种箱数


                        terminalId:faker.random.uuid(),//终端编号（id）
                        terminalName:faker.name.firstName(),//终端名称
                        continuedDate:faker.random.number(),//持续时间 数量

                        // 交接单信息
                        handoverDate:faker.date.past(),//交接单时间
                        handoverID:faker.random.uuid(),//交接单号
                        handoverMoney:faker.random.number(),//交接单总金额
                        handoverStatus:faker.random.number(3),//交接单状态

                        // 新增订单
                        orderClassID:'000'+n,
                        stockMoney:faker.random.number(),//库存金额 数字
                        orederClassMoney:faker.random.number(100)*50,
                        num:0,
                        shopMoney:0,


                        // 电子券-彩票关联
                        activityId: faker.random.number(), //批号
                        gameId: faker.name.firstName(), //票种编号
                        gameName: faker.name.lastName(), //票种名称
                        createTime: faker.date.past(), //生成日期
                        activationTime: faker.date.recent(), //激活日期
                        effectiveTime: faker.date.recent(), //生效日期
                        expirationTime: faker.date.future(), //失效日期

                        payCount: faker.random.number(), //取票量
                        // orderDate:faker.date.past(),


                        // 用户管理
                        userId:faker.internet.userName(12),
                        userName:faker.name.firstName()+faker.name.lastName(),
                        passWord:faker.random.uuid(6),
                        userPart:faker.company.companyName(),
                        userConnect:faker.phone.phoneNumber(),
                        passWord:faker.internet.password(),

                        // orderDate:faker.date.past(),
                    }
                }),
            },
        delete:{
            code:'0',
                msg:"保存成功"
        },
        sign:{
                code:'0',
                msg:"保存成功"
            },
        add:{
            code:0,
            msg:"提交成功"
        },
        view:{
                code:'0',
                msg:'',
                orderId:faker.random.uuid(),   
                orderClass:_.times(3,function(n){
                   return {
                        orderClassName:faker.commerce.productName(),
                        number:faker.random.number(),
                        status:faker.random.boolean(),
                        id:faker.random.uuid(),
                        
                        deliverId:faker.random.uuid(),
                        logis:faker.address.city(),

                        // 订单确认详情
                        orderId:"0000"+n,
                        dcName:faker.address.city(),
                        Date:faker.date.past(),
                        orderMoney:faker.random.number(5000,20000),
                        // JDphone:faker.phone.phoneNumber(),
                        // DCphone:faker.phone.phoneNumber(),
                   } 
                }),
                totalNum:faker.random.number(),
                status:faker.random.boolean(),
                orderDate:faker.date.past(),
                DCphone:faker.phone.phoneNumber(),
                DCAddress:faker.address.city(),
                DCPeopleName:faker.name.firstName(),
                DCName:faker.address.city(),
            },
        placeOrder:{
            code:0,
            msg:"删除成功"
        },
        area:{
            code:'0',
            msg:"",
            list:_.times(10,function(n){
                return {
                    provinceName:faker.address.city(),
                    provinceCode:faker.random.uuid()
                }
            })
        },
        area01:{
            code:'0',
            msg:"",
            list:_.times(10,function(n){
                return {
                    dcName:faker.address.city(),
                    dcCode:faker.random.uuid()
                }
            })
        },
        view01:{
            code:'0',
            msg:"",
            list:{
                provinceName:faker.address.city(),
                dcName:faker.address.city(),
                orderMoney:faker.random.number(),
                orderClassName:faker.name.firstName(),//订单名称
                orderItemMoney:faker.random.number(10),//票种面值
                orderItemPMoney:faker.random.number(500),//票种面值
                orderItemNumber:faker.random.number(50),//票种箱数
            }
        },
        historyWork:{
            code:'0',
            msg:'',
            list:_.times(10,(n) => {
                return{
                    update_time:faker.date.past(),
                    status_code:faker.random.number(0,4),
                    status_name:faker.name.firstName(),
                }
            })
        }

    }
}