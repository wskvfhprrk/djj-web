<template>
    <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row :gutter="16">
            <el-col :span="8">
                <el-form-item label="店铺名称" :label-width="formLabelWidth" prop="name">
                        <el-input :disabled="disabled=='1'" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="logo图片"  prop="logoImage">
                    <el-upload 
                    class="upload-demo"
                    action="/AlipayAward/fdfs"
                    v-model="form.logoImage"
                    :headers="uploadHeaders"
                    :on-upload="beforeAvatarUpload"
                    :on-remove="onRemove"
                    :limit="1"
                    :on-exceed="masterFileMax"
                    :file-list="logoImageList"
                    list-type="picture"
                    name="uploadFile"
                    :on-success="logoImageUploadSuccess"
                    :multiple="false" >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，仅1张</div>
                    </el-upload>
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
                    :file-list="imagesList"
                    list-type="picture"
                    name="uploadFile"
                    :on-success="imagesUploadSuccess"
                    :multiple="false" >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M,不超过3张 </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商圈" :label-width="formLabelWidth" prop="businessDistrictId">
                    <el-select :disabled="disabled=='1'" v-model="form.businessDistrictId" autocomplete="off" placeholder="请选择">
                        <el-option
                        v-for="item in partData"
                        :key="item.businessDistrictId"
                        :label="item.name"
                        :value="item.businessDistrictId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省" :label-width="formLabelWidth" prop="province">
                        <el-input :disabled="disabled=='1'" v-model="form.province" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="市" :label-width="formLabelWidth" prop="city">
                        <el-input :disabled="disabled=='1'" v-model="form.city" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="县" :label-width="formLabelWidth" prop="county">
                        <el-input :disabled="disabled=='1'" v-model="form.county" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="区" :label-width="formLabelWidth" prop="area">
                        <el-input :disabled="disabled=='1'" v-model="form.area" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address">
                        <el-input :disabled="disabled=='1'" v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="经度" :label-width="formLabelWidth" prop="longitude">
                        <el-input :disabled="disabled=='1'" v-model="form.longitude" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="纬度" :label-width="formLabelWidth" prop="latitude">
                        <el-input :disabled="disabled=='1'" v-model="form.latitude" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                        <el-input :disabled="disabled=='1'" v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人" :label-width="formLabelWidth" prop="custodian">
                        <el-input :disabled="disabled=='1'" v-model="form.custodian" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="行业" :label-width="formLabelWidth" prop="profession">
                        <el-input :disabled="disabled=='1'" v-model="form.profession" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店面介绍" :label-width="formLabelWidth" prop="details">
                        <el-input :disabled="disabled=='1'" v-model="form.details" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="入驻时间" :label-width="formLabelWidth" prop="createTime">
                    <el-date-picker :disabled="disabled=='1'" v-model="form.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" autocomplete="off"></el-date-picker>
                </el-form-item> -->
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                        <!-- <el-input :disabled="disabled=='1'" v-model="form.status" autocomplete="off"></el-input> -->
                        <el-select :disabled="disabled=='1'" v-model="form.status" autocomplete="off" clearable placeholder="请选择状态">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业开始时间" :label-width="formLabelWidth" prop="startTime">
                            <el-time-picker
                                v-model="form.startTime"
                                value-format="HH:mm:ss"
                                :picker-options="{
                                selectableRange: '08:00:00 - 20:30:00',
                                format:'HH:mm'
                                }"
                                placeholder="开始时间">
                            </el-time-picker>
                </el-form-item>
                <el-form-item label="营业结束时间" :label-width="formLabelWidth" prop="stopTime">
                            <el-time-picker
                                arrow-control
                                v-model="form.stopTime"
                                value-format="HH:mm:ss"
                                :picker-options="{
                                selectableRange: '18:30:00 - 24:00:00',
                                format:'HH:mm'
                                }"
                                placeholder="结束时间">
                            </el-time-picker>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>

    //如果需要下拉时才使用，每个js中已经有得到全部数据
    import * as selectData from '../../api/businessDistrict.js';

    export default {
        props: {
            disabled: String,
            fromdata: String,
        },
        data() {
            return {
                options: [{ //（0-未审核 1-已发布 2-已下架）
                    value: '0',
                    label: '未审核'
                }, {
                    value: '1',
                    label: '已发布'
                }, {
                    value: '2',
                    label: '已下架'
                }],
                form: {
                    islock: 0,
                    startTime: new Date(2016, 9, 10, 18, 40),
                    stopTime: new Date(2016, 9, 10, 18, 40),
                },
                fileData:[],
                logoImageList:[],
                imagesList:[],
                formLabelWidth: '120px',
                partData: [],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入店铺名称',
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
                    ],                     logoImage: [
                        {
                            required: false,
                            message: '请输入logo图片',
                            trigger: 'blur'
                        }, 
                        {
                            max: 255,
                            message: '输入最大长度为 255 个字符',
                            trigger: 'blur'
                        }
                    ],                     images: [
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
                    ],                     businessDistrictId: [
                        {
                            required: true,
                            message: '请输入商圈',
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
                    ],                     province: [
                        {
                            required: true,
                            message: '请输入省',
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
                    ],                     city: [
                        {
                            required: true,
                            message: '请输入市',
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
                    ],                     county: [
                        {
                            required: true,
                            message: '请输入县',
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
                    ],                     area: [
                        {
                            required: true,
                            message: '请输入区',
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
                    ],                     address: [
                        {
                            required: true,
                            message: '请输入详细地址',
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
                    ],                     longitude: [
                        {
                            required: true,
                            message: '请输入经度',
                            trigger: 'blur'
                        }, {pattern: /^\d+(\.\d+)?$/, message: '输入字符非法'}
                    ],                     latitude: [
                        {
                            required: true,
                            message: '请输入纬度',
                            trigger: 'blur'
                        }, {pattern: /^\d+(\.\d+)?$/, message: '输入字符非法'}
                    ],                     phone: [
                        {
                            required: true,
                            message: '请输入联系方式',
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
                    ],                     custodian: [
                        {
                            required: true,
                            message: '请输入负责人',
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
                    ],                     profession: [
                        {
                            required: true,
                            message: '请输入行业',
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
                    ],                     details: [
                        {
                            required: true,
                            message: '请输入店面介绍',
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
                    ],                     createTime: [
                        {
                            required: true,
                            message: '请输入入驻时间',
                            trigger: 'blur'
                        }, 
                    ],                     status: [
                        {
                            required: true,
                            message: '请输入状态（0-未审核 1-已发布 2-已下架）',
                            trigger: 'blur'
                        }, 
                        {
                            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                            message: '输入字符非法'
                        }
                    ],                     startTime: [
                        {
                            required: true,
                            message: '请输入营业开始时间',
                            trigger: 'blur'
                        }, 
                    ],                     stopTime: [
                        {
                            required: true,
                            message: '请输入营业结束时间',
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
                selectData.getAll.r(2).then(res => {
                    if (res.data.success) {
                        vm.partData = res.data.content;
                    } else {
                        vm.$message.error('获取用户下拉数据失败');
                    }
                })
            },
////////////////////////////
            //图片
            imagesUploadSuccess(res, file) {
                var vm = this;
                if(res.success){
                    this.fileData.push(res.content)
                    this.form.images=this.fileData.join(";");
                }
            },
            //logo
            logoImageUploadSuccess(res, file) {
                var vm = this;
                if(res.success){
                    vm.form.logoImage = res.content;
                }
            },
            //上传前判断之前有没有路径，如果有到后台删除图片
            // logoImageBeforeUpload(file){
            //     //上传一张
            //     if(this.form.logoImage && this.form.logoImage!="" ){
            //         upload.remove.r("?url="+this.form.logoImage).then(res=>{
            //         });
            //     }
            // },
            // imagesBeforeUpload(file){
            //     //上传一张
            //     if(this.fileData.length==0 && this.form.logoImage && this.form.images!="" ){
            //         upload.remove.r("?url="+this.form.images).then(res=>{
            //         });
            //         this.form.images="";
            //     }
            // },
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
                    console.log(file)
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
