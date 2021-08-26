 <style scoped>

.extendGroup {
  float: right;
  margin-right: 20px;
  opacity: 0;
}

.el-tree-node__content:hover .extendGroup {
  opacity: 1;
}
</style>

<template>
  <div v-loading="loading">
    <!-- 操作 -->
    <div class="operation">

      <el-button size="small" type="primary"  @click="fetchData">查询</el-button>
      <el-button size="small" type="primary"  @click="addData">新增</el-button>
      
      <!-- <el-button size="small" v-if="$_has([role.request]) && canReset">重置</el-button> -->
      <!-- <el-button size="small" type="info" @click="requestNotAllowed">尝试发起越权请求</el-button> -->
    </div>
    <!-- table start  -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="角色ID" width="120">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> 
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门" >
      </el-table-column>
      <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" >
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="editData(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click= "removeData(scope.$index, scope.row)">删除</el-button>
         <!--  <el-popover
            placement="left"
            width="100"
            v-model="visible2">
            <p>确定删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            
          </el-popover> -->
          
        </template>
      </el-table-column>
    </el-table>
    <!-- table end  -->

    <!-- pagination start -->
    <el-pagination
     background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[10,15,30]"
      :page-size=10
      prev-text='上一页'
      next-text='下一页'
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <!-- pagination end -->

    <!-- model  start-->
    <el-dialog :title="modelTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.roleName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属部门" :label-width="formLabelWidth">
              <el-select v-model="form.deptId" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
           </el-col>
        </el-row>
         <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
         </el-col>
        </el-row>
         <el-form-item label="功能权限" :label-width="formLabelWidth">
          <el-tree
              
            :data="data2"
            :default-checked-keys="form.menuIdList"
            v-model="form.menuIdList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="modelTitle=='新增'" @click="addDataHandle">确 定</el-button>
        <el-button type="primary" v-if="modelTitle=='编辑'" @click="editDataHandle">确 定</el-button>
      </div>
    </el-dialog>
    <!-- model end  -->
  </div>
</template>

<script>
import * as role from '../api/role';
import * as util from '../assets/util.js';
let myMixin = {
  data: function() {
    return { role }
  }
}
export default {
  mixins: [myMixin],
  data() {
    return {
      searchParam:'',
      list: [],
      canReset: true,
      loading: false,
      totalCount:0,
      pageSize:10,// 每页数据条数
      pageNumber:1, //当前页
      order:'asc',//排序方式
      dialogFormVisible:false,
      defaultProps:[],
      visible2:false,
      modelTitle:"新增",
      data2:[],
      rolesInfo:{},
      part:[],//部门信息
      menuIdList:[],//默认选中的权限信息
      form: {
          roleName: '',
          remark: '',
          menuIdList:[],
          deptId:'',
        },
      formLabelWidth:'120px'
    }
  },
  methods: {
    fetchData(param) {//查询
      this.loading = true;
      var vm = this;
      let params = {}

      if(param){  
        params= param
      }else{
        params={
          'pageSize' : 10,
          'pageNumber' : 1,
        }
      }
      role.request.r(params).then((res) => { 
        if(res.data.code==0){
          this.list = res.data.page.list;
          this.pageNumber = res.data.page.pageNumber;
          this.pageSize = res.data.page.pageSize;
          this.totalCount = res.data.page.totalCount;
          this.loading = false;
        }else{
          this.loading = false;
          vm.$message.error('请求发生错误，请确认网络后重新登录');
        }
        
      });
    },
    getData(){//新增或编辑计入页面后清空及获取数据
      var vm = this;
      vm.form = {
          roleName: '',
          remark: '',
          menuIdList:[],
          deptId:'',
        }
      vm.dialogFormVisible= true;
      role.rolesPower.r().then(( res ) => {
      vm.data2 = util.getTreeData(res.data);
      });
      role.rolesPart.r().then(( res ) => {
        vm.part = res.data
      });
    },
    addData () {//新增点击事件
      var vm = this;
      vm.menuIdList=[];
      vm.modelTitle = '新增'
      vm.getData();
    },
    editData (index,row) {//编辑点击事件
      var vm = this;
      vm.modelTitle = '编辑'
      vm.getData();
      var param = {roleId:row.roleId}
      role.rolesInfo.r(param).then(( res ) => {
          vm.rolesInfo = res.data.role;
          vm.menuIdList = res.data.role.menuIdList;
          vm.form= res.data.role
      });

    },
    removeData (index,row) {//删除点击事件
      var vm = this;
      vm.visible2 = true;
       var param = {roleId:row.roleId}
      role.rolesDelete.r(param).then(( res ) => {
          vm.rolesInfo = res.data.role;
          vm.menuIdList = res.data.role.menuIdList;
          vm.form= res.data.role;
      });
    },
    addDataHandle ( ) {//新增提交事件
      let vm = this;
      vm.getCheckedNodes();
      role.addRolesHandle.r(vm.form).then(( res ) => {

        // 缺少提交成功的判断
         vm.$message.success('保存成功');
         vm.fetchData()//新增完成后查询第一页数据
      });
    },
    editDataHandle (){//编辑提交事件
      let vm = this;

      vm.menuIdList = [];
      vm.fetchData({'pageNumber':vm.pageNumber,'pageSize':vm.pageSize})//编辑完成后查询当前页数据
    },
    //分页函数 
    handleCurrentChange(val){
      var vm = this;
      this.pageNumber = val;
      this.fetchData({'pageNumber':vm.pageNumber,'pageSize':vm.pageSize})
    },
    handleSizeChange(val){
      var vm = this;
      this.pageSize = val;
      this.fetchData({'pageNumber':vm.pageNumber,'pageSize':vm.pageSize})
    },
    getCheckedNodes() {//获取树 tree 组件选中项
        this.form.menuIdList = this.$refs.tree.getCheckedKeys();
    },
  },
  created() {
    this.fetchData()
  }
}
</script>