<template>
  <div v-loading="loading">
    <!-- 操作 start -->
    <div class="searchBox">
    <el-row :gutter="20" class="operation">
      <el-col class="marginBottom" :span="8">
          <span class="labelSpan">用户名：</span>
          <el-input class="SearchInput" v-model="condSR" @change="getDcData" placeholder="请输入">
          </el-input>
        </el-col>
          <el-col :span="8">
          <span class="labelSpan">起止日期：</span>
          <el-date-picker
            v-model="searchDate"
            class="SearchInput"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </el-col>
      <el-col :span="8">
        <el-button size="medium" type="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>
    </div>
   <!-- 操作 end-->

    <!-- table start  -->
    <div class="resultBox">
			<el-row :gutter="20" >
      <el-col class="title" :span="24">
        <h4>查询结果</h4>
      </el-col :span="12">
      <el-button class="addBtn" @click="excelFileF" size="medium" type="primary">导出</el-button>
    </el-row>
    <el-table :data="list" border style="width: 100%" show-summary>
      <el-table-column prop="id" label="id" align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="operation" label="用户操作" align="center">
      </el-table-column>
      <el-table-column prop="method" label="请求方法" align="center">
      </el-table-column><el-table-column prop="params" label="请求参数" align="center">
      </el-table-column>
      <el-table-column prop="time" label="执行时长（毫秒）" align="center">
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" align="center">
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center">
      </el-table-column>
    </el-table>

    <!-- pagination start -->
    <el-pagination
     background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[15,50,100]"
      :page-size=15
      prev-text='上一页'
      next-text='下一页'
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </div>
    <!-- pagination end -->
     <!-- table end  -->
  </div>
</template>
 
<script>
import * as publicapi from '../../../api/publicapi.js';
import * as order from '../../../api/role.js';
import { dateFormat } from '../../../assets/util.js';


export default {
  data() {
    return {
      searchParam :'',                //当前查询条件
      center:true,
      list: [],
      loading: false,
      totalCount:0,                   //数据总条数
      pageSize:15,                    // 每页数据条数
      pageNumber:1,                     //当前页
      order:'asc',                    //排序方式
		dialogFormVisible:false,
		dialogFormVisible01:false,
      modelTitle:"详情",
		orderCLass:'',                  //票种查询条件 值
		isView:false,
      fromdata:'{"orderClassName":"","orderItemPMoney":""}',
      orderDataList:[],
      gameId:"",
      pickerOptions2: {
        //查询条件   时间选择  快捷键配置
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ProvinceData: [
        {
          //省份 select 配置
          province: "",
          sr_code: "",    
          city_list: [
            {
              dc_code: "",
              city: ""
            }
          ]
        }
      ],
      condSR: "", //当前选择的省份 数据
      dcData: [
        {
          // dc  select 配置
          city: "",
          dc_code: ""
        }
      ],
      condDC: "", //当前选中的dc 数据
      dcAbled: true, //查询条件 dc  disabled 控制 flag
      disabled:'0',
      searchDate:'', //查询 时间范围数据
    }
  },
  watch:{
    orderDataList(newData){
      this.orderDataList = newData
    }
  },
  methods: {
     excelFileF(){
      var vm = this;
      var param = {
        'startTime':vm.searchDate[0],
        'endTime':vm.searchDate[1],
        'type':'2',
      }
          publicapi.excelFile.r(param).then(res =>{
            const file = res.data;
            var elink = document.createElement('a');  
            elink.download = "sr库存.xlsx";
            elink.style.display = 'none';
            var blob = new Blob([file]);
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
          })
    },
    getOrderData (){
      var vm = this;
      publicapi.getTicketList.r().then(res =>{
         if(res.data.success){
            vm.orderDataList = res.data.data;
         }
      })
    },
    search () {
      var vm =this;
      vm.searchParam = {
        'startTime':vm.searchDate[0],
        'endTime':vm.searchDate[1],
      }
      vm.fetchData();
    },
    fetchData ( param ) {//查询

      var vm = this;
      vm.loading = true;
      let params = {}
      
      if( param ) {
        Object.assign(param,vm.searchParam)
        params= param
      
      } else {

        params={
          'pageSize' : vm.pageSize,
          'pageNumber' : '1',
        }
        Object.assign(params,vm.searchParam)
      }
      order.log.r( params ).then( ( res ) => {
        if( res.data.success ) {
          var s =0
          vm.list = res.data.page.list;
          
          vm.pageNumber = res.data.page.pageNumber;
          vm.pageSize = res.data.page.pageSize;
          vm.totalCount = res.data.page.totalCount;
          vm.loading = false;
          vm.$message.success( '数据请求成功' );
        
        } else {

          vm.loading = false;
          vm.$message.error(res.data.msg);
        
        }
      });
    },
    //分页函数 
    handleCurrentChange( val ){

      var vm = this;
      vm.pageNumber = val;
      vm.fetchData({'pageNumber':vm.pageNumber,'pageSize':vm.pageSize})
    
    },

    handleSizeChange( val ) {

      var vm = this;
      vm.pageSize = val;
      vm.fetchData({'pageNumber':vm.pageNumber,'pageSize':vm.pageSize})
    
    },
	},  
  created ( ) {
    this.searchDate = [dateFormat("yyyy-MM-dd",new Date()),dateFormat("yyyy-MM-dd",new Date())];
  }
}
</script>