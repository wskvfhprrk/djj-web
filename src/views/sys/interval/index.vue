<template>
    <div v-loading="loading">
        <!-- 操作 start -->
        <!--<div class="searchBox">
            <el-row :gutter="20" class="operation">
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">bean名称: </span>
                    <el-input class="SearchInput" v-model="pData" placeholder="请选择"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button size="medium" type="primary" @click="search">查询</el-button>
                </el-col>
            </el-row>
        </div>-->
        <!-- 操作 end-->

        <!-- table start  -->
        <div class="resultBox">
            <el-row :gutter="20">
                <el-col class="title" :span="2">
                    <h4>查询结果</h4>
                </el-col>
                <el-col class="title" :span="12">
                    <span style="color: red;">此表更改需要技术人员修改，bean名称不能修改，cron配置不正确导致定时任务不能正确运行</span>
                </el-col>

                <el-button class="addBtn" @click="add" size="medium" type="primary">新增</el-button>
                <el-button class="addBtn" style="position:absoult;right:120px" @click="start" size="medium"
                           type="primary">全部执行
                </el-button>
            </el-row>
            <el-table :data="list" border style="width: 100%">
                <!--                <el-table-column-->
                <!--                        type="selection"-->
                <!--                        width="55">-->
                <!--                </el-table-column>-->
                <!-- <el-table-column prop="id" label="任务ID" width='80' align="center">
                 </el-table-column>-->
                <el-table-column prop="name" label="方法名称" align="center">
                </el-table-column>
                <el-table-column prop="jobClass" label="bean名称" align="center">
                </el-table-column>
                <el-table-column prop="jobGroup" label="分组" align="center">
                </el-table-column>
                <el-table-column prop="cron" label="cron表达式" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" :formatter="formatter">
                </el-table-column>
                <el-table-column label="详情" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="view(scope.$index,scope.row)">修改</el-button>
                        <el-button size="mini" type="info" @click="remove(scope.$index,scope.row)">删除</el-button>
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
                    :total="totle">
            </el-pagination>
        </div>
        <el-dialog
                :title="modelTitle"
                :visible.sync="dialogFormVisible01"
                width="50%" :center="center">
            <div style="overflow:hidden">
                <addpage :fromdata="fromdata" ref='formPage'></addpage>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isView" @click="submitHandle">提 交</el-button>
        <el-button type="primary" v-if="isView" @click="editHandel">提 交</el-button>
        <el-button @click="dialogFormVisible01 = false">取 消</el-button>
      </span>
        </el-dialog>
        <!-- 查看   新增   编辑  表单 -->
        <el-dialog
                title="日志"
                :visible.sync="dialogFormVisible02"
                width="80%" :center="center">
            <div style="overflow:hidden">
                <div class="searchBox">
                    <el-row :gutter="20" class="operation">
                        <el-col class="marginBottom" :span="8">
                            <span class="labelSpan">任务ID： </span>
                            <el-input class="SearchInput" v-model="pData" @change="getDcData" placeholder="请输入">
                            </el-input>
                        </el-col>

                        <el-col :span="8">
                            <el-button size="medium" type="primary" @click="search01">查询</el-button>
                            <!-- <el-button size="medium" type="primary" style="position:absoult;right:120px"  @click="dialogFormVisible02=false">返回</el-button> -->
                        </el-col>
                    </el-row>
                </div>
                <!-- 操作 end-->

                <!-- table start  -->
                <div class="resultBox">
                    <el-row :gutter="20">
                        <el-col class="title" :span="24">
                            <h4>查询结果1</h4>
                        </el-col>
                    </el-row>
                    <el-table :data="list01" border style="width: 100%;height:50vh;overflow-y:auto"
                              highlight-current-row
                              @current-change="handleCurrentChange001" ref="multipleTable">
                        <!--<el-table-column
                                type="index"
                                width="55">
                        </el-table-column>
                        <el-table-column prop="id" label="任务ID" width="80" align="center">
                        </el-table-column>-->
                        <el-table-column prop="jobClass" label="bean名称" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="方法名称" align="center">
                        </el-table-column>
                        <el-table-column prop="jobGroup" label="分组" align="center">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="80" align="center">
                            <el-table-column prop="cron" label="cron表达式" width="80" align="center">
                            </el-table-column>
                        </el-table-column>

                    </el-table>
                    <el-pagination
                            background
                            @size-change="handleSizeChange01"
                            @current-change="handleCurrentChange01"
                            :current-page="pageNumber01"
                            :page-sizes="[15,50,100]"
                            :page-size=15
                            prev-text='上一页'
                            next-text='下一页'
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount01">
                    </el-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" v-if="isView" @click="submitHandle">提 交</el-button> -->
        <el-button @click="dialogFormVisible02 = false">取 消</el-button>
      </span>
        </el-dialog>
        <!-- pagination end -->
        <!-- table end  -->
    </div>
</template>

