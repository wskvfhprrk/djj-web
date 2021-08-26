<template>
    <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="代金券名称" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="disabled=='1'" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属店铺" :label-width="formLabelWidth" prop="shopId">
                    <el-select :disabled="disabled=='1'" v-model="form.shopId" clearable placeholder="请选择所属店铺" autocomplete="off">
                        <el-option
                                v-for="item in shops"
                                :key="item.shopId"
                                :label="item.name"
                                :value="item.shopId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="图片" :label-width="formLabelWidth" prop="images">
                        <el-input :disabled="disabled=='1'" v-model="form.images" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="图片"  prop="images">
                    <el-upload 
                    class="upload-demo"
                    action="/AlipayAward/fdfs"
                    v-model="form.images"
                    :headers="uploadHeaders"
                    :on-upload="beforeAvatarUpload"
                    :on-remove="onRemove"
                    :limit="1"
                    :on-exceed="masterFileMax"
                    :file-list="fileList"
                    list-type="picture"
                    name="uploadFile"
                    :on-success="uploadFace"
                    :multiple="false" >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="面值，单价（元）" :label-width="formLabelWidth" prop="price">
                        <el-input :disabled="disabled=='1'" v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="使用门槛（消费满多少元可以使用）" :label-width="formLabelWidth" prop="useThreshold">
                        <el-input :disabled="disabled=='1'" v-model="form.useThreshold" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" :label-width="formLabelWidth" prop="startDate">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" :label-width="formLabelWidth" prop="stopDate">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.stopDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="优惠说明" :label-width="formLabelWidth" prop="description">
                        <el-input :disabled="disabled=='1'" v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="使用须知" :label-width="formLabelWidth" prop="instruction">
                        <el-input :disabled="disabled=='1'" v-model="form.instruction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型 " :label-width="formLabelWidth" prop="type">
                        <!-- <el-input :disabled="disabled=='1'" v-model="form.type" autocomplete="off"></el-input> -->
                        <el-select :disabled="disabled=='1'" v-model="form.type" autocomplete="off" clearable placeholder="请选择类型">
                        <el-option
                                v-for="item in type"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                        <!-- <el-input :disabled="disabled=='1'" v-model="form.status" autocomplete="off"></el-input> -->
                        <el-select :disabled="disabled=='1'" v-model="form.status" autocomplete="off" clearable placeholder="请选择状态">
                        <el-option
                                v-for="item in status"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="创建时间" :label-width="formLabelWidth" prop="createTime">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="修改时间" :label-width="formLabelWidth" prop="updateTime">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.updateTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item> -->
            </el-col>
        </el-row>
    </el-form>

</template>
<script>

    //如果需要下拉时才使用，每个js中已经有得到全部数据
    import * as shop from '../../api/shop.js';

    export default {
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                form: {islock: 0},
                formLabelWidth: '120px',
                shops: [],
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
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入代金券名称',
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
                    ],                     shopId: [
                        {
                            required: true,
                            message: '请输入所属店铺',
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
                    images: [
                        {
                            required: false,
                            message: '请输入图片',
                            trigger: 'blur'
                        }, 
                        {
                            max: 1000,
                            message: '输入最大长度为 1000 个字符',
                            trigger: 'blur'
                        }
                    ],                     price: [
                        {
                            required: true,
                            message: '请输入面值，单价（元）',
                            trigger: 'blur'
                        }, 
                    ],                     useThreshold: [
                        {
                            required: true,
                            message: '请输入使用门槛（消费满多少元可以使用）',
                            trigger: 'blur'
                        }, 
                    ],                     startDate: [
                        {
                            required: true,
                            message: '请输入开始时间',
                            trigger: 'blur'
                        }, 
                    ],                     stopDate: [
                        {
                            required: true,
                            message: '请输入结束日期',
                            trigger: 'blur'
                        }, 
                    ],                     description: [
                        {
                            required: true,
                            message: '请输入优惠说明',
                            trigger: 'blur'
                        }, 
                        {
                            max: 65535,
                            message: '输入最大长度为 65535 个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     instruction: [
                        {
                            required: true,
                            message: '请输入使用须知',
                            trigger: 'blur'
                        }, 
                        {
                            max: 65535,
                            message: '输入最大长度为 65535 个字符',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     type: [
                        {
                            required: true,
                            message: '请输入类型（0-公开 1-内部）',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     status: [
                        {
                            required: true,
                            message: '请输入状态（0-新建 1-已上架 2-已下架）',
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
                shop.getAll.r(0).then(res => {
                    if (res.data.success) {
                        console.log(res.data.content);
                        this.shops = res.data.content;
                    } else {
                        vm.$message.error('获取用户下拉数据失败');
                    }
                })
            },
            //图片上
            uploadFace(res, file) {
                var vm = this;
                if(res.success){
                    vm.form.images = res.content;
                }
            },
            //上传前判定图片格式和大小
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 上传错误重新上传需要到后台删除图片
            onRemove(file){
                if (file && file.status==="success") {
                    upload.remove.r("?url="+file.response.content).then(res=>{
                    });
                }
            },
            //上传最多
            masterFileMax(files, fileList) {
                this.$message.warning('请最多上传'+fileList.length+'个文件。');
            },
        },
        //显示编辑界面
        created() {
            this.getAll();
        }
    }
</script>
