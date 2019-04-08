<template>
    <el-dialog title="用户信息"
               :visible.sync="dialog.visible"
               :loading="dialog.isLoading"
               @close="handleClose"
    >
        <table>
            <tr>
                <th>用户id</th>
                <td>{{info.userid}}</td>
                <th>用户名</th>
                <td>{{info.username}}</td>
            </tr>
        </table>
    </el-dialog>
</template>

<script>
    export default {
        data(){
            return {
                dialog: {
                    visible: false,
                    isLoading: false,
                },

                info: {
                    userid: 0,
                    username: '',
                    groupid: '',
                    gender: '',
                    truename: '',
                    logintimes: '',
                    lastLoginTime: '',
                    loginIp: '',
                    regTime: '',
                    regIp: '',
                    money: '',
                    score: 0,
                    mobile: '',
                    telephone: '',
                    msn: '',
                    qq: '',
                    email: '',
                    skype: '',
                    department: '',
                    career: '',
                    area: '',
                },
            };
        },
        props: {
            userid: {type: Number},
            username: {type: String},
            visible: {type: Boolean},
        },
        methods: {
            handleClose(){
                this.dialog.visible = false;
                this.$emit('close', this.dialog.visible);
            },
        },
        watch: {
            'visible': function (val) {
                this.dialog.visible = val;
            },
            'userid': function (val) {
                this.info.userid = val;
            },
            'username': function (val) {
                this.info.username = val;
            },
        },
    }
</script>