<script>
    import * as publicapi from "../../../api/publicapi.js";
    import * as order from '../../../api/role.js';
    import addpage from './view.vue';


    export default {
        components: {
            addpage
        },
        data() {
            return {
                dialogFormVisible01: false,
                fromdata: {},
                modelTitle: "新增",
                searchParam: '',                //当前查询条件
                center: true,
                list: [],
                loading: false,
                totle: 0,                   //数据总条数
                pageSize: 15,                    // 每页数据条数
                pageNumber: 1,                     //当前页
                order: 'asc',                    //排序方式
                searchData: [],
                pData: '',                   //当前选择的省份 数据
                termArr: [],
                totalCount01: 0,                   //数据总条数
                pageSize01: 15,                    // 每页数据条数
                pageNumber01: 1,                     //当前页
                dialogFormVisible02: false,
                jobId: '',
            }
        },
        methods: {
            rizhi() {
                var vm = this;
                vm.jobId = '';
                vm.dialogFormVisible02 = true;
            },
            search01() {
                var vm = this;

                vm.searchParam = {
                    "jobId": vm.jobId,

                }

                vm.fetchData01();
            },
            submitHandle() {//新增提交
                var vm = this;
                vm.loading = true
                order.intevalAdd.r(vm.$refs.formPage.form).then(res => {
                    if (res.data.success) {

                        vm.$message.success('保存成功')
                        vm.dialogFormVisible01 = false;
                        vm.loading = false;
                        vm.fetchData();

                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                })
            },
            editHandel() {//新增提交
                var vm = this;
                vm.loading = true
                order.intevalUpdate.r(vm.$refs.formPage.form).then(res => {
                    if (res.data.success) {

                        vm.$message.success('保存成功')
                        vm.dialogFormVisible01 = false;
                        vm.loading = false;
                        vm.fetchData();

                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                })
            },
            fetchData01(param) {
                var vm = this;
                vm.loading = true;
                let params = {}

                if (param) {
                    Object.assign(param, vm.searchParam)
                    params = param

                } else {

                    params = {
                        'pageSize': vm.pageSize01,
                        'currNumber': '1',
                    }
                    Object.assign(params, vm.searchParam)
                }
                order.logList.r(params).then((res) => {
                    if (res.data.success) {
                        vm.list01 = res.data.content.pages;
                        vm.pageNumber01 = res.data.content.pageNumber;
                        vm.pageSize01 = res.data.content.pageSize;
                        vm.totalCount01 = res.data.content.totalCount;
                        vm.loading = false;
                        vm.$message.success('数据请求成功');

                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                });
            },
            formatter(row, cellval) {
                return row.status == '0' ? "关闭" : "开启";
            },
            handleSelectionChange(val) {

                var vm = this;
                var arr = [];
                val.map(item => {
                    arr.push(item.jobId)
                })

                vm.termArr = arr;
            },

            search() {
                var vm = this;

                vm.searchParam = {
                    "beanName": vm.pData,

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
                order.intevalList.r(params).then((res) => {
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
            add() {
                var vm = this;
                vm.isView = false;
                vm.dialogFormVisible01 = true;
                vm.fromdata = {};
                // vm.loading = true;
            },
            view(item, data) {
                var vm = this;
                vm.isView = true,
                    vm.dialogFormVisible01 = true;
                // vm.loading = true;
                // 设置disablked
                vm.disabled = '1';
                vm.modelTitle = "编辑",
                    vm.getViewInfo(data.id)

            },
            remove(item, data) {
                var vm = this;
                vm.loading = true;
                order.intevalRemove.r(data.id).then((res) => {
                    if (res.data.success) {
                        vm.$message.success("任务已删除");
                        vm.loading = false;
                        vm.search()
                    } else {
                        vm.$message.error(res.data.msg);
                        vm.loading = false;
                        vm.dialogFormVisible01 = false;

                    }
                })
            },
            getViewInfo(id) {
                var vm = this;
                vm.loading = true;
                order.intevalInfo.r(id).then((res) => {
                    if (res.data.success) {
                        vm.loading = false;
                        vm.fromdata = JSON.stringify(res.data.content);
                    } else {

                        vm.$message.error(res.data.msg);
                        vm.loading = false;
                        vm.dialogFormVisible01 = false;

                    }
                })
            },
            stop() {
                var vm = this;
                vm.loading = true;
                order.intevalStop.r(vm.termArr).then((res) => {
                    if (res.data.success) {
                        vm.$message.success("任务已暂停");
                        vm.loading = false;
                        // vm.fromdata = res.data.data;
                        vm.search()
                    } else {
                        vm.$message.error(res.data.msg);
                        vm.loading = false;
                        vm.dialogFormVisible01 = false;

                    }
                })
            },
            start() {
                var vm = this;
                vm.loading = true;
                order.intevalStart.r(vm.termArr).then((res) => {
                    if (res.data.success) {
                        vm.$message.success("任务已执行");
                        vm.loading = false;
                        vm.search()
                    } else {

                        vm.$message.error(res.data.msg);
                        vm.loading = false;
                        vm.dialogFormVisible01 = false;

                    }
                })
            },
            back() {
                var vm = this;
                vm.loading = true;
                order.intevalBack.r(vm.termArr).then((res) => {
                    if (res.data.success) {
                        vm.$message.success("任务已恢复");
                        vm.loading = false;
                        vm.search()
                    } else {
                        vm.$message.error(res.data.msg);
                        vm.loading = false;
                    }
                })
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
            handleCurrentChange01(val) {

                var vm = this;
                vm.pageNumber = val;
                vm.fetchData01({'pageNumber': vm.pageNumber01, 'pageSize': vm.pageSize01})

            },

            handleSizeChange01(val) {

                var vm = this;

                vm.pageSize = val;
                vm.fetchData01({'pageNumber': vm.pageNumber01, 'pageSize': vm.pageSize01})

            },
        },
        created() {
            this.fetchData();
        }
    }
</script>