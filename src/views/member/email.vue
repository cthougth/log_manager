<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">我的账号</h2>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" focus="AuthEmail"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">
            <el-form v-model="form" label-width="180px">
                <el-form-item label="当前邮箱：">
                    <span class="form-item-val">{{ member.email }}</span>
                </el-form-item>

                <el-form-item label="新的邮箱：">
                    <el-col :span="6">
                        <el-input v-model="form.email"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="mar-lft-10" type="primary" plain @click="sendEmail" v-if="!sendMsgDisabled && !reGet">发送验证码</el-button>
                        <el-button class="mar-lft-10" type="primary" plain @click="sendEmail" v-if="!sendMsgDisabled && reGet">重新获取</el-button>
                        <el-button class="mar-lft-10" type="info" plain v-if="sendMsgDisabled" disabled>{{rTime+'秒后重新获取'}}</el-button>
                    </el-col>
                </el-form-item>

                <el-form-item label="邮箱验证码：">
                    <el-col :span="6">
                        <el-input v-model="form.emailCaptcha"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editEmail">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--page-content end-->


    </el-main>
</template>

<script>
    import info from '@/model/memberInfo/info.js';
    import member from '@/model/member.js';
    import widget from '@/model/widget.js';

    export default {
        created(){
            this.loadUserEmail();
        },
        data(){
            return {
                menus : info.menus,
                form : {},
                member : {},

                reGet: false, // 重新获取
                rTime: 120, // 发送验证码倒计时
                sendMsgDisabled: false, // 发送验证码按钮状态
            };
        },
        methods : {
            loadUserEmail(){
                member.memberInfo().then((result) => {
                    this.member = result;
                });
            },
            sendEmail(){
                if(!this.form.email || this.form.email.length < 1){
                    this.$message({message : '请填写邮箱',type : 'warning'});
                }else{
                    widget.sendSms(this.form.email , member.username()).then((result) => {
                        this.countdown();
                        this.$message({message : '邮箱发送成功，请注意查收'});
                    }).catch(() => {
                        this.$message({message : '邮箱发送失败，请联系客服人员'});
                    });
                }
            },
            editEmail(){
                if(!this.form.email || this.form.email.length < 1){
                    this.$message({message : '请填写邮箱',type : 'warning'});
                }else if(!this.form.emailCaptcha || this.form.emailCaptcha.length < 1){
                    this.$message({message : '请填写邮箱验证码',type : 'warning'});
                }else {
                    info.editEmail(this.form.email,this.form.emailCaptcha).then((result) => {
                        this.$message({message : '修改成功'});
                        this.loadUserEmail();
                    });
                }
            },

            // 倒计时
            countdown() {
                let that = this;
                that.sendMsgDisabled = true;
                let rTime = that.rTime;
                let interval = window.setInterval(() => {
                    if (--that.rTime <= 0) {
                        that.rTime = rTime;
                        that.sendMsgDisabled = false;
                        that.reGet = true; // 重新获取按钮
                        window.clearInterval(interval);
                    }
                }, 1000);
            },
        }
    }
</script>
