list:{
                code:0,
                pageSize:10,
                pageNumber:1,
                list:_.times(10,function(n){
                   return {
                        orderId: faker.random.uuid(),
                        totalNum:faker.random.number(),
                        orderDate:faker.date.past(),
                        orderFlag:faker.random.boolean(),//订单是否确认
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