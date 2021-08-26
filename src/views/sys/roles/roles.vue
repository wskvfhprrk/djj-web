<style scoped>

    .extendGroup {
        float: right;
        margin-right: 20px;
        opacity: 0;
    }

    .el-tree-node__content:hover .extendGroup {
        opacity: 1;
    }

    /*.title{
      padding-bottom: 10px
    }
    .border{
      padding-bottom: 10px ;
      border-bottom: 1px solid #ccc;
    }*/
</style>
<template>
    <div v-loading="loading">
        <!-- 操作 -->
        <!-- <div class="searchBox">
          <el-row :gutter="20" class="operation">
            <el-col :span="6" class="marginBottom"><el-input v-model="searchParam" placeholder="请输入内容" clearable></el-input></el-col>
            <el-col :span="6" class="marginBottom"><el-button size="medium"  type="primary"  @click="fetchData">查询</el-button></el-col>
          </el-row>
         </div>-->
        <!-- table start  -->
        <div class="resultBox">
            <el-row :gutter="20">
                <el-col class="title" :span="24">
                    <h4>查询结果</h4>
                </el-col>
                <el-button class="addBtn" @click="addData" size="medium" v-allow="role_post" type="primary">新增
                </el-button>
            </el-row>

            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="roleId" label="角色ID" width="120" align="center" >
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center">
                </el-table-column>
                <el-table-column prop="roleDescribe" label="角色描述" align="center">
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="powerBtn(scope.row)">授权</el-button>
                        <el-button size="mini" type="info" @click="editData(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="removeData(scope.row)" v-show="scope.row.roleId==1?false:true">删除</el-button>
                        <el-popover
                                placement="left"
                                width="160"
                                v-model="visible2">
                            <p>确定删除？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                            </div>
                        </el-popover>
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
                    :total="totle">
            </el-pagination>
        </div>
        <!-- pagination end -->

        <!-- model  start-->
        <el-dialog :title="modelTitle" :visible.sync="dialogFormVisible" width="50%" :center="center">
            <el-form :model="form" style="overflow:hidden" :rules="rules" ref="ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                            <el-input v-model="form.roleName" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDescribe">
                            <el-input v-model="form.roleDescribe" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="modelTitle=='新增'" @click="addDataHandle">确 定</el-button>
                <el-button type="primary" v-if="modelTitle=='编辑'" @click="editDataHandle">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="权限信息" :visible.sync="dialogFormVisible12" center="true">
            <el-tree
                    :data="partData"
                    :default-checked-keys="choosePower"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer" center='true'>
                <el-button type="primary" @click="partClick">确 定</el-button>
                <el-button @click="dialogFormVisible12 = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- model end  -->
    </div>
</template>

