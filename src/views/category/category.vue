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
                            <el-option label="最上级分类" :value="0"></el-option>
                            <el-option v-for="item in firstLevel" :key="item.sid" :label="item.sortname"
                                       :value="item.sid"></el-option>
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
            <el-select v-model="selector.pid" placeholder="上级分类" @change="loadList">
                <el-option label="最上级分类" :value="0"></el-option>
                <el-option v-for="item in firstLevel" :key="item.sid" :label="item.sortname"
                           :value="item.sid"></el-option>
            </el-select>

            <el-table style="width:99.9%" :data="lists" v-loading="isLoading">
                <el-table-column type="selection" prop="sid"></el-table-column>
                <el-table-column label="名称" prop="sortname"></el-table-column>
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
    import category from '@/model/module/category.js';
    import mixinList from '@/model/mixins/list.js';

    export default {
        mixins : [mixinList],
        data() {
            return {
                dataModel : category,
                dialog: {
                    visible: false,
                    title: '分类管理',
                },
                form: {
                    pid: 0,
                    sortname: '',
                    alias: '',
                    description: '',
                },
                isEdit: false,
                rules: {},
                firstLevel: [],
                selector : {
                    pid : 0,
                },
            };
        },
        created() {
            this.loadList();
            category.first_level().then((result) => {
                this.firstLevel = result;
            });
        },
        methods: {
            openDialog() {
                this.dialog.visible = true;
                this.form = {
                    pid: 0,
                    sortname: '',
                    alias: '',
                    description: '',
                };
                this.isEdit = false;
            },
            sendCategory() {
                this.isEdit ?
                    category.edit(this.form.sid, this.form).then((result) => {
                        this.$message({message: '修改成功'});
                        this.dialog.visible = false;
                        this.loadList();
                    }) :
                    category.add(this.form).then((result) => {
                        this.$message({message: '提交成功'});
                        this.dialog.visible = false;
                        this.loadList();
                    });
            },
            editTableItem(id) {
                category.info(id).then((result) => {
                    this.form = result;
                    this.form.pid = parseInt(result.pid);
                    this.dialog.visible = true;
                    this.isEdit = true;
                });
            },
        },
    }
</script>
