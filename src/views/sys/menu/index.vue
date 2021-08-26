<template>
    <div class="statistics common-content">
        <div class="resultBox">
            <el-row :gutter="20">
                <el-col class="title" :span="24">
                    <h4>菜单信息</h4>
                </el-col>
                <el-button class="addBtn" @click="add" size="medium" type="primary">新增</el-button>
            </el-row>
            <el-table :data="statisticDatas" border style="width: 100%;" size="medium"
                      :row-class-name="rowClassNameHandler">
                <el-table-column label="菜单名称" width="460" align="left" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
                        <i v-if="scope.row.showChildren"
                           :class="{'el-icon-arrow-down':scope.row.showChildren, 'el-icon-document':!scope.row.hasChildren}"
                           @click="onExpand(scope.row)"
                           :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                        <i v-else
                           :class="{'el-icon-caret-right':scope.row.hasChildren, 'el-icon-document':!scope.row.hasChildren}"
                           @click="onExpand(scope.row)"
                           :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                        <span :data-level="scope.row.level"
                              :style="{marginLeft: 4 + 'px'}">{{ scope.row.menuName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="menuId" label="菜单ID" width="80" align="center"></el-table-column>
                <!-- <el-table-column prop="parentName" label="上级菜单" align="center"></el-table-column> -->
                <!-- <el-table-column prop="orderNum" label="排序号" width="80" align="center"></el-table-column> -->
                <el-table-column prop="url" label="url" align="center"></el-table-column>
                <el-table-column prop="permission" label="授权标识" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" v-allow="menu_*_get" type="info" @click="view(scope.$index,scope.row)">查看</el-button> -->
                        <el-button size="mini" type="info" @click="edit(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" type="info" @click="deleteHandel(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                :title="modelTitle"
                :visible.sync="dialogFormVisible01"
                width="50%" center="true">
            <el-form :model="form" :rules="rules">
                <el-row :gutter="16">
                    <el-form-item label="类型:" :label-width="formLabelWidth" prop="menuType">
                        <el-radio-group v-model="form.menuType" :disabled="disabled=='1'">
                            <el-radio :label="0">菜单</el-radio>
                            <el-radio :label="1">权限设置</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-col :span="12">
                        <el-form-item label="菜单名称" :label-width="formLabelWidth" v-if="form.menuType!=1"
                                      prop="menuName">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.menuName"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="按钮名称" :label-width="formLabelWidth" v-else-if="form.menuType==1"
                                      prop="menuName">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.menuName"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上级菜单" :label-width="formLabelWidth" style="border:1px solid #fff">
                            <el-button size="medium" type="primary" :disabled="disabled=='1'"
                                       @click="dialogFormVisible12 = true">{{form.parentName?form.parentName:"菜单名称"}}
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="URL：" :label-width="formLabelWidth" v-if="form.menuType!=1" prop="url">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.url"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="授权标识：" :label-width="formLabelWidth" v-if="form.menuType==1" prop="permission">
                            <el-input :disabled="disabled=='1'" class="SearchInput" v-model="form.permission"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="排序号：" :label-width="formLabelWidth" prop="orderby">
                            <el-input-number class="SearchInput" :disabled="disabled=='1'" @change='coupton'
                                             v-model="form.orderby" controls-position="right"
                                             autocomplete="off"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isView&&modelTitle=='新增'" @click="submitHandle">提 交</el-button>
        <el-button type="primary" v-if="!isView&&modelTitle=='编辑'" @click="editsubmit">提 交</el-button>
        <el-button @click="dialogFormVisible01 = false">取 消</el-button>
      </span>
        </el-dialog>
        <el-dialog title="菜单信息" :visible.sync="dialogFormVisible12" center="true">
            <TreeModel :partData="partData" @partChoose="partChoose"></TreeModel>
            <div slot="footer" class="dialog-footer" center='true'>
                <el-button type="primary" @click="partClick">确 定</el-button>
                <el-button @click="dialogFormVisible12 = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<style>
    .statistics .hiddenRow {
        display: none;
    }

    .statistics .searchForm {
        padding: 10px;
    }

    .statistics .searchForm span.label {
        margin-right: 10px;
    }

    .statistics .searchForm span.attention {
        color: #e50021;
    }
</style>
<script>
    import * as role from '../../../api/role.js'
    import TreeModel from '../../common/tree.vue';
    import * as util from '../../../assets/util.js'

    export default {
        components: {
            TreeModel
        },
        data() {
            return {
                statisticDatas: [],
                form: {type: 0},
                formLabelWidth: '100px',
                dialogFormVisible01: false,
                dialogFormVisible12: false,
                partData: [],
                rules: {
                    menuType: [{required: true, message: '请选择菜单类型', trigger: 'blur'}],
                    menuName: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'},
                        {max: 30, message: '输入最大长度为 30 个字符', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '输入字符非法'}
                    ],
                    menuName: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'},
                        {max: 30, message: '输入最大长度为 30 个字符', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '输入字符非法'}
                    ],
                    orderby: [
                        {required:true, message: '请输入序号', trigger: 'blur'},
                        {max: 3, message: '输入最大长度为 3 个字符', trigger: 'blur'},
                        {pattern: /^[1-9]\d*$/, message: '输入字符非法'}

                    ]
                },
                nowPart: ''
            }
        },
        mounted() {
            let self = this
            self.loadStatisticData();
            // self.getPartData();
        },
        methods: {
            _processLevelStatisticData(dataArray) {
                let self = this
                let resultArray = [] // 一级栏目
                let level = 1        //层级控制缩进
                for (let i = 0; i < dataArray.length; i++) {
                    let item = dataArray[i]
                    // 查找一级分类
                    if (item.parentId == 0) {
                        item['level'] = level
                        resultArray.push(item)
                        self._loadChildrenData(resultArray, dataArray, item, level + 1)
                    }
                }
                return resultArray
            },

            _loadChildrenData(resultArray, originArray, item, level) {
                let self = this
                for (let i = 0; i < originArray.length; i++) {//状态遍历初始
                    let originItem = originArray[i]
                    // 判断是否是item项的子项
                    if (originItem.parentId === item.menuId) {
                        item['hasChildren'] = true
                        item['showChildren'] = false
                        originItem['level'] = level
                        originItem['visible'] = false // 子项默认隐藏
                        originItem['hiddenByCategory'] = false

                        resultArray.push(originItem)
                        self._loadChildrenData(
                            resultArray,
                            originArray,
                            originItem,
                            level + 1
                        )
                    }
                }
            },

            search() {
                this.loadStatisticData()
            },

            loadStatisticData() {
                let self = this
                let params = {
                    pastDays: self.pastDays
                }
                role.menuList.r().then(function (res) {
                    if (res.data.success) {
                        let result = res.data.content;
                        let resultArray = self._processLevelStatisticData(result)
                        self.statisticDatas = resultArray
                    } else {
                        vm.$message.error(res.data.msg)
                    }

                })
            },

            rowClassNameHandler({row, rowIndex}) {
                let className = 'pid-' + row.parentId
                if (
                    row.parentId !== 0 &&
                    (row['visible'] !== true || row['hiddenByCategory'] === true)
                ) {
                    className += ' hiddenRow'
                }
                return className
            },

            onExpand(row) {
                let self = this

                let isShowChildren = !row['showChildren']
                row['showChildren'] = isShowChildren
                self._loadAllSubItems(row, true, isShowChildren)
            },

            _loadAllSubItems(item, isFirstLevlChildren, isShowChilren) {
                let self = this
                let dataArray = []
                for (let i = 0; i < self.statisticDatas.length; i++) {
                    let tempItem = self.statisticDatas[i]
                    if (tempItem.parentId === item.menuId) {
                        if (isFirstLevlChildren) {
                            tempItem['visible'] = !tempItem['visible']
                        }
                        tempItem['hiddenByCategory'] = !isShowChilren

                        dataArray.push(tempItem)
                        let subItemArray = self._loadAllSubItems(
                            tempItem,
                            false,
                            isShowChilren
                        )
                        dataArray = dataArray.concat(subItemArray)
                    }
                }
                return dataArray
            },


            add() {
                var vm = this;
                vm.getPartData();
                vm.dialogFormVisible01 = true;
                vm.isView = false;
                vm.modelTitle = '新增';
                vm.disabled = '0';
                vm.form = {menuType: 0}
            },
            edit(item, data) {

                var vm = this;
                vm.getPartData();
                vm.dialogFormVisible01 = true;
                vm.modelTitle = '编辑';
                vm.isView = false,
                    // vm.loading = true;
                    vm.disabled = '0';
                vm.getViewInfo(data)

            },
            getViewInfo(data) {
                var vm = this;
                vm.dialogFormVisible01 = true;
                role.menuInfo.r(data.menuId).then(res => {
                    if (res.data.success) {
                        // this.search()
                        vm.loading = false;
                        vm.form = res.data.content;
                    } else {
                        vm.loading = false;
                        // this.search()
                        vm.$message.error(res.data.msg);

                    }
                })
            },

            deleteHandel(item, data) {
                var vm = this;
                vm.loading = true;
                role.menuRemove.r(data.menuId).then(res => {
                    if (res.data.success) {

                        vm.$message.success('已删除');
                        vm.loading = false;
                        vm.search();

                    } else {

                        vm.$message.error(res.data.msg)
                        vm.loading = false;
                    }
                })
            },
            partClick() {
                var vm = this;
                vm.form.parentId = vm.nowPart.menuId;
                vm.form.parentName = vm.nowPart.label;
                vm.dialogFormVisible12 = false;
            },
            partChoose(data) {//部门选择时 接受子组件参数
                this.nowPart = data;
            },
            getPartData() {
                var vm = this;
                role.menuSelect.r().then((res) => {//获取部门信息
                    res.data.content.push({"menuId": 0, "menuName": "一级菜单", "url": "", "parentId": '-1'})
                    vm.partData = util.getTreeData(res.data.content, '-1');
                });
            },
            submitHandle() {//新增提交
                var vm = this;
                for (var i in vm.form) {
                    if (vm.form[i] === '' || vm.form[i] === null) {
                        delete vm.form[i]
                    }
                }
                vm.loading = true
                role.menuAdd.r(vm.form).then(res => {
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
            editsubmit() {//编辑提交
                var vm = this;
                vm.loading = true;

                for (var i in vm.form) {
                    if (vm.form[i] === '' || vm.form[i] === null) {
                        delete vm.form[i]
                    }
                }
                role.menuUpdate.r(vm.form).then(res => {
                    if (res.data.success) {

                        vm.$message.success('保存成功')
                        vm.dialogFormVisible01 = false;
                        this.search()
                        vm.loading = false;

                    } else {

                        vm.loading = false;
                        vm.$message.error(res.data.msg);

                    }
                })
            },

        },
    }
</script>
