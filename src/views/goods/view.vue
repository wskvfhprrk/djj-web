<template>
    <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row :gutter="16">
            <el-col :span="12">
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="disabled=='1'" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店铺" :label-width="formLabelWidth" prop="shopId">
                        <el-select :disabled="disabled=='1'" v-model="form.shopId" autocomplete="off" clearable placeholder="请选择店铺">
                        <el-option
                                v-for="item in goods"
                                :key="item.shopId"
                                :label="item.name"
                                :value="item.shopId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片"  prop="images">
                    <el-upload 
                    class="upload-demo"
                    action="/AlipayAward/fdfs"
                    v-model="form.images"
                    :headers="uploadHeaders"
                    :on-upload="beforeAvatarUpload"
                    :on-remove="onRemove"
                    :limit="3"
                    :on-exceed="masterFileMax"
                    :file-list="fileList"
                    list-type="picture"
                    name="uploadFile"
                    :on-success="uploadFace"
                    :multiple="false" >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，限3张</div>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>

    //如果需要下拉时才使用，每个js中已经有得到全部数据
    import * as goods from '../../api/shop.js';

    export default {
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                fileData:[],
                form: {islock: 0},
                formLabelWidth: '120px',
                //goods: [],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入名称',
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
                    ], 
                    images: [
                        {
                            required: false,
                            message: '请输入图片（可以多张）',
                            trigger: 'blur'
                        }, 
                        {
                            max: 1024,
                            message: '输入最大长度为 1024 个字符',
                            trigger: 'blur'
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
                            message: '请输入修改时间',
                            trigger: 'blur'
                        }, 
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
                goods.getAll.r(2).then(res => {
                    if (res.data.success) {
                        vm.goods = res.data.content;
                    } else {
                        vm.$message.error('获取用户下拉数据失败');
                    }
                })
            },
            //图片上
            uploadFace(res, file) {
                var vm = this;
                if(res.success){
                    this.fileData.push(res.content)
                    vm.form.images = this.fileData.join(";")
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
            //
            initFileData(){
                this.fromdata=[]
            }
        },
        //显示编辑界面
        created() {
            this.getAll();
            this.initFileData()
        }
    }
</script>
