<style scoped>
    .el-select {
        width: 100% !important;
    }

    .mapBox {
        height: 500px;
        width: 500px;
        display: block
    }
</style>

<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-row :gutter="16">
                <el-col :span="12">
                    <el-form-item label="方法名称：" :label-width="formLabelWidth">
                        <el-input :disabled="disabled=='1'" v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="bean名称：" :label-width="formLabelWidth">
                        <el-input :disabled="disabled=='1'" placeholder="如：com.guardlbt.quartz.TestTask"
                                  v-model="form.jobClass" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分组：" :label-width="formLabelWidth">
                        <el-input :disabled="disabled=='1'" v-model="form.jobGroup" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="cron表达式" :label-width="formLabelWidth">
                        <el-input :disabled="disabled=='1'" v-model="form.cron" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注：" :label-width="formLabelWidth">
                        <el-input :disabled="disabled=='1'" v-model="form.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item v-model="option_group_status_default" label="状态" :label-width="formLabelWidth"
                                  prop="status">
                        <el-select v-model="form.status" :disabled="disabled=='1'" class="SearchInput"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in option_group_status"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>
<script>
    export default {
        components: {
            Map
        },
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                showMap: false,
                form: {},
                formLabelWidth: '120px',
                weixinList: [],
                option_group_status_default: 0,
                option_group_status: [
                    {key: 0, val: '关闭'}, {key: 1, val: '开启'}
                ],
                rules: {
                    name: [
                        {required: true, message: '请填写方法名称', trigger: 'change'},
                    ],
                    jobClass: [
                        {required: true, message: '请填写bean名称', trigger: 'change'},
                    ],
                    jobGroup: [
                        {required: false, message: '请填写组名称', trigger: 'change'},
                    ],
                }
            }
        },
        watch: {
            fromdata(newdata, olddata) {
                var vm = this;

                vm.form = (typeof vm.fromdata == 'string') && vm.fromdata.constructor == String ? JSON.parse(vm.fromdata) : {};
            },
            disabled(newdata) {
                this.disabled = newdata
            },
            form(newdata) {
                this.form = newdata
            },
        },
        mounted() {
            var vm = this;
            // vm.getweixin();
            if ((typeof vm.fromdata == 'string') && vm.fromdata.constructor) {
                vm.form = JSON.parse(vm.fromdata)
            } else {
                vm.form = {}
            }

        },
        methods: {},
        created() {
        }
    }
</script>