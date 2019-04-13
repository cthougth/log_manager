<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">文章管理</h2>

            <article-info :id="articleInfo.id" :visible="articleInfo.visible" @close="articleInfo.visible = false"></article-info>
        </div>
        <!--page-header-->

        <div class="page-content">
            <el-cascader :options="category.data" v-model="category.selected" @change="handleCategoryChange">
            </el-cascader>

            <el-table style="width:99.9%" :data="lists" v-loading="isLoading">
                <el-table-column type="selection" prop="gid"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="添加日期" prop="dateStr"></el-table-column>
                <el-table-column label="所在分类" prop="sortname"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editTableItem(scope.row.gid)">编辑</el-button>
                        <el-button type="primary" size="mini" @click="showArticle(scope.row.gid)">查看</el-button>
                        <el-button type="danger" size="mini" @click="deleteTableItem(scope.row.gid)">删除</el-button>
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
    import category from '@/model/module/category.js';

    import articleInfo from '@/views/article/info.vue';

    export default {
        mixins: [mixinList],
        created() {
            this.loadList();
            category.getCascaderData().then(result => {
                this.category.data = result;
            });
        },
        data() {
            return {
                dataModel: article,

                category: {
                    data : [],
                    selected : [],
                },
                articleInfo : {
                    id : 0,
                    visible : false,
                },
            };
        },
        methods: {
            editTableItem(id) {
                this.$router.push({name: 'articleEdit', params: {id: id}});
            },
            handleCategoryChange(val){
                this.selector.sortid = val[val.length - 1];
                this.loadList();
            },
            showArticle(id){
                this.articleInfo.id = parseInt(id);
                this.articleInfo.visible = true;
            },
        },
        components : {
            'article-info' : articleInfo ,
        }
    }
</script>
