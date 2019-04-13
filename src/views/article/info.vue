<template>
    <el-dialog :visible.sync="dialog.visible" :title="dialog.title" @close="handleClose" width="60%">
        <div class="content" v-html="blog.content">
        </div>
    </el-dialog>
</template>

<script>
    import article from '@/model/module/article.js';

    export default {
        data(){
            return {
                dialog : {
                    visible : false,
                    title :'',
                },
                blog : {},
            };
        },
        props : {
            id : {type: Number},
            visible : {type: Boolean},
        },
        methods : {
            handleClose(){
                this.dialog.visible = false;
                this.$emit('close', false);
            },
        },
        watch : {
            visible(){
                if(this.id > 0 && this.visible){
                    article.info(this.id).then((result) => {
                        this.blog = result;
                        this.dialog.title = result.title;
                        this.dialog.visible = true;
                    });
                }
            },
        },
    }
</script>
