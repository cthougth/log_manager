<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">站内信</h2>
            <router-link class="pull-right el-button el-button--primary el-button--medium is-plain is-round"  :to="{name : 'messageSend'}">
                <i class="iconfont icon-add-o mar-rgt-5"></i>发送站内信
            </router-link>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" :focus="menuFocus"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">
            <el-table :data="lists" style="width:99.9%" v-loading="isLoading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column label="发件人" prop="fromuser" show-overflow-tooltip width="120"></el-table-column>
                <el-table-column label="标题" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <router-link class="table-link" :class="[scope.row.isread == '0' ? 'unread' : 'isread']" :to="{name : 'message' , params : {id : scope.row.itemid}}">
                            <el-tag size="mini" type="warning" v-if="scope.row.isread == '0'">未读</el-tag>
                            <span>{{ scope.row.title}}</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="typeName" align="center" width="120"></el-table-column>
                <el-table-column label="发送时间" prop="addDate" align="center" width="200"></el-table-column>
            </el-table>
            <div class="table-box-foot clearfix" style="margin-top:12px;">

                <el-button v-if="status != 'trash'" type="default" size="mini" plain @click="trash">删除</el-button>
                <el-button type="danger" size="mini" plain @click="deleteMessage">彻底删除</el-button>
                <el-button v-if="status == 'receiver'" type="warning" size="mini" plain @click="changeToRead">标记已读</el-button>

                <el-pagination
                    class="pull-right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="parseInt(pagination.current)"
                    :page-sizes="[10,20]"
                    :page-size="parseInt(pagination.pagesize)"
                    layout="total, sizes, prev, pager, next"
                    :total="parseInt(pagination.total)"
                >
                </el-pagination>
            </div>
        </div>
        <!--page-content end-->
    </el-main>
</template>

<script>
    import message from '@/model/memberInfo/message.js';

    export default {
        created(){
            this.status = this.$route.params.status;
            this.menuFocus = this.menuName[this.status] ? this.menuName[this.status] : 'MessageReceiver';
            this.loadListData();
        },
        data(){

            return {
                status : 'receiver',
                menus : message.menus,
                menuFocus : 'MessageReceiver',
                menuName : {
                    'receiver': 'MessageReceiver',
                    'sender': 'MessageSender',
                    'trash': 'MessageTrash',
                },
                lists : [],
                isLoading : false,

                pagination : {
                    current : 1,
                    pageSize : 10,
                    total : 0,
                },

                selection : {
                    id : [],
                }
            };
        },
        methods : {
            loadListData(){
                this.isLoading = true;
                message.getList(this.status,{
                    page : this.pagination.current,
                    pageSize : this.pagination.pageSize,
                }).then((result) => {
                    this.lists = result.data;
                    this.pagination.total = result.totalCount;
                    this.isLoading = false;

                    console.log(this.lists);
                }).catch(() => {
                    this.isLoading = false;
                });
            },
            handleSizeChange(val){
                this.pagination.pageSize = val;
                this.pagination.current = 1;
                this.loadListData();
            },
            handleCurrentChange(val){
                this.pagination.current = val;
                this.loadListData();
            },
            handleSelectionChange(val){
                this.selection.id = [];
                val.forEach((item,index) => {
                    this.selection.id.push(item.itemid);
                });
            },
            changeToRead(){
                if(this.selection.id.length < 1){
                    this.$message({message : '没有选择信件',type : 'warning'});
                }else{
                    message.changeToReadStatus(this.selection.id).then((result) => {
                       this.$message({message : '修改成功'});
                       this.loadListData();
                    });
                }
            },
            trash(){
                if(this.selection.id.length < 1){
                    this.$message({message : '没有选择信件',type : 'warning'});
                }else{
                    this.$confirm('确定将信件放到回收站？').then(() => {
                        message.trash(this.selection.id).then((result) => {
                            this.$message({message : '回收成功'});
                            this.loadListData();
                        });
                    });
                }
            },
            deleteMessage(){
                if(this.selection.id.lenght < 1){
                    this.$message({message : '没有选择信件',type : 'warning'});
                }else{
                    this.$confirm('确定删除信件？此操作将不能找回数据！').then(() => {
                        message.delete(this.selection.id).then((result) => {
                            this.$message({message : '删除成功'});
                            this.loadListData();
                        });
                    });
                }
            },
        },
        watch : {
            '$route' : function(newVal,oldVal){
                this.status = this.$route.params.status;
                this.menuFocus = this.menuName[this.status] ? this.menuName[this.status] : 'MessageReceiver';
                this.isLoading = true;
                this.loadListData();
            },
        },
    }
</script>
