<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">我的账号</h2>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" focus="AuthName"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">

            <el-form :model="form" :rules="rules" ref="editTruename" label-width="180px">
                <el-form-item label="真实姓名：" prop="truename">
                    <el-col :span="6">
                        <el-input v-model="form.truename"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号码：" prop="socialId">
                    <el-col :span="6">
                        <el-input v-model="form.socialId"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证正面：" prop="frontThumb">
                  
                    <tc-upload :maxFilesNum="1"  v-model="form.frontThumb" uploadType="image"></tc-upload>
                </el-form-item>
                <el-form-item label="身份证背面：" prop="backThumb">
               
                    <tc-upload :maxFilesNum="1" v-model="form.backThumb"  uploadType="image"></tc-upload>
                </el-form-item>
                <el-form-item label="有效期-开始日期：" prop="startTime">
                    <el-date-picker
                        v-model="form.startTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="有效期-到期日期：" prop="hasEndTime">
                    <el-date-picker class="mar-rgt-10" v-if="!form.isLongUse" @change="handleEntTimeChange"
                                    v-model="form.endTime" type="date" placeholder="选择日期">
                    </el-date-picker>

                    <el-checkbox @change="handelEndtimeStatus" v-model="form.isLongUse">长期有效</el-checkbox>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-tag size="small" v-if="form.status == 1 || form.status == 2" type="warning">{{ form.statusName }}</el-tag>
                    <el-tag size="small" v-if="form.status == 3" type="success">{{ form.statusName }}</el-tag>
                    <el-tag size="small" v-if="form.status == 4" type="danger">{{ form.statusName }}</el-tag>

                    <span class="form-item-val mar-lft-10"  v-if="form.status == 4">拒绝原因：{{ form.note }}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editTruename">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
</template>

<script>
    import info from '@/model/memberInfo/info.js';
    import imgPreview from '@/components/imgPreview.vue';
    import upload from '@/components/upload.vue';
    import member from '@/model/member.js';
    import config from '@/util/config.js';

    export default {
        created(){
            this.loadTruenameInfo();
        },
        data(){

            return {
                menus: info.menus,
                form: {
                    truename: '',
                    socialId: '',
                    frontThumb: [],
                    backThumb: [],
                    startTime: '',
                    endTime: '',
                    status: false,
                    isLongUse: false,
                    hasEndTime: false,
                },
                rules: {
                    truename: [
                        {required: true, message: '请填写真实姓名', trigger: 'blur'},
                    ],
                    socialId: [
                        {required: true, message: '请填写身份证号码', trigger: 'blur'},
                    ],
                    frontThumb: [
                        {required: true, type : 'array', message: '请上传身份证正面照', trigger: 'blur'},
                    ],
                    backThumb: [
                        {required: true, type : 'array', message: '请上传身份证背面照', trigger: 'blur'},
                    ],
                    startTime: [
                        {required: true, type: 'date',message: '请填写证件有效的开始时间', trigger: 'change'},
                    ],
                    hasEndTime: [
                        {required: true, message: '请填写证件有效的结束时间', trigger: 'blur'}
                    ],

                },
            };
        },
        methods: {
            loadTruenameInfo(){
                member.memberInfo().then((result) =>{
                    this.form.truename = result.truename;
                });
                info.truenameInfo().then((result) =>{
                    this.form = result;
                    if(result.isLongUse){
                        this.form.hasEndTime = 'true';
                    }else if(result.endTime != ''){
                        this.form.hasEndTime = 'true';
                    }else{
                        this.form.hasEndTime = '';
                    }
                });
            },
            editTruename(){
                this.$refs.editTruename.validate((result) => {
                    if(result){
                        info.truenameValidate(this.form).then((result) => {
                            this.$message({message : '修改成功,请等待审核'});
                        });
                    }
                });
            },
            handleFontThumbChange(files){
                if(files[0] && files[0].length > 0){
                    this.form.frontThumb = [];
                    this.form.frontThumb.push({ url : files[0]});
                }
            },
            handleBackThumbChange(files){
                if(files[0] && files[0].length > 0){
                    this.form.backThumb = [];
                    this.form.backThumb.push({url : files[0]});
                }
            },
            handelEndtimeStatus(val){
                this.form.isLongUse = val;
                this.form.hasEndTime = val;
                if(val){
                    this.form.hasEndTime = 'true';
                }else if(this.form.endTime){
                        this.form.hasEndTime = 'true';
                    }else{
                        this.form.hasEndTime = '';
                    }
            },
            handleEntTimeChange(val){
                if(val != null){
                    this.form.hasEndTime = 'true';
                }else{
                    this.form.hasEndTime = '';
                }
            }
        },
        components: {
            'img-preview': imgPreview,
            'tc-upload': upload,
        }
    };
</script>
