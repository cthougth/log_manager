<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">我的账号</h2>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" focus="Password"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">

            <el-form :model="form" :rules="rules" ref="editPassword" label-width="180px">
                <el-form-item label="原始密码：" prop="password">
                    <el-col :span="6">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="新密码：" prop="newPassword">
                    <el-col :span="6">
                        <el-input type="password" v-model="form.newPassword" @change="handlePswChange"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="确认密码：" prop="repeatPassword">
                    <el-col :span="6">
                        <el-input type="password" v-model="form.repeatPassword" @change="handlePswChange"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item prop="checkPassword"></el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="changePassword">修改</el-button>
                </el-form-item>
            </el-form>

        </div>
    </el-main>
</template>

<script>
    import member from '@/model/member.js';
    import info from '@/model/memberInfo/info.js';

    export default {
        created(){

        },
        data(){
            let checkPassword = function(rule,value,callback){
                if(value){
                    callback();
                }else{
                    callback(new Error());
                }
            };

            return {
                menus : info.menus,
                form : {
                    password : '',
                    newPassword : '',
                    repeatPassword : '',
                    checkPassword : false,
                },
                rules : {
                    password : [
                        { required : true,message : '请填写原始密码',trigger : 'blur',}
                    ],
                    newPassword : [
                        { required : true , message : '请填写新密码' , trigger : 'blur'},
                    ],
                    repeatPassword : [
                        {required : true , message : '请填写确认密码' ,trigger : 'blur'},
                    ],
                    checkPassword : [
                        {validator : checkPassword ,message : '两次密码不一致',trigger : 'blur'},
                    ]
                },
            };
        },
        methods : {
            changePassword(){
                this.$refs.editPassword.validate((result) => {
                    info.editPassword(this.form.password,this.form.newPassword).then((result) => {
                        this.$message({message : '修改成功'});
                    })
                });
            },
            handlePswChange(){
                this.form.checkPassword = this.form.newPassword == this.form.repeatPassword;
            }
        },
    }
</script>
