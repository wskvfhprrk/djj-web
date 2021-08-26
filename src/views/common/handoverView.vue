<style scoped>
	.childreList{
		margin: 20px
	}
	.bigBox{
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden; 
	}
</style>

<template>
  <div class="bigBox">
    <h3 class="title">交接单信息</h3>
    <el-row style="line-height:30px;padding-left:15px">
      <el-col :span="24">
        <div>
          <span>交接单号：</span>
          <span>{{partData.batch}}</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div>
          <span>交接单日期：</span>
          <span>{{partData.orderDate}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>总箱数：</span>
          <span style="color:red">{{partData.totalNum}}</span>箱
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <span>总金额：</span>
          <span style="color:red">{{partData.totalMoney}}</span>元
        </div>
      </el-col>
    </el-row>
    <h4 class="title" style="margin-top:30px">订单列表</h4>
    <template v-for="(item,index) in partData.sub_data" >
      <el-row class="childreList" key="Math.random()">
        <el-col :span="12">
          <div>
            <span>订票方：</span>
            <span>{{item.DCname}}</span>
          </div>
        </el-col>
         <el-col :span="12">
          <div>
            <span>子订单号：</span>
            <span>{{item.suborder_id}}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            <span>配送地址：</span>
            <span>{{item.DCAddress}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>联系人：</span>
            <span>{{item.DCPeopleName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>联系电话：</span>
            <span>{{item.DCphone}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>票种：</span>
            <span>{{item.orderClassName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>数量：</span>
            <span>{{item.boxNumber}}箱</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>金额：</span>
            <span>{{item.orderMoney}}元</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>快递单号：</span>
            <span>{{item.express_id}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>备注：</span>
            <span>{{item.remark}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span>状态：</span>
            <span>{{item.suborder_status}}</span>
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
	export default  {
		props: {
        partData: String,
    },
		data ( ) {
			return {
				data:this.partData,
				active:1,
			}
    },
     watch:{
      newdata(newdata,olddata){
        this.data = JSON.parse( newdata );
      },
      deep:true
    },
		created(){
		}
	}

</script>