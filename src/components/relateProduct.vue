<template>
    <div class="relate-wrap">
        <el-row :gutter="0">
            <el-col :span="8">
                <el-input placeholder="请输入搜索产品关键字" v-model="relateKeyword" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="searchRelateProduct"></el-button>
                </el-input>

                <el-dialog title="搜索结果" :visible.sync="relateDialogVisible" >
                    <el-table
                        :data="relateSearchResult"
                        ref="relateTable"
                        style="width: 100%"
                        v-loading="isTableLoading"
                        tooltip-effect="dark"
                        @select="handleSelect"
                    >
                        <el-table-column type="selection" width="55" ></el-table-column>
                        <el-table-column prop="itemid" label="ID" width="70"></el-table-column>
                        <el-table-column prop="title" label="产品名称" width="350" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="company" label="供应商" show-overflow-tooltip></el-table-column>
                    </el-table>

                    <el-pagination
                        class="pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="parseInt(currentPage)"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="parseInt(pagesize)"
                        :total="parseInt(totalCount)"
                        layout="total, sizes, prev, pager, next"
                    >
                    </el-pagination>
                    <div slot="footer">
                        <el-button @click="relateDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleRelateSubmit">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="form-col-header"><h3 class="form-col-header-name">已关联产品</h3></div>
            </el-col>
            <el-col :span="24">
                <el-table :data="relateProduct" style="width:100%;">
                    <el-table-column prop="title" label="产品名称"></el-table-column>
                    <el-table-column prop="company" label="供应商"></el-table-column>
                    <el-table-column label="操作" width="176px">
                        <template slot-scope="scope">
                            <el-button type="primary" plain round size="mini" icon="el-icon-view" @click="viewDetail(scope.row.itemid)">查看</el-button><el-button
                                type="danger" plain round size="mini" icon="el-icon-delete" @click="handleDeleteRelateRow(scope.$index, scope.row.itemid, relateProduct)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .relate-wrap .el-dialog__body{
        padding:0 20px 20px 20px ;
    }
    .relate-wrap .pagination{
        margin-top:20px;
        text-align: center;
    }
    .form-col-header {
        margin: 20px 0 10px 0;
        position: relative;
        text-align: center;
    }

    .form-col-header:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -1px;
        width: 100%;
        height: 1px;
        background-color: #eaeaea;

    }

    .form-col-header-name {
        display: inline-block;
        position: relative;
        padding: 0 20px;
        background-color: #fff;
        color: #888;

    }

    .el-table__header-wrapper {
        line-height: 1;
    }
</style>
<script>
    import mall from '@/model/mall/mall.js';

    export default{
        data(){
            return{
                // 关联关键词
                relateKeyword: '',
                // 关联搜索结果
                relateSearchResult:[],
                // 关联数据显示
                relateProduct:[],
                // 关联弹出框
                relateDialogVisible : false,
                // 关联弹出框loadding状态
                isTableLoading:"",
                // 默认每页数据量
                pagesize: 10,
                // 当前页码
                currentPage: 1,
                // 查询的页码
                start: 1,
                // 默认数据总数
                totalCount: 0,
                // 选择处理
                selectBox:{
                    data:[],
                    arrContains(arr, obj){
                        var i = arr.length;
                        while (i--) {
                            if (arr[i] === obj) {
                                return true;
                            }
                        }
                        return false;
                    },
                    arrRemove(val) {
                        var index = this.data.indexOf(val);
                        if (index > -1) {
                            this.data.splice(index, 1);
                        }
                    }
                }
            }
        },

        created(){
            if(typeof this.relateProductData != 'undefined'){
                const _this = this;
                _this.relateProduct = _this.relateProductData;
                setTimeout(function(){
                    for(let key in _this.relateProductData){
                        _this.selectBox.data.push(_this.relateProductData[key].itemid);
                    }
                },666);

            }
        },

        props : {
            relateProductData : {
                type : Array,
            },
        },

        watch : {
            pagesize(){
                this.loadData(this.relateKeyword,this.currentPage,this.pagesize);
            },
            currentPage(){
                this.loadData(this.relateKeyword,this.currentPage,this.pagesize);
            },
          relateProductData(){
              this.relateProduct = this.relateProductData;
              this.selectBox.data = [];
              for(let key in this.relateProductData){
                this.selectBox.data.push(this.relateProductData[key].itemid);
              }
          },
        },

        methods:{
            // 搜索按钮触发
            searchRelateProduct() {
                if(this.relateKeyword){
                    this.relateDialogVisible = true;
                    // 有关键词加载数据
                    this.loadData(this.relateKeyword,this.currentPage,this.pagesize);
                }else{
                    this.$message({message : '请输入搜索产品关键字', type : 'warning'});
                }
            },

            //加载搜索结果数据
            loadData : function(keyword,page ,pagesize){
                let putData = {};
                if(typeof keyword != 'undefined'){
                    putData.keyword = keyword;
                }
                if(typeof page != 'undefined'){
                    putData.page = page;
                }
                if(typeof pagesize != 'undefined'){
                    putData.pagesize = pagesize;
                }

                this.isTableLoading = true;
                mall.search(putData).then((result) => {
                  this.relateSearchResult = result.lists;
                  this.totalCount = result.totalCount;
                  this.$nextTick(() => {
                    this.selectBox.data.forEach((item) => {
                      this.$refs.relateTable.toggleRowSelection(this.relateSearchResult.find((d) =>
                        d.itemid == item
                      ));
                    });
                  });
                  this.isTableLoading = false;
                }).catch(() => {
                  this.relateSearchResult = [];
                  this.isTableLoading = false;
                });
            },
            handleSelect(selection,row){
                // 选择状态判断
                function getCheckStatus(selection, itemid){
                    for(let key in selection){
                        if(selection[key] == undefined){
                            continue;
                        }
                        if(selection[key].itemid == itemid ){
                            return true;
                        }
                    }
                    return false;
                }
                let checkStatus = getCheckStatus(selection,row.itemid);

                if(checkStatus){
                    // 选中push进selectBox数组中
                    if(!this.selectBox.arrContains(this.selectBox.data,row.itemid)){
                        this.selectBox.data.push(row.itemid);
                        this.relateProduct.push(row);
                    }
                }else{
                    // 从数组中去除
                    this.selectBox.arrRemove(row.itemid);
                    for(let key in this.relateProduct){
                        if(row.itemid === this.relateProduct[key].itemid){
                            this.relateProduct.splice(key, 1);
                        }
                    }
                }
                this.$emit("getRelateProduct",this.relateProduct);
            },
            handleSizeChange: function(val) {
                this.pagesize = val;
            },
            handleCurrentChange: function(val) {
                this.currentPage = val;
            },
            getRelateProductID:function(){
                return this.selectBox.data;
            },
            handleRelateSubmit(){
                this.getRelateProductID();
                this.relateDialogVisible = false;
                this.currentPage = 1;
            },
            // 刪除行信息
            handleDeleteRelateRow(index,id,rows) {
              this.selectBox.arrRemove(id);
              this.$emit("getRelateProduct",this.relateProduct);
              rows.splice(index, 1);
            },
            // 查看详细
            viewDetail(id){
                window.open("http://www.tecenet.com/chanpin/show-"+id+".html");
            },
        }

    }
</script>

