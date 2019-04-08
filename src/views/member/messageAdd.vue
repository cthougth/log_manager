<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">站内信</h2>
            <el-button class="pull-right" type="primary" size="medium" plain round @click="routerBack"><i class="iconfont icon-back-o mar-rgt-5"></i>返回列表</el-button>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" focus="MessageSend"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">
            <el-form :model="form" :rules="rules" ref="messageForm" label-width="100px">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="form.username" @blur="checkUsername"></el-input>
                </el-form-item>
                <el-form-item label="主题：" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容：" prop="content">
                    <u-editor ref="uEditor" :defaultMsg="form.content" :config="config"></u-editor>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="sendMessage">提交</el-button>
                    <el-button type="reset">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--page-content end-->
    </el-main>
</template>

<script>
    import message from '@/model/memberInfo/message.js';
    import uEditor from '@/components/ueditor.vue';
    import member from '@/model/member.js';

    export default {
        created(){
            if(this.$route.params.username){
                this.form.username = this.$route.params.username;
            }
        },
        data(){
            return {
                menus : message.menus,

                form : {
                    username : '',
                    title : '',
                    content : '',
                    usernameExist : false,
                },
                rules : {
                    username : [
                        { required : true , message : '请填写收件人的用户名',trigger : 'blur'}
                    ],
                    title : [
                        { required : true , message : '请填写标题', trigger : 'blur'}
                    ],
                    content : [
                        { required : true , message : '请填写内容', trigger : 'blur'}
                    ],
                },
                config:{
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
            };
        },
        methods : {
            sendMessage(){
                this.form.content = this.$refs.uEditor.getUEContent();
                this.$refs.messageForm.validate((result) => {
                    if(!this.form.usernameExist){
                        this.$message({message : '用户名不存在' ,type : 'warning'});
                    }else{
                        message.add(this.form.username,this.form.title,this.form.content).then((result) => {
                            this.$message({message : '发送成功'});
                        });
                    }
                });
            },
            checkUsername(){
                if(this.form.username.length > 0){
                    member.checkUsername(this.form.username).then((result) => {
                        if(result.username && result.username != undefined){
                            this.form.usernameExist = true;
                        }else {
                            this.form.usernameExist = false;
                            this.$message({message : '用户名不存在',type : 'warning'});
                        }
                    });
                }
            },
            routerBack(){
                this.$router.back(-1);
            }

        },
        components : {
            'u-editor' : uEditor,
        },
        watch : {
            '$route' : function(newVal,oldVal){
                if(this.$route.params.username){
                    this.form.username = this.$route.params.username;
                }
            }
        },
    }
</script>
