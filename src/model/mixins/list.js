export default {

    created(){
        this.loadList();
    },
    data(){
        return {
            dataModel : {},     //由调用组件声明使用的module模型

            isLoading: false,
            lists: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            selector : {},
        };
    },
    methods : {
        loadList(){
            this.isLoading = true;
            this.dataModel.list(this.pagination.current, this.pagination.pageSize,this.selector).then((result) => {
                this.lists = result.data;
                this.pagination.total = result.total;
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
            });
        },

        deleteTableItem(id){
            this.dataModel.delete(id).then((result) => {
                this.$message({message: '删除成功'});
                this.loadList();
            });
        },
        handlePagesizeChange(val){
            this.pagination.pageSize = val;
            this.pagination.current = 1;
            this.loadList();
        },
        handleCurrentChange(val){
            this.pagination.current = val;
            this.loadList();
        },
    },
}
