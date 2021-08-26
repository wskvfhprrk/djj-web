<template>
    <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="disabled=='1'" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-select placeholder="请选择性别" :disabled="disabled=='1'" v-model="form.sex" autocomplete="off">
                            <el-option
                            v-for="item in sexs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                        <el-input :disabled="disabled=='1'" v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                    <el-select placeholder="请选择性别" :disabled="disabled=='1'" v-model="form.role" autocomplete="off">
                            <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-input :disabled="disabled=='1'" v-model="form.role" autocomplete="off"></el-input> -->
                </el-form-item>
                <el-form-item label="店铺" :label-width="formLabelWidth" prop="shopId">
                        <el-select placeholder="请选择店铺" :disabled="disabled=='1'" v-model="form.shopId" autocomplete="off">
                            <el-option
                            v-for="item in partData"
                            :key="item.shopId"
                            :label="item.name"
                            :value="item.shopId">
                            </el-option>
                        </el-select>
                        <!-- <el-input :disabled="disabled=='1'" v-model="form.shopId" autocomplete="off"></el-input> -->
                </el-form-item>
                <!-- <el-form-item label="创建时间" :label-width="formLabelWidth" prop="createTime">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="更新时间" :label-width="formLabelWidth" prop="updateTime">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.updateTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item> -->
                <!-- <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                    <el-select placeholder="请选择性别" :disabled="disabled=='1'" v-model="form.status" autocomplete="off">
                            <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item> -->
                <el-form-item label="用户在微信端的唯一标识" :label-width="formLabelWidth" prop="openId">
                        <el-input :disabled="disabled=='1'" v-model="form.openId" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>

    //如果需要下拉时才使用，每个js中已经有得到全部数据
    import * as selectData from '../../api/shop.js';

    export default {
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                form: {islock: 0},
                formLabelWidth: '120px',
                 sexs: [{ //（0:男，1:女）
                    value: '0',
                    label: '男'
                    }, {
                    value: '1',
                    label: '女'
                    }],
                 status: [{ //（0-正常 1-暂停 2-注销）
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
                partData: [],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入昵称',
                            trigger: 'blur'
                        }, 
                        {
                            max: 255,
                            message: '输入最大长度为 255 个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     sex: [
                        {
                            required: true,
                            message: '请输入性别（0:男，1:女）',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     birthday: [
                        {
                            required: true,
                            message: '请输入生日',
                            trigger: 'blur'
                        }, 
                    ],                     phone: [
                        {
                            required: true,
                            message: '请输入联系方式',
                            trigger: 'blur'
                        }, 
                        {
                            max: 20,
                            message: '输入最大长度为 20 个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     role: [
                        {
                            required: true,
                            message: '请输入角色（0-老板 1-店长 2-员工）',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     shopId: [
                        {
                            required: true,
                            message: '请输入店铺编号',
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
                    ],                     createTime: [
                        {
                            required: true,
                            message: '请输入创建时间',
                            trigger: 'blur'
                        }, 
                    ],                     updateTime: [
                        {
                            required: true,
                            message: '请输入更新时间',
                            trigger: 'blur'
                        }, 
                    ],                    openId: [
                        {
                            required: false,
                            message: '请输入用户在微信端的唯一标识',
                            trigger: 'blur'
                        }, 
                        {
                            max: 64,
                            message: '输入最大长度为 64 个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
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
