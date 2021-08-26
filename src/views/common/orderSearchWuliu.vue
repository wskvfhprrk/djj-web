<style scoped>
	.childreList{
		margin: 20px
	}
  .left{
    float: left;
  }
  .right{
    float: right;
  }
	.bigBox{
		height: 500px;
		overflow-y: auto;
		overflow-x: hidden; 
	}
  .titleBox{
    padding: 0px 20px;
  }
  .content{
    margin: 0 auto;
    text-align: left;
    display: block;
    width: 50%;
    
  }
   ul li:last-child .content{
    font-size:16px;
    color: green;
  }
</style>

<template>
  <div>
    <el-collapse @change="handelChange">
      <el-collapse-item title="物流信息" name="1">
      <div style="overflow:hidden;margin-bottom:20px">
        <span style="float:left">订单号：{{this.orderMark}}</span>
      </div>
      <ul>
          <li style="overflow:hidden" v-for="item in dataArr">
            <div class="titleBox">
              <span class="right">{{item.opeTitle}}</span>
              <span class="left">{{item.opeTime}}</span>
              <span class="content">{{item.opeRemark}}</span>
            </div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import * as publicapi from '../../api/publicapi.js'
	export default  {
		props: {
        orderMark: String,
    },
		data ( ) {
			return {
				data:this.partData,
        active:1,
        dataArr:[],
			}
    },
    mounted(){
    },
    methods:{
      handelChange(arr){
        if(arr.length!=0){
          this.getdata()
        }
      },
      getdata(){
        var vm = this;
        var param = {
          express_id:this.orderMark
        }
        publicapi.ordersearch.r(param).then(res =>{
          if(res.data.code=='0'){
            if(res.data.data.data.length=='0'){
              res.data.data.data.push({//京东未扫码前无数据  模拟京东数据
                "opeTitle":'尚未揽收',
                "opeTime":'2019/01/06',
                "opeRemark":'您的货物尚未揽收',
                "opeName":'京东快递',
                "wa+ybillCode":'快递单号'
              })
              vm.dataArr = res.data.data.data;
            }else{
              vm.dataArr = res.data.data.data
            }
          }else{
            this.$message.error(res.data.msg)
          }
        })
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