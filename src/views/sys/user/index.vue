<template>
    <div v-loading="loading">
        <!-- 操作 start -->
        <div class="searchBox">
            <el-row :gutter="20" class="operation">
                <el-col class="marginBottom" :span="6">
                    <span class="labelSpan">用户名： </span>
                    <el-input class="SearchInput" v-model="orderCLass" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button size="medium" type="primary" v-allow="user_get" @click="search">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 操作 end-->

        <!-- table start  -->
        <div class="resultBox">
            <el-row :gutter="20">
                <el-col class="title" :span="24">
                    <h4>查询结果</h4>
                </el-col>
                <el-button class="addBtn" @click="add" v-allow="user_post" size="medium" type="primary">新增</el-button>
            </el-row>
            <el-table :data="list" border style="width: 100%">
                <!-- <el-table-column prop="userId" label="用户ID" align="center">
                 </el-table-column>-->
                <el-table-column prop="realName" label="真实姓名" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="userType" label="用户类型" align="center" :formatter="status"></el-table-column>
                <el-table-column label="操作" width="350" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" v-allow="user_*_get" @click="view(scope.$index,scope.row)">
                            查看
                        </el-button>
                        <el-button size="mini" type="info" v-allow="user_put" @click="edit(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="info" v-allow="user_*_delete"
                                   @click="deleteHandel(scope.$index,scope.row)">删除
                        </el-button>
                        <el-button size="mini" type="info" v-allow="resetPassword_post"
                                   @click="resetPassword(scope.$index,scope.row)">重置密码
                        </el-button>
                    </template>
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

        <!-- 查看   新增   编辑  表单 -->
        <el-dialog
                :title="modelTitle"
                :visible.sync="dialogFormVisible01"
                width="50%" :center="center">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                            <el-input :disabled="disabled=='2'||disabled=='1'" class="SearchInput" v-model="form.username"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--<el-form-item label="所属部门" :label-width="formLabelWidth" style="border:1px solid #fff"
                                      prop="deptId">
                            <el-select v-model="form.deptId" :disabled="disabled=='1'" class="SearchInput"
                                       placeholder="请选择">
                                <el-option
                                        v-for="item in partData"
                                        :key="item.deptId"
                                        :label="item.deptName"
                                        :value="item.deptId"
                                ></el-option>
                            </el-select>
                        </el-form-item>-->
                        <el-form-item label="角色" :label-width="formLabelWidth" style="border:1px solid #fff"
                                      prop="roleIds">
                            <el-select
                                    v-model="form.roleIds"
                                    :disabled="disabled=='1'"
                                    class="SearchInput"
                                    multiple
                                    collapse-tags
                                    placeholder="请选择">
                                <el-option
																	v-for="item in roleListDown"
																	:key="item.roleId"
																	:label="item.roleName"
																	:value="item.roleId">
																</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                            <el-input :disabled="disabled!='0'" type="password" class="SearchInput"
                                      v-model="form.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.email"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.phone"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.address"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.remark"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                            <el-radio-group v-model="form.status" :disabled="disabled=='1'">
                                <el-radio :label="0">正常</el-radio>
                                <!--<el-radio :label="1">异常</el-radio>-->
                                <el-radio :label="2">锁定</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <span style="color: red">注：添加用户不填写密码或重置密码为：888888</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isView&&modelTitle=='新增'" @click="submitHandle">提 交</el-button>
        <el-button type="primary" v-if="!isView&&modelTitle=='编辑'" @click="editsubmit">提 交</el-button>
        <el-button @click="dialogFormVisible01 = false">取 消</el-button>
      </span>
        </el-dialog>

        <!-- 是否确认 提交 确认 end -->
    </div>
</template>

