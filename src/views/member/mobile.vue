<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">我的账号</h2>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" focus="AuthMobile"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">
            <el-form v-model="form" label-width="180px">
                <el-form-item label="当前手机号码：">
                    <span class="form-item-val">{{ member.mobile }}</span>
                </el-form-item>

                <el-form-item label="新手机号码：">
                    <el-col :span="6">
                        <el-input v-model="form.mobile"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="mar-lft-10" type="primary" plain @click="sendSms" v-if="!sendMsgDisabled && !reGet">发送验证码</el-button>
                        <el-button class="mar-lft-10" type="primary" plain @click="sendSms" v-if="!sendMsgDisabled && reGet">重新获取</el-button>
                        <el-button class="mar-lft-10" type="info" plain v-if="sendMsgDisabled" disabled>{{rTime+'秒后重新获取'}}</el-button>
                    </el-col>
                </el-form-item>

                <el-form-item label="短信验证码：">
                    <el-col :span="6">
                        <el-input v-model="form.smsCaptcha"></el-input>
                    </el-col>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editMobile">修改</el-button>
                </el-form-item>
            </el-form>


        </div>
    </el-main>
</template>

<script>
    import member from '@/model/member.js';
    import info from '@/model/memberInfo/info.js';
    import widget from '@/model/widget.js';

    export default {
        created(){
            this.loadUserMobile();
        },
        data(){
            return {
                menus : info.menus,

                form : {},
                member : {},
                captcha : '',

                reGet: false, // 重新获取
                rTime: 120, // 发送验证码倒计时
                sendMsgDisabled: false, // 发送验证码按钮状态

            };
        },
        methods : {
            loadUserMobile(){
                member.memberInfo().then((result) => {
                    this.member = result;
                });
            },
            editMobile(){
                if(!this.form.mobile || this.form.mobile.length < 1){
                    this.$message({message : '请填写手机号码',type : 'warning'});
                }else if(!this.form.smsCaptcha || this.form.smsCaptcha.length < 1){
                    this.$message({message : '请填写短信验证码',type : 'warning'});
                }else {
                    info.editMobile(this.form.mobile,this.form.smsCaptcha).then((result) => {
                        this.$message({message : '修改成功'});
                        this.loadUserMobile();
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

            sendSms(){
                if(!this.form.mobile || this.form.mobile.length < 1){
                    this.$message({message : '请填写手机号码',type : 'warning'});
                }else{
                    widget.sendSms(this.form.mobile , member.username()).then((result) => {
                        this.countdown();
                        this.$message({message : '短信发送成功，请注意查收'});
                    });
                }
            },
        },
    }
</script>
