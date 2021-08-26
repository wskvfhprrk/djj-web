<template>
    <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="排序" :label-width="formLabelWidth" prop="sorting">
                        <el-input :disabled="disabled=='1'" v-model="form.sorting" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="代金券" :label-width="formLabelWidth" prop="couponId">
                        <el-select :disabled="disabled=='1'" v-model="form.couponId" autocomplete="off" clearable placeholder="请选择代金券">
                        <el-option
                                v-for="item in partData"
                                :key="item.couponId"
                                :label="item.name"
                                :value="item.couponId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            
        </el-row>
    </el-form>

</template>
<script>

    //如果需要下拉时才使用，每个js中已经有得到全部数据
    import * as selectData from '../../api/coupon.js';

    export default {
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                form: {islock: 0},
                formLabelWidth: '120px',
                partData: [],
                rules: {
                    couponId: [
                        {
                            required: true,
                            message: '请输入代金券',
                            trigger: 'blur'
                        }, 
                        {
                            max: 32,
                            message: '输入最大长度为 32 个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ], 
                    sorting: [
                        {
                            required: true,
                            message: '请输入排序',
                            trigger: 'blur'
                        }, 
                        {
                            max: 11,
                            message: '输入最大长度为 11个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[1-9]\d*$/,
                            message: '输入字符非法'
                        }
                    ], 
                },
            }
        },
        watch: {
            fromdata(newdata, olddata) {
                this.form = this.fromdata ? JSON.parse(this.fromdata) : {};
            },
            disabled(newdata) {
                this.disabled = newdata
            }
        },
        mounted() {
            var vm = this;
            vm.form = vm.fromdata ? JSON.parse(vm.fromdata) : {};
            vm.$refs['ruleForm'].resetFields()
        },
        methods: {
            getAll() {
                var vm = this;
                selectData.getAll.r(2).then(res => {
                    if (res.data.success) {
                        this.partData = res.data.content;
                    } else {
                        vm.$message.error('获取用户下拉数据失败');
                    }
                })
            }
        },
        //显示编辑界面
        created() {
            this.getAll();
        }
    }
</script>
