<template>
    <div v-loading="loading">
        <!-- 操作 start -->
        <div class="searchBox">
            <el-row v-model="queryParms" :gutter="20" class="operation">
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">昵称： </span>
                    <el-input class="SearchInput" v-model="queryParms.name" placeholder="请输入昵称"></el-input>
                    
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">性别： </span>
                    <!-- <el-input class="SearchInput" v-model="queryParms.sex" placeholder="请输入性别"></el-input> -->
                    <el-select placeholder="请选择性别" :disabled="disabled=='1'" v-model="queryParms.sex" autocomplete="off">
                            <el-option
                            v-for="item in sexs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-col>
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">生日： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.birthday" type="date" placeholder="选择生日"></el-date-picker>
                </el-col> -->
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">联系方式： </span>
                    <el-input class="SearchInput" v-model="queryParms.phone" placeholder="请输入联系方式"></el-input>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">角色： </span>
                    <el-select placeholder="请选择角色" :disabled="disabled=='1'" v-model="queryParms.role" autocomplete="off">
                            <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    <!-- <el-input class="SearchInput" v-model="queryParms.role" placeholder="请输入角色（0-老板 1-店长 2-员工）"></el-input> -->
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">店铺编号： </span>
                    <!-- <el-input class="SearchInput" v-model="queryParms.shopId" placeholder="请输入店铺编号"></el-input> -->
                    <el-select placeholder="请选择店铺" :disabled="disabled=='1'" v-model="queryParms.shopId" autocomplete="off">
                            <el-option
                            v-for="item in shops"
                            :key="item.shopId"
                            :label="item.name"
                            :value="item.shopId">
                            </el-option>
                        </el-select>
                </el-col>
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">创建时间： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.createTime" type="date" placeholder="选择创建时间"></el-date-picker>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">更新时间： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.updateTime" type="date" placeholder="选择更新时间"></el-date-picker>
                </el-col> -->
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">状态： </span>
                    <!-- <el-input class="SearchInput" v-model="queryParms.status" placeholder="请输入状态"></el-input> -->
                    <el-select placeholder="请选择状态" :disabled="disabled=='1'" v-model="queryParms.status" autocomplete="off">
                            <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-col>
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">用户在微信端的唯一标识： </span>
                    <el-input class="SearchInput" v-model="queryParms.openId" placeholder="请输入用户在微信端的唯一标识"></el-input>
                </el-col> -->
                <el-col :span="8">
                    <el-button size="medium" type="primary" v-allow="shopUser_get" @click="search">查询</el-button>
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
                <el-button class="addBtn" v-allow="shopUser_post" @click="add" size="medium" type="primary">新增
                </el-button>
            </el-row>
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="name" label="昵称" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
                <el-table-column prop="birthday" label="生日" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="role" label="角色" align="center" :formatter="roleFormat"></el-table-column>
                <el-table-column prop="shopId" label="店铺" align="center" :formatter="shopFormat"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" :formatter="statusFormat"></el-table-column>
                <el-table-column prop="openId" label="用户在微信端的唯一标识" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button v-allow="shopUser_put" size="mini" type="info" @click="updateStatus(scope.$index,scope.row)">
                            切换状态</el-button>
                        <el-button size="mini" type="danger" v-allow="shopUser_*_delete" @click="deleteHandel(scope.$index,scope.row)">
                            删除</el-button>
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
            <addpage :disabled="disabled" :fromdata="fromdata" ref="formPage"></addpage>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isView&&modelTitle=='新增'" @click="submitHandle">提 交</el-button>
        <el-button type="primary" v-if="!isView&&modelTitle=='编辑'" @click="updateStatussubmit">提 交</el-button>
        <el-button @click="dialogFormVisible01 = false">取 消</el-button>
      </span>
        </el-dialog>

        <!-- 是否删除  确认 start -->
        <el-dialog
                title="删除"
                :visible.sync="dialogFormVisible"
                width="30%" :center="center">
			<span>
      </span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </span>
        </el-dialog>
        <!-- 是否确认 提交 确认 end -->
    </div>
</template>

