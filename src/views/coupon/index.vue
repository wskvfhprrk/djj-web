<template>
    <div v-loading="loading">
        <!-- 操作 start -->
        <div class="searchBox">
            <el-row v-model="queryParms" :gutter="20" class="operation">
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">代金券名称： </span>
                    <el-input class="SearchInput" v-model="queryParms.name" placeholder="请输入代金券名称"></el-input>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">所属店铺： </span>
                    <el-select v-model="queryParms.shopId" clearable placeholder="请选择所属店铺">
                        <el-option
                                v-for="item in shops"
                                :key="item.shopId"
                                :label="item.name"
                                :value="item.shopId">
                        </el-option>
                    </el-select>
                </el-col>
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">图片： </span>
                    <el-input class="SearchInput" v-model="queryParms.images" placeholder="请输入图片"></el-input>
                </el-col> -->
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">面值，单价（元）： </span>
                    <el-input class="SearchInput" v-model="queryParms.price" placeholder="请输入面值，单价（元）"></el-input>
                </el-col>
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">使用门槛（消费满多少元可以使用）： </span>
                    <el-input class="SearchInput" v-model="queryParms.useThreshold" placeholder="请输入使用门槛（消费满多少元可以使用）"></el-input>
                </el-col> -->
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">开始时间： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.startDate" type="date" placeholder="选择开始时间"></el-date-picker>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">结束日期： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.stopDate" type="date" placeholder="选择结束日期"></el-date-picker>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">优惠说明： </span>
                    <el-input class="SearchInput" v-model="queryParms.description" placeholder="请输入优惠说明"></el-input>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">使用须知： </span>
                    <el-input class="SearchInput" v-model="queryParms.instruction" placeholder="请输入使用须知"></el-input>
                </el-col> -->
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">类型 ： </span>
                    <el-select v-model="queryParms.type" clearable placeholder="请选择类型">
                        <el-option
                                v-for="item in type"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">状态 ： </span>
                    <!-- <el-input class="SearchInput" v-model="queryParms.status" placeholder="请输入状态（0-新建 1-已上架 2-已下架）"></el-input> -->
                    <el-select v-model="queryParms.status" clearable placeholder="请选择状态">
                        <el-option
                                v-for="item in status"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <!-- <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">创建时间： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.createTime" type="date" placeholder="选择创建时间"></el-date-picker>
                </el-col>
                <el-col class="marginBottom" :span="8">
                    <span class="labelSpan">修改时间： </span>
                    <el-date-picker class="SearchInput"  v-model="queryParms.updateTime" type="date" placeholder="选择修改时间"></el-date-picker>
                </el-col> -->

                <el-col :span="8">
                    <el-button size="medium" type="primary" v-allow="coupon_get" @click="search">查询</el-button>
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
                <el-button class="addBtn" v-allow="coupon_post" @click="add" size="medium" type="primary">新增
                </el-button>
            </el-row>
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="name" label="代金券名称" align="center"></el-table-column>
                <el-table-column prop="shopId" label="所属店铺" align="center" :formatter="shopFormat"></el-table-column>
                <el-table-column prop="images" label="图片" align="center"></el-table-column>
                <el-table-column prop="price" label="面值，单价（元）" align="center"></el-table-column>
                <el-table-column prop="useThreshold" label="使用门槛" align="center"></el-table-column>
                <el-table-column prop="startDate" label="开始时间" align="center"></el-table-column>
                <el-table-column prop="stopDate" label="结束日期" align="center"></el-table-column>
                <el-table-column prop="description" label="优惠说明" align="center"></el-table-column>
                <el-table-column prop="instruction" label="使用须知" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" align="center" :formatter="typeFormat" ></el-table-column>
                <el-table-column prop="status" label="状态 " align="center" :formatter="statusFormat"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button v-allow="coupon_put" size="mini" type="info" @click="edit(scope.$index,scope.row)">
                            编辑</el-button>
                        <el-button size="mini" type="danger" v-allow="coupon_*_delete" @click="deleteHandel(scope.$index,scope.row)">
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
        <el-button type="primary" v-if="!isView&&modelTitle=='编辑'" @click="editsubmit">提 交</el-button>
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
    import * as coupon from '../../api/coupon.js';
    import * as selectData from '../../api/shop.js';
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
                shops:[],        //
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
                status: [{ //（0-新建 1-已上架 2-已下架）
                    value: '0',
                    label: '新建'
                }, {
                    value: '1',
                    label: '已上架'
                },{
                    value: '2',
                    label: '已下架'
                }],
                type: [{ //（0-公开 1-内部）
                    value: '0',
                    label: '公开'
                }, {
                    value: '1',
                    label: '内部'
                }],
                value: ''
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
                    if(val.shopId==item.shopId){
                        arr.push(item.name);  
                    } 

                })
                return arr.join();
            },
            statusFormat(val) {
                var arr=[];
                this.status.map(item=>{
                    if(val.type==item.value){
                        arr.push(item.label);  
                    } 

                })
                return arr.join();
            },
            typeFormat(val) {
                var arr=[];
                this.type.map(item=>{
                    if(val.type==item.value){
                        arr.push(item.label);  
                    } 

                })
                return arr.join();
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
                coupon.list.r(str).then((res) => {
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
            edit(item, data) {
                var vm = this;
                vm.dialogFormVisible01 = true;
                vm.modelTitle = '编辑';
                vm.isView = false,
                    // vm.loading = true;
                    vm.fromdata = '';
                vm.disabled = '0';
                vm.getViewInfo(data)
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
            getViewInfo(data) {
                var vm = this;
                
                coupon.view.r(data.couponId).then(res => {
                    if (res.data.success) {
                        vm.fromdata = JSON.stringify(res.data.content);
                        if (vm.$refs.formPage) {
                            vm.$refs.formPage.$refs['ruleForm'].resetFields()
                        }
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
                coupon.add.r(vm.$refs.formPage.form).then(res => {
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
            editsubmit() {//新增提交
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
                coupon.edit.r(vm.$refs.formPage.form).then(res => {
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
            clock(item, data) {
                var vm = this;
                vm.loading = true;
                
                var param = data.couponId;
                coupon.clock.r(param).then(res => {
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
                
                var param = data.couponId;
                coupon.click.r(param).then(res => {
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
                
                var param = data.couponId;
                coupon.remove.r(param).then(res => {
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
            getAll() {
                var vm = this;
                selectData.getAll.r(2).then(res => {
                    if (res.data.success) {
                        vm.shops = res.data.content;
                    } else {
                        vm.$message.error('获取用户下拉数据失败');
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
