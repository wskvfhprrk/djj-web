list:{
                code:0,
                pageSize:10,
                pageNumber:1,
                list:_.times(10,function(n){
                   return {
                        terminalId:faker.random.uuid(),//终端编号（id）
                        terminalName:faker.name.firstName(),//终端名称
                        stockMoney:faker.random.number(),//库存金额 数字
                        lackMoney:faker.random.number(),//缺票金额 数字
                        waitMoney:faker.random.number(),//待配送金额 数字
                        allowMoney:faker.random.number(),//可配票金额
                        continuedDate:faker.random.number(),//持续时间 数量
                        isLack:faker.random.boolean(),//是否缺票  布尔值
                        isHaveOrder:faker.random.boolean(),//是否缺票  布尔值
                    }
                }),
            },
        edit:{
                code:'0',
                msg:"保存成功"
            },
        add:{
                code:'0',
                msg:"保存成功"
            },
        view:{
               code:'0',
                msg:'',
                orderId:faker.random.uuid(),   
                orderClass:_.times(100,function(n){
                   return {
                        orderClassName:faker.commerce.productName(),
                        number:faker.random.number(),
                        status:faker.random.boolean(),
                        id:faker.random.uuid(),
                        deliverId:faker.random.uuid(),
                        logis:faker.address.city(),
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
        delete:{
            code:0,
            msg:"删除成功"
        }