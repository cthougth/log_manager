<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">文章管理</h2>
        </div>
        <!--page-header-->

        <div class="page-content">
            <el-table style="width:99.9%" :data="lists" v-loading="isLoading">
                <el-table-column type="selection" prop="gid"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="添加日期" prop="dateStr"></el-table-column>
                <el-table-column label="所在分类" prop="sortname"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editTableItem(scope.row.sid)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteTableItem(scope.row.sid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <template>
                <div class="table-box-foot clearfix">
                    <el-pagination
                        class="pull-right"
                        @size-change="handlePagesizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="parseInt(pagination.current)"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="parseInt(pagination.pageSize)"
                        layout="total, sizes, prev, pager, next"
                        :total="parseInt(pagination.total)">
                    </el-pagination>
                </div>
            </template>
        </div>
    </el-main>
</template>

<script>
    import article from '@/model/module/article.js';
    import mixinList from '@/model/mixins/list.js';

    export default {
        mixins: [mixinList],
        data() {
            return {
                dataModel: article,
            };
        },
    }
</script>
