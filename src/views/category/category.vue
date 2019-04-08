<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">分类管理</h2>
            <el-button class="pull-right" plain round type="primary" @click="openDialog">
                <i class="iconfont icon-add-o mar-rgt-5"></i>分类
            </el-button>

            <el-dialog :visible.sync="dialog.visible" :title="dialog.title">
                <el-form :model="form" :rules="rules" ref="categoryForm">
                    <el-form-item label="上级分类">
                        <el-select v-model="form.pid" placeholder="上级分类">
                            <el-option label="最上级分类" :value="0" ></el-option>
                            <el-option v-for="item in firstLevel" :key="item.sid" :label="item.sortname" :value="item.sid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input type="text" v-model="form.sortname"></el-input>
                    </el-form-item>
                    <el-form-item label="地址别称">
                        <el-input type="text" v-model="form.alias"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍">
                        <el-input type="textarea" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sendCategory">提交</el-button>
                        <el-button type="reset" @click="dialog.visible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <!--page-header-->

        <div class="page-content">
            <el-table style="width:99.9%" :data="lists" v-loading="isLoading">
                <el-table-column type="selection" prop="sid"></el-table-column>
                <el-table-column label="名称" prop="sortname"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini">编辑</el-button>
                        <el-button type="primary" size="mini">查看子分类</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="table-box-foot clearfix">
                <el-pagination
                    class="pull-right"
                    @size-change="pagination.pageSize"
                    @current-change="pagination.current"
                    :current-page="parseInt(pagination.current)"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="parseInt(pagination.pageSize)"
                    layout="total, sizes, prev, pager, next"
                    :total="parseInt(pagination.total)">
                </el-pagination>
            </div>
        </div>
    </el-main>
</template>

<script>
    import category from '@/model/module/category.js';

    export default {
        data() {
            return {
                isLoading: false,
                lists: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10,
                },
                dialog: {
                    visible: false,
                    title: '添加分类',
                },
                form: {
                    pid : 0,
                    sortname :'',
                    alias : '',
                    description : '',
                },
                rules: {},
                firstLevel : [],
            };
        },
        created() {
            this.isLoading = true;
            category.list(this.pagination.current, this.pagination.pageSize).then((result) => {
                this.lists = result.data;
                this.pagination.total = result.total;
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
            });
            category.first_level().then((result) => {
                this.firstLevel = result;
            });
        },
        methods: {
            openDialog() {
                this.dialog.visible = true;
            },
            sendCategory(){
                category.add(this.form).then((result) => {
                    this.$message({message : '提交成功'});
                    this.dialog.visible = false;
                    this.created();
                });
            },
        },
    }
</script>
