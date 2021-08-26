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
	 	<h3 class="title">DC订单信息</h3>
		<el-row style="line-height:30px;padding-left:15px">
			<el-col :span=12>
				<div><span>票种数量：</span><span style="color:red">{{partData.totalNum}}</span>种</div>
				
			</el-col>
			<el-col :span=12>
				<div><span>订单总金额：</span><span style="color:red">{{partData.totalNum}}</span>元</div>
				
			</el-col>
			<el-col :span=12>
				<div><span>订单状态：</span><span>{{partData.status?"已确认":"未确认"}}</span></div>
				
			</el-col>
			
			<el-col :span=12>
				<div><span>订票方：</span><span>{{partData.DCName}}</span></div>
			</el-col>
			<el-col :span=24>
				<div><span>配送地址：</span><span>{{partData.DCAddress}}</span></div>
			</el-col>
			<el-col :span=12>
				<div><span>联系人：</span><span>{{partData.DCPeopleName}}</span></div>
			</el-col>
			<el-col :span=12>
				<div><span>联系电话：</span><span>{{partData.DCphone}}</span></div>
			</el-col>
		</el-row>
		<h4 class="title" style="margin-top:30px">票种数量信息</h4>
		<template  v-for ="(item,inde) in partData.orderClass">
			<el-row class="childreList">
				
				<el-col :span=8>
					<div><span>订单号：</span><span>{{item.orderClassName}}</span></div>
				</el-col>
				<el-col :span=8>
					<div><span>订票方：</span><span>{{item.orderClassName}}</span></div>
				</el-col>
				<el-col :span=8>
					<div><span>数量：</span><span>{{item.number}}</span></div>
				</el-col>
				<el-col :span=8>
					<div><span>金额：</span><span>{{item.number}}</span></div>
				</el-col>
			</el-row>
		</template>
	</div>

</template>
<script>
	export default  {
		props:["partData"],
		data ( ) {
			return {
				data:this.partData,
				active:1,
			}
		},
		created(){
		}
	}

</script>