<script>
    import * as order from '../../../api/role.js';
    import * as publicapi from '../../../api/publicapi.js';
    import * as util from '../../../assets/util.js'

    export default {
        data() {
            return {
							roleListDown:[],
                roleListDownDefault: '',
                whlist: [],
                searchParam: '',                //当前查询条件
                center: true,
                list: [],
                loading: false,
                totalCount: 0,                   //数据总条数
                pageSize: 15,                    // 每页数据条数
                pageNumber: 1,                     //当前页
                order: 'asc',                    //排序方式
                dialogFormVisible01: false,
                modelTitle: "新增",
                orderCLass: '',                  //票种查询条件 值
                isView: false,
                form: {},
                disabled: '0',
                partData: [],
                nowPart: '',
                userType: [],
                formLabelWidth: "120px",
                termArr: '',
                disableSearch: true,
                rules: {
                    userType: [
                        {required: true, message: '请选择用户类型', trigger: 'change'},
                    ],
                    status: [
                        {required: true, message: '请设置用户状态', trigger: 'change'},
                    ],
                    deptId: [
                        {required: false, message: '请选择所属部门', trigger: 'change'},
                    ],
                    email: [
                        {required: true, message: '请输入名称', trigger: 'change'},
                        {type: 'email', max: 30, message: '邮箱格式有误', trigger: 'change'},
                    ],
                    username: [
                        {required: true, message: '请输入名称', trigger: 'change'},
                        {max: 36, message: '输入最大长度为 36 个字符', trigger: 'change'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '输入字符非法'}
                    ],
                    realName: [
                        {required: true, message: '请输入真实姓名', trigger: 'change'},
                        {max: 20, message: '输入最大长度为 20 个字符', trigger: 'change'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '输入字符非法'}
                    ],
                    password: [
                        // {required: true, message: '请输入密码', trigger: 'change'},
                        {max: 30, message: '输入最大长度为 30 个字符', trigger: 'change'},
												{min: 6, message: '密码最低长度为6个字符', trigger: 'change'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '输入字符非法'}
                    ],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'change'},
                        {max: 30, message: '输入最大长度为 30 个字符', trigger: 'change'},
                        {pattern: /^((0\d{2,3}-\d{7,8})|(1[3567894]\d{9}))$/, message: '号码格式不正确或者位数不正确'}
                    ],
                    address: [
                        {required: true, message: '请输入详细地址', trigger: 'change'},
                        {min: 1, max: 50, message: '请输入长度在 1 到 50 个字符', trigger: 'change'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_()]+$/, message: '输入字符非法'}
                    ],
                    remark: [
                        {min: 1, max: 40, message: '请输入长度在 1 到 40 个字符', trigger: 'change'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_()]+$/, message: '输入字符非法'}
                    ],
                    roleIds: [
                        {required: true, message: '角色是必选择项', trigger: 'change'},
                    ]
                },
            }
        },
        methods: {
            typeChange(val) {
                var vm = this;
                vm.pData = '';
                vm.dData = '';
                vm.form.twarehouseCode = '';
                var param = {
                    whType: val
                };
                // order.userTypeCheck.r(param).then((res) => {

                //     if (res.data.success) {
                //         vm.srFlag = res.data.data.srFlag;
                //         vm.dcFlag = res.data.data.dcFlag;
                //         if (!res.data.data.srFlag && !res.data.data.dcFlag) {
                //             vm.disableSearch = false;
                //         } else {
                //             vm.disableSearch = true;
                //         }
                //     } else {

                //         vm.loading = false;
                //         vm.$message.error(res.data.msg);

                //     }
                // });
            },
            status(val) {
                // console.log(val)
                switch (val.userType) {
                    case 1 :
                        return "公司员工";
                    case 2 :
                        return "商家";
                    case 4 :
                        return "回收渠道";
                    default:
                        return "";
                }
            },
            handleCurrentChange001(row) {
                var vm = this;
                vm.termArr = row.whId
            },
            search() {
                var vm = this;
                if (vm.orderCLass != '' && vm.orderCLass != 'undefined') {

                    vm.searchParam = {
                        "username": vm.orderCLass
                    }
                } else {
                    vm.searchParam = {
                        "username": ''
                    }
                }
                vm.fetchData();
            },
            fetchData(param) {//查询

                var vm = this;
                vm.loading = true;
                let params = {}
                if (param) {
                    Object.assign(param, vm.searchParam)
                    params = param
                } else {
                    params = {
                        'pageSize': vm.pageSize,
                        'pageNumber': '1',
                    }
                    Object.assign(params, vm.searchParam)
                }
                var str = '';
                for (var i in params) {
                    str += i + '=' + params[i] + '&';
                }
                str.slice(0, str.length - 1)
                order.userList.r(str).then((res) => {
                    if (res.data.success) {
                        vm.list = res.data.content.pages;
                        vm.pageNumber = res.data.content.pageNumber;
                        vm.pageSize = res.data.content.pageSize;
                        vm.totalCount = res.data.content.totle;
                        vm.loading = false;
                        vm.$message.success('数据请求成功');

                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                });
            },

            //分页函数
            handleCurrentChange(val) {

                var vm = this;
                vm.pageNumber = val;
                vm.fetchData({'pageNumber': vm.pageNumber, 'pageSize': vm.pageSize})

            },
            handleSizeChange(val) {

                var vm = this;
                vm.pageSize = val;
                vm.fetchData({'pageNumber': vm.pageNumber, 'pageSize': vm.pageSize})

            },

            add() {
                this.getRoleListDown();
                var vm = this;
                vm.form = {
                    roleIds:[]
                };
                vm.disabled = '0';

                vm.dialogFormVisible01 = true;
                vm.isView = false,
                vm.modelTitle = '新增'
                if (vm.$refs['ruleForm']) {
                    vm.$refs['ruleForm'].resetFields()
                }
            },
            edit(item, data) {
                this.getRoleListDown();
                var vm = this;
                vm.dialogFormVisible01 = true;
                vm.modelTitle = '编辑';
                vm.isView = false,
                    // vm.loading = true;
                    vm.disabled = '2';
                vm.getViewInfo(data)

            },
            view(item, data) {
                var vm = this;
                vm.isView = true,
                vm.modelTitle = '详情';
                vm.dialogFormVisible01 = true;
                vm.disabled = '1';
                vm.getViewInfo(data)

            },
            getViewInfo(data) {
                var vm = this;
                vm.dialogFormVisible01 = true;
								vm.form = {
									roleIds:[]
								};
                order.userInfo.r(data.userId).then(res => {
                    if (res.data.success) {
                        vm.loading = false;
                        vm.form = res.data.content;
                        if (vm.$refs['ruleForm']) {
                            vm.$refs['ruleForm'].resetFields()
                        }
                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                })
            },
            submitHandle() {//新增提交
                var vm = this;
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
                vm.loading = true
                order.userAdd.r(vm.form).then(res => {
                    if (res.data.success) {

                        vm.$message.success('保存成功');
                        this.search()
                        vm.dialogFormVisible01 = false;
                        vm.loading = false;

                    } else {

                        vm.loading = false;
                        // this.search()
                        vm.$message.error(res.data.msg);

                    }
                })
            },
            editsubmit() {//编辑提交
                var vm = this;
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
                vm.loading = true
                order.userUpdate.r(vm.form).then(res => {
                    if (res.data.success) {

                        vm.$message.success('保存成功')
                        vm.dialogFormVisible01 = false;
                        this.search()
                        vm.loading = false;

                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.code);

                    }
                })
            },
            deleteHandel(item, data) {
                var vm = this;
                vm.loading = true;
                order.userRemove.r([data.userId]).then(res => {
                    if (res.data.success) {
                        vm.$message.success('已删除');
                        vm.loading = false;
                        vm.search();

                    } else {
                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                })
            },
            resetPassword(item, data) {
                var vm = this;
                vm.loading = true;
                var params = {
                    'userId': data.userId
                };
                order.resetPassword.r(params).then(res => {
                    if (res.data.success) {
                        vm.$message.success('重置成功');
                        vm.loading = false;
                        vm.search();
                    } else {
                        vm.loading = false;
                        vm.$message.error(res.data.msg)
                    }
                })
            },

            getRoleListDown() {
                var vm = this;
                order.roleList.r().then((res) => {//获取部门信息
                    vm.roleListDown = res.data.content
                });
            },


        },
        created() {
            this.getPartData();
            this.getRoleListDown();
        }
    }
</script>
