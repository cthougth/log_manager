<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">发布文章</h2>
        </div>
        <!--page-header-->

        <div class="page-content">
            <el-form :model="form" :rules="rules" ref="newsForm" label-width="160px" v-loading="isLoading">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-cascader :options="category.data" v-model="category.selected" @change="handleCategoryChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="content" label="稿件正文：">
                    <u-editor :config="{initialFrameHeight: 350}" :defaultMsg="form.content" ref="ueditor"></u-editor>
                </el-form-item>
                <el-form-item>
                    <el-button @click="sendArticle">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
</template>

<script>
    import ueditor from '@/components/ueditor.vue';
    import category from '@/model/module/category.js';
    import article from '@/model/module/article.js';

    export default {
        data() {
            return {
                form: {
                    title: '',
                    content: '',
                    sortid : '',
                },
                editId : 0,
                rules: {},
                category : {
                    data : [],
                    selected : [],
                },
            };
        },
        created(){
            if(this.isEditPage()){
                article.info(this.$route.params.id).then((result) => {
                    this.form = result;
                    this.editId = this.$route.params.id;
                });
            }else{
                this.form = {title : '',content : '',sortid : ''};
            }
            category.getCascaderData().then(result => {
                this.category.data = result;
            });
        },
        methods: {
            isEditPage(){
                return this.$route.name == 'articleEdit';
            },
            handleCategoryChange(val){
                this.form.sortid = val[val.length - 1];
            },
            sendArticle(){
                this.form.content = this.$refs.uEditor.getUEContent();
                if(this.isEditPage()){
                    article.edit(this.editId , this.form).then((result) => {
                        this.$message({message : '修改成功'});
                    });
                }else{
                    article.add(this.form).then((result) => {
                        this.$message({message : '发布成功'});
                    });
                }
            }
        },
        components: {
            'u-editor': ueditor,
        },
    }
</script>