<script>
    import * as shopUser from '../../api/shopUser.js';
    import * as shop from '../../api/shop.js';
    import addpage from './view.vue';


    export default {
        components: {
            addpage
        },
        data() {
            return {
                queryParms:{},//查询参数
                fromdata:'',
                searchParam: '',                //当前查询条件
                center: true,
                list: [],
                loading: false,
                totalCount: 0,                   //数据总条数
                pageSize: 15,                    // 每页数据条数
                pageNumber: 1,                     //当前页
                order: 'asc',                    //排序方式
                dialogFormVisible: false,
                dialogFormVisible01: false,
                modelTitle: "新增",
                isView: false,
                islock: '',
                phone: "",
                options: [{
                    value: '0',
                    label: '未锁定'
                }, {
                    value: '1',
                    label: '锁定'
                }],
                value: '',
                shops:[],
                 sexs: [{ //
                    value: '0',
                    label: '男'
                    }, {
                    value: '1',
                    label: '女'
                    }],
                 status: [{ //
                    value: '0',
                    label: '正常'
                    }, {
                    value: '1',
                    label: '暂停'
                    }, {
                    value: '2',
                    label: '注销'
                    }],
                 roles: [{ //（0-老板 1-店长 2-员工）
                    value: '0',
                    label: '老板'
                    }, {
                    value: '1',
                    label: '店长'
                    }, {
                    value: '2',
                    label: '店员'
                    }],
            }
        },
        methods: {
            search() {
                var vm = this;
                vm.fetchData();
            },
            shopFormat(val) {
                 var arr=[];
                this.shops.map(item=>{
                    if(item.shopId==val.shopId){
                    arr.push(item.name);
                    }
                });
                return arr.join()
            },
            statusFormat(val) {
                 var arr=[];
                this.status.map(item=>{
                    if(item.value==val.status){
                    arr.push(item.label);
                    }
                });
                return arr.join()
            },
            sexFormat(val) {
                 var arr=[];
                this.sexs.map(item=>{
                    if(item.value==val.sex){
                    arr.push(item.label);
                    }
                });
                return arr.join()
            },
            roleFormat(val) {
                 var arr=[];
                this.roles.map(item=>{
                    if(item.value==val.role){
                    arr.push(item.label);
                    }
                });
                return arr.join()
            },
            fetchData(param) {//查询
                var vm = this;
                vm.loading = true;
                let queryParms = this.queryParms;
                queryParms.pageSize = vm.pageSize;
                queryParms.pageNumber = vm.pageNumber

                var str = '';
                for (var i in queryParms) {
                    if (queryParms[i]) {
                        str += i + '=' + queryParms[i] + '&';
                    }
                }
                str.slice(0, str.length - 1)
                shopUser.list.r(str).then((res) => {
                    if (res.data.success && res.data.content.pages != null) {
                        vm.list = res.data.content.pages;
                        vm.pageNumber = res.data.content.pageNumber;
                        vm.pageSize = res.data.content.pageSize;
                        vm.totalCount = res.data.content.totle;
                        vm.loading = false;
                        vm.$message.success('数据请求成功');
                    } else if (res.data.success && res.data.content.pages == null) {
                        vm.list = res.data.content.pages;
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
            //添加打开新建view
            add() {
                var vm = this;
                vm.dialogFormVisible01 = true;
                vm.isView = false,
                    vm.modelTitle = '新增'
                vm.disabled = '0';
                // vm.fromdata = '';
                if (vm.$refs.formPage) {
                    vm.$refs.formPage.$refs['ruleForm'].resetFields()
                }
            },
            view(item, data) {
                var vm = this;
                vm.isView = true,
                    vm.dialogFormVisible01 = true;
                // vm.loading = true;
                // 设置disablked
                vm.disabled = '1';
                vm.fromdata = '';
                vm.getViewInfo(data)
            },
            updateStatus(data,row) {
                var vm = this;
                shopUser.updateStatus.r(row.userId).then(res => {
                    if (res.data.success) {
                        vm.loading = false;
                        vm.search();
                    } else {
                        vm.$message.error(res.data.msg)
                    }
                })
            },
            submitHandle() {//新增提交
                var vm = this;
                var flag = true;//默认允许提交
                vm.$refs.formPage.$refs["ruleForm"].validate((valid) => {
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
                shopUser.add.r(vm.$refs.formPage.form).then(res => {
                    if (res.data.success) {

                        vm.$message.success('保存成功');
                        this.search()
                        vm.dialogFormVisible01 = false;
                        vm.loading = false;

                    } else {
                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                })
            },
            updateStatussubmit() {//新增提交
                var vm = this;
                var flag = true;//默认允许提交
                vm.$refs.formPage.$refs["ruleForm"].validate((valid) => {
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
                // shopUser.updateStatus.r(vm.$refs.formPage.form).then(res => {
                //     if (res.data.success) {

                //         vm.$message.success('保存成功')
                //         vm.dialogFormVisible01 = false;
                //         this.search()
                //         vm.loading = false;
                //     } else {
                //         vm.loading = false;
                //         vm.$message.error(res.data.code);
                //     }
                // })
            },
            clock(item, data) {
                var vm = this;
                vm.loading = true;
                
                var param = data.userId;
                shopUser.clock.r(param).then(res => {
                    if (res.data.success) {
                        vm.$message.success('切换');
                        vm.loading = false;
                        vm.search();
                    } else {
                        vm.$message.error(res.data.msg)
                        vm.loading = false;
                        // vm.fetchData();
                    }
                })
            },
            click(item, data) {
                var vm = this;
                vm.loading = true;
                
                var param = data.userId;
                shopUser.click.r(param).then(res => {
                    if (res.data.success) {
                        vm.$message.success('切换');
                        vm.loading = false;
                        vm.search();
                    } else {
                        vm.$message.error(res.data.msg)
                        vm.loading = false;
                        // vm.fetchData();
                    }
                })
            },
            deleteHandel(item, data) {
                var vm = this;
                vm.loading = true;
                
                var param = data.userId;
                shopUser.remove.r(param).then(res => {
                    if (res.data.success) {
                        vm.$message.success('已删除');
                        vm.loading = false;
                        vm.search();
                    } else {
                        vm.$message.error(res.data.msg)
                        vm.loading = false;
                        // vm.fetchData();
                    }
                })
            },
            getAll(){
                shop.getAll.r(0).then(res => {
                    if (res.data.success) {
                        this.shops=res.data.content;
                    } else {
                        vm.$message.error(res.data.msg)
                        vm.loading = false;
                    }
                })
            }
        },
        //启动时首先启动
        created() {
            this.getAll();
            this.fetchData()
        }
    }
</script>
