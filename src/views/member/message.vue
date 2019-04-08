<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">站内信</h2>
            <el-button class="pull-right" type="primary" size="medium" plain round @click="routerBack"><i class="iconfont icon-back-o mar-rgt-5"></i>返回列表</el-button>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content" v-loading="pageLoading">
            <div class="detail-header">
                <img class="detail-avator" :src="data.avator" alt="头像" />
                <p class="detail-fromuser">{{ data.fromuser }}</p>
            </div>
            <div class="detail-body">
                <h4>{{ data.title }}</h4>
                <p class="detail-date">发送时间：<span>{{ data.addDate }}</span></p>
                <div class="detail-content" v-html="data.content"></div>
            </div>
        </div>
        <!--page-content end-->
    </el-main>
</template>
<style scoped>
    .detail-header{
        float: left;
        width:102px;
    }
    .detail-avator{
        width:100px;
        height:100px;
        border:1px solid #eaeaea;
        border-radius:5px;
    }
    .detail-fromuser{
        margin-top:10px;
        text-align: center;
        font-size:14px;
        color:#666;
    }
    .detail-body{
        margin-left:130px;
    }
    .detail-body h4{
        margin-top:5px;
        font-size:20px;
        line-height:1.65;
        color: #333;
        font-weight: 200;
    }
    .detail-date{
        margin-top:20px;
        font-size:14px;
        color:#888;
    }
    .detail-content{
        position: relative;
        border:1px solid #eaeaea;
        padding:20px;
        margin-top:30px;
        background: #fafafa;
        border-radius:4px;
    }
    .detail-content:before,.detail-content:after{
        content: '';
        position: absolute;
        left:40px;
        border:10px solid transparent;
    }
    .detail-content:before{
        top:-21px;

        border-bottom-color: #eaeaea;
    }
    .detail-content:after{
        top:-20px;

        border-bottom-color: #fafafa;
    }


</style>
<script>
    import message from '@/model/memberInfo/message.js';

    export default {
        created(){
            this.id = this.$route.params.id;
            this.loadMessageData();
        },
        data(){
            return {
                menus : message.menus,
                id : 0,
                data : {},
                pageLoading:true
            };
        },
        methods : {
            loadMessageData(){
                this.id = this.$route.params.id;
                message.one(this.id).then((result) => {
                    this.data = result;
                    this.data.avator = 'http://www.tecenet.com/api/avatar/show.php?username='+result.fromuser+'&size=large';
                    //标记为已读
                    if(!(this.data.isread > 0)){
                        message.changeToReadStatus(this.id);
                    }

                    this.pageLoading = false;
                });
            },

            routerBack(){
                this.$router.back(-1);
            }
        },
        watch:{
            '$route' : function(){
                this.id = this.$route.params.id;
                this.loadMessageData();
            },
        },
    }
</script>
