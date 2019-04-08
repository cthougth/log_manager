<template>
    <div class="preview-wrap">
        <div class="preview-main">
            <el-button  v-if='type === "text"' class="preview-type__text" @click="handleImgPreview" type="text" icon="el-icon-picture-outline">{{tip}}</el-button>
            <img v-if='type === "image"' class="preview-type__img" @click="handleImgPreview" :src="img" :width="defaultWidth" :height="defaultHeight"  />
        </div>
        <el-dialog class="preview-dialog" :visible.sync="dialogVisible" width="60%">
            <div class="preview-img">
                <img :src="img" v-bind:style="{transform: 'rotate('+rotate+'deg) scale('+scale+')'}">
            </div>
            <div class="preview-tool">
                <el-button class="preview-tool__item" @click="handleImgReset" title='原始'>1:1</el-button>
                <el-button class="preview-tool__item" @click="handleImgZoomIn" icon="el-icon-zoom-in" title='放大'></el-button>
                <el-button class="preview-tool__item" @click="handleImgZoomOut" icon="el-icon-zoom-out" title='缩小'></el-button>
                <el-button class="preview-tool__item" @click="handleImgRotate" icon="el-icon-refresh" title='旋转'></el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>
    .preview-img{
        text-align: center;
    }
    .preview-img img{
        display: inline-block;
        max-width:100%;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }
    .preview-tool{
        position: relative;
        z-index:9999;
        margin-top:20px;
        text-align: center;
    }
    .preview-tool__item{
        display: inline-block;
        font-size:18px;
    }
</style>
<script>
    export default {
        data() {
            return {
                dialogVisible:false,
                type:'text',
                tip:'查看',
                img:'',
                defaultWidth:60,
                defaultHeight:30,

                rotate:0,
                scale:1
            };
        },
        props: {
            previewType: {
                type: String
            },
            previewTypeTip: {
                type: String
            },
            imgSrc:{
                type: String
            },
            imgWidth:{
                type: Number
            },
            imgHeight:{
                type: Number
            }
        },
        mounted() {
            if(this.previewType == 'image'){
              this.img = this.imgSrc;
            }
            if(this.previewType == 'text' && this.previewTypeTip){
                this.tip = this.previewTypeTip
            }
            if(this.previewType){
              this.type = this.previewType;
            }
            if(this.imgWidth || this.imgHeight){
              this.defaultWidth = this.imgWidth;
              this.defaultHeight = this.imgHeight;
            }
        },
        methods: {
            handleImgPreview() {
                this.img = this.imgSrc;
                this.dialogVisible = true;
            },
            handleImgRotate(){
                this.rotate = this.rotate + 90;
            },
            handleImgZoomIn(){
                this.scale = this.scale+0.1;
            },
            handleImgZoomOut(){
                this.scale = this.scale-0.1;
            },
            handleImgReset(){
                this.rotate = 0;
                this.scale = 1;
            }
        },
        watch : {

        }

    }
</script>
