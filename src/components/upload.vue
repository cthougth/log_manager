<template>
    <div>
        <el-upload
            :action="action"
            :list-type="listType"
            :file-list="value"
            :on-preview="handlePictureCardPreview"
            :limit="maxFilesNum"
            :on-remove="handleRemove"
            :before-remove="handleBeforeRemove"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :on-error="handleError"
            :name="name"
        >

            <i v-if="listType == 'picture-card'" class="el-icon-plus"></i>
            <el-button v-if="listType == 'text'" type="primary"  size="medium" plain><i class="el-icon-upload mar-rgt-5"></i>点击上传</el-button>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible" width="60%">
            <img style="display: block; max-width:100%; height:auto; margin:0 auto;" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
    import Config from '@/util/config.js';

    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                action: Config.api.upload.url,
                fileList: [],
                listType:'picture-card',
                name: Config.api.upload.name,
            };
        },
        created(){
            if(this.uploadType){
                this.listType = this.uploadType;
            }
            if(this.value){
                for (let key in this.value) {
                    let name = this.value[key].url.substr(this.value[key].url.lastIndexOf('/')+1);
                    this.value[key].name = name;
                }
                this.fileList = this.value;
            }
        },
        props: {
            value: {
                type: Array
            },
            maxFilesNum: {
                type: Number
            },
            uploadType: {
                type: String
            }
        },
        methods: {
            handleBeforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleRemove(file, fileList) {
                for (let key in this.fileList) {
                    if (file.uid == this.fileList[key].uid) {
                        this.fileList.splice(key, 1);
                    }
                }
                this.$emit('input', this.fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed(){
                this.$message({message: '最多上传' + this.maxFilesNum + '个文件', type: 'warning'});
            },
            handleSuccess(response, file, fileList){
                if (response.state === 'SUCCESS') {
                    this.fileList.push({url: Config.api.hostUrl + response.url ,name: response.title});
                    this.$emit('input', this.fileList);
                } else {
                    this.$message({message: '上传失败', type: 'warning'});
                }
            },
            handleError(err, file, fileList){
                this.$message({message: '上传失败', type: 'warning'});
            }

        },

        watch: {
            value(val) {
                for (let key in val) {
                    let name = val[key].url.substr(val[key].url.lastIndexOf('/')+1);
                    val[key].name = name;
                }
                this.fileList = val;
            },
        },
    }
</script>

