<template>
    <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row :gutter="16">
            <el-col :span="12">
                <!-- <el-form-item label="图片地址" :label-width="formLabelWidth" prop="imageUrl">
                        <el-input :disabled="disabled=='1'" v-model="form.imageUrl" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="图片"  prop="imageUrl">
                    <el-upload 
                    class="upload-demo"
                    action="/AlipayAward/fdfs"
                    v-model="form.imageUrl"
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
                <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                        <el-select :disabled="disabled=='1'" v-model="form.type" autocomplete="off" clearable placeholder="请选择类型">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="链接地址" :label-width="formLabelWidth" prop="address">
                        <el-input :disabled="disabled=='1'" v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
import { Upload } from 'element-ui';

    import * as upload from "../../api/upload.js";
    import * as util from "../../assets/util.js";

    export default {
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                uploadHeaders: {
                    token: util.session("token")
                },
                fileList:[],
                form: {islock: 0},
                formLabelWidth: '120px',
                //partData: [],
                options: [{ ////（0-店铺 1-代金券 2-网址 ）
                    value: '0',
                    label: '店铺'
                }, {
                    value: '1',
                    label: '代金券'
                },{
                    value: '2',
                    label: '网址'
                }],
                rules: {
                    imageUrl: [
                        {
                            required: true,
                            message: '请输入图片地址',
                            trigger: 'blur'
                        }, 
                        {
                            max: 1024,
                            message: '输入最大长度为 1024 个字符',
                            trigger: 'blur'
                        }
                    ],                    
                     type: [
                        {
                            required: true,
                            message: '请输入类型（0-店铺 1-代金券 2-网址 ）',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     address: [
                        {
                            required: false,
                            message: '请输入链接地址',
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
            // getAll() {
            //     var vm = this;
            //     selectData.getall.r(2).then(res => {
            //         if (res.data.success) {
            //             vm.partData = res.data.content;
            //         } else {
            //             vm.$message.error('获取用户下拉数据失败');
            //         }
            //     })
            // },
            //图片上
            uploadFace(res, file) {
                var vm = this;
                if(res.success){
                    vm.form.imageUrl = res.content;
                    vm.fileList.url=vm.form.imageUrl;
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
    }
</script>
