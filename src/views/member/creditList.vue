<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">积分列表</h2>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" :focus="menuFocus"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">
            <el-table :data="lists" style="width:99.9%" v-loading="isLoading" >
                <el-table-column label="流水号" prop="itemid" show-overflow-tooltip width="120"></el-table-column>
                <el-table-column label="积分" prop="amount" show-overflow-tooltip width="120"></el-table-column>
                <el-table-column label="余额" prop="balance" align="center" width="120"></el-table-column>
                <el-table-column label="理由" prop="reason" align="center" ></el-table-column>
                <el-table-column label="时间" prop="addDate" align="center" width="200"></el-table-column>
            </el-table>
            <div class="table-box-foot clearfix" style="margin-top:12px;">


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
    import creditObj from '@/model/memberInfo/credit.js';

    export default {
        created(){
            this.creditType = this.$route.params.creditType;
            this.menuFocus = this.creditType;
            this.loadListData();
        },
        data(){

            return {
                creditType : 0, //类型
                menus : creditObj.menus,
                menuFocus : ''+this.creditType,

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
                creditObj.getList(this.creditType,{
                    page : this.pagination.current,
                    pageSize : this.pagination.pageSize,
                }).then((result) => {
                    this.lists = result.data;
                    this.pagination.total = result.totalCount;
                    this.isLoading = false;
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


        },
        watch : {
            '$route' : function(newVal,oldVal){
                this.creditType = this.$route.params.creditType;
                this.menuFocus = ''+this.creditType;
                this.isLoading = true;
                this.loadListData();
            },
        },
    }
</script>