<script>
    import * as role from '../../../api/role';
    import * as util from '../../../assets/util.js';

    export default {

        data() {
            return {
                partDisabled: true,
                center: true,
                searchParam: '',
                list: [],
                canReset: true,
                loading: false,
                totle: 0,
                pageSize: 10,// 每页数据条数
                pageNumber: 1, //当前页
                order: 'asc',//排序方式
                dialogFormVisible: false,
                defaultProps: [],
                visible2: false,
                modelTitle: "新增",
                data2: [],
                rolesInfo: {},
                partData: [],
                choosePower: [],
                dialogFormVisible12: false,
                menuIdList: [],//默认选中的权限信息
                nowPart: {},
                chooseRole: '',
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {max: 30, message: '输入最大长度为 30 个字符', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '输入字符非法'}
                    ],
                    roleDescribe: [
                        {min: 1, max: 50, message: '请输入长度在 1 到 50 个字符', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_()]+$/, message: '输入字符非法'}
                    ]
                },
                form: {
                    roleName: '',
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            fetchData(param) {//查询
                this.loading = true;
                var vm = this;
                let params = {}

                if (param && !param.type) {
                    param.roleName = this.searchParam
                    params = param
                } else {
                    params = {
                        'pageSize': this.pageSize,
                        'pageNumber': '1',
                        'roleName': this.searchParam,
                    }
                }
                var str = '';
                for (var i in params) {
                    str += i + '=' + params[i] + '&';
                }
                role.request.r(str).then((res) => {
                    if (res.data.success) {
                        this.list = res.data.content.pages;
                        this.pageNumber = res.data.content.pageNumber;
                        this.pageSize = res.data.content.pageSize;
                        this.totle = res.data.content.totle;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        vm.$message.error('请求发生错误，请确认网络后重新登录');
                    }
                });
            },
            getData() {//新增或编辑计入页面后清空及获取数据
                var vm = this;
                vm.form = {}
                vm.dialogFormVisible = true;
            },
            addData() {//新增点击事件
                var vm = this;
                vm.menuIdList = [];
                vm.modelTitle = '新增'
                vm.getData();
                if (vm.$refs['ruleForm']) {
                    vm.$refs['ruleForm'].resetFields()
                }
            },
            editData(val) {//编辑点击事件
                var vm = this;
                vm.modelTitle = '编辑'
                vm.getData();
                role.rolesInfo.r(val.roleId).then((res) => {
                    vm.form = res.data.content;
                    if (vm.$refs['ruleForm']) {
                        vm.$refs['ruleForm'].resetFields()
                    }
                });

            },
            removeData(data) {//删除点击事件
                var vm = this;
                role.rolesDelete.r(data.roleId).then((res) => {
                    if (res.data.success) {
                        vm.$message.success('删除成功')
                        vm.fetchData();
                    } else {
                        vm.$message.error(res.data.msg)
                    }
                });
                // vm.visible2 = true;
            },
            addDataHandle() {//新增提交事件
                let vm = this;
                var flag = true;//默认允许提交
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        flag = true;
                    } else {
                        flag = false
                        return false;
                    }
                });
                if (!flag) {
                    return false;
                }
                role.addRolesHandle.r(vm.form).then((res) => {
                    if (res.data.success) {
                        // 缺少提交成功的判断
                        vm.$message.success('保存成功');
                        vm.dialogFormVisible = false
                        vm.fetchData()
                    } else {
                        vm.$message.error(res.data.msg)
                    }

                });
            },
            powerBtn(val) {
                var vm = this;
                vm.dialogFormVisible12 = true
                vm.chooseRole = val.roleId;
                role.rolesPower.r(val.roleId).then((res) => {
                    // 缺少提交成功的判断
                    if (res.data.success) {
                        vm.choosePower = res.data.content.map(item => {
                            if (item.isCheck) {
                                return item.menuId;
                            }
                        })
                        vm.partData = util.getTreeData(res.data.content, 0);
                    } else {
                        vm.$message.error(res.data.msg)
                    }
                });
            },
            editDataHandle() {//编辑提交事件
                let vm = this;
                var flag = true;//默认允许提交
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        flag = true;
                    } else {
                        flag = false
                        return false;
                    }
                });
                if (!flag) {
                    return false;
                }
                role.roleUpdate.r(vm.form).then((res) => {
                    // 缺少提交成功的判断
                    if (res.data.success) {
                        vm.$message.success('保存成功');
                        vm.dialogFormVisible = false;
                        vm.fetchData()
                    } else {
                        vm.$message.error(res.data.msg)
                    }
                });
                vm.menuIdList = [];
            },
            partClick() {
                var vm = this;
                vm.loading = true;
                var nodes = vm.$refs.tree.getCheckedNodes();
                var chooseMenu = nodes.map(item => {
                    return {"menuId": item.id, "parentId": item.parentId}
                })
                var param = {
                    roleId: vm.chooseRole,
                    menuList: chooseMenu
                }
                role.connectMenu.r(param).then(res => {
                    if (res.data.success) {
                        vm.$message.success("授权成功")
                        vm.loading = false;
                        vm.dialogFormVisible12 = false;
                    } else {
                        vm.$message.error(res.data.msg)
                        vm.loading = false;
                    }
                })
            },
            //分页函数
            handleCurrentChange(val) {
                var vm = this;
                this.pageNumber = val;
                this.fetchData()
            },
            handleSizeChange(val) {
                var vm = this;
                vm.pageSize = val;
                vm.fetchData()
            },
        },
        created() {
            this.fetchData();
        }
    }
</script>
