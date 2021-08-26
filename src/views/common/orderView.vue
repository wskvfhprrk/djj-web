<style scoped>
	.childreList{
		margin: 20px;
		padding: 20px;
		line-height: 30px;
	}
	.bigBox{
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden; 
		background: #fff
	}
</style>

<template>
  <div class="bigBox">
    <h4 class="title">订单信息</h4>
    <el-row>
      <el-col :span="12">
        <div>
          <span>订单号：</span>
          <span>{{partData.order_id}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>新建日期：</span>
          <span>{{partData.create_time}}</span>
        </div>
      </el-col>
       <el-col :span="24" v-if="partData.shop_type==1">
        <div>
          <span>订票方类型：</span>
          <span>{{partData.shop_type==1?'二类网点':""}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>票种数：</span>
          <span>{{partData.totalGoods}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>订单金额：</span>
          <span>{{partData.totalMoney}}元</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>状态：</span>
          <span>{{orderStatus}}</span>
        </div>
      </el-col>

      <el-col :span="12">
        <div>
          <span>订票方：</span>
          <span>{{partData.DCName}}</span>
        </div>
      </el-col>
      
      <el-col :span="24">
        <div>
          <span>配送地址：</span>
          <span>{{partData.DCAddress}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>联系人：</span>
          <span>{{partData.DCPeopleName}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>联系电话：</span>
          <span>{{partData.DCphone}}</span>
        </div>
      </el-col>
    </el-row>
    <h4 class="title" style="margin-top:30px">子订单信息</h4>
    <template v-for="(item,index) in partData.sub_data">
      <el-row class="childreList" key="Math.random()">
        <el-col :span="12">
          <div>
            <span>票种：</span>
            <span>{{item.goodsName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>数量：</span>
            <span>{{item.goodsNumber}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>子订单编号：</span>
            <span>{{item.suborder_id}}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            <span>发货批次：</span>
            <span>{{item.batch}}</span>
          </div>
        </el-col>
        <el-col :span="24">
              <ordersearch :orderMark="item.express_id"></ordersearch>
        </el-col>
        <!-- 展示进度条信息 -->
        <el-col :span="24">
          <el-collapse>
            <el-collapse-item title="订单流程" name="1">
              <el-steps :active="item.suborder_status" finish-status="success">
                <el-step title="确认"></el-step>
                <el-step title="出库"></el-step>
                <el-step title="签收"></el-step>
              </el-steps>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
import ordersearch from './orderSearchWuliu.vue'
	export default  {
    components: {
      ordersearch
    },
		props: {
        partData: String,
    },
		data ( ) {
			return {
				data:'',
				active:1,
			}
    },
    computed: {
      orderStatus: function () {
        var vm =this;
        var s=''
        switch(vm.partData.order_status){
                  case 0: s="已创建" 
                              break;
                  case 1: s="已确认" 
                              break;
                  case 2: s="已出库" 
                              break;
                  case 3: s="已完成" 
                              break;
                  case 4: s="已撤销" 
                              break; 
                  default : s="未知" 
                              break;
            }
        return s;
      }
    },
    watch:{
      newdata(newdata,olddata){
        this.data = JSON.parse( newdata );
      },
      deep:true
    },
    updated( props){
    },
		methods:{
			handlechange (arr) {
			}
		},
		created(){
		}
	}

</script>