<template>
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
</template>

