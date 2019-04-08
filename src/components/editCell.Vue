<template>
    <div class="edit-cell">
        <div v-if="isEdit">
            <div v-if="isTextarea">
                <textarea ref="cellTextarea" :rows="rows" @blur="handleBlur" v-model="showValue"></textarea>
            </div>
            <div v-else>
                <el-input ref="cellInput" v-model="showValue" @blur="handleBlur" ></el-input>
            </div>
            <template v-if="isNeedCheck">
                <el-button type="success" icon="el-icon-check" size="mini" @click.prevent="checkCell()"></el-button>
                <el-button icon="el-icon-close" size="mini" @click="cancleCell()"></el-button>
            </template>
        </div>
        <div v-else>
            <span @click="handleFocus" v-html="showValue.substr(0,30) + (showValue.length > 30 ? '...' : '')"></span>
        </div>
    </div>
</template>

<style>
    .edit-cell .el-input {
        width: auto;
    }

    .edit-cell textarea {
        width : 100%;
    }

    .edit-cell span {
        text-decoration: underline
    }
</style>

<script>
    export default {
        created() {
            this.rebuild();
        },
        data() {
            return {
                textArea : 'textarea',
                text : 'text',
                changeEmit : 'change',
                defaultShow : '[添加]',

                inputType: '',
                isEdit: false,
                isNeedCheck: false,
                isTextarea : false,

                oldValue: '',
                showValue: '',
            };
        },
        methods: {
            rebuild(){
                this.inputType = this.type;
                if(this.value && this.value.length > 0){
                    this.showValue = this.value;
                }else{
                    this.showValue = this.defaultShow;
                }
                this.isNeedCheck = this.needCheck;
                if(this.type == this.textArea){
                    this.inputType = this.textArea;
                    this.isTextarea = true;
                }else{
                    this.inputType = this.text;
                    this.isTextarea = false;
                }
            },
            handleFocus() {
                this.isEdit = true;
                this.oldValue = this.showValue;
                this.$nextTick(() => {
                    if(this.isTextarea){
                        this.$nextTick(() => {
                            this.$refs.cellTextarea.focus();
                            if(this.showValue == this.defaultShow){
                                this.showValue = '';
                            }
                        });
                    }else{
                        this.$refs.cellInput.focus();
                        if(this.showValue == this.defaultShow){
                            this.showValue = '';
                        }
                    }
                });
            },
            handleBlur(){
                if(!this.isNeedCheck){
                    this.isEdit = false;
                    if(this.showValue.length < 1){
                        this.showValue = this.defaultShow;
                    }
                    if(this.showValue != this.oldValue){
                        let sendValue = this.showValue == this.defaultShow ? '' : this.showValue;
                        this.$emit(this.changeEmit,sendValue,this.sign);
                    }
                }
            },
            checkCell() {
                this.isEdit = false;
                if(this.showValue.length < 1){
                    this.showValue = this.defaultShow;
                }
                if(this.showValue != this.oldValue){
                    let sendValue = this.showValue == this.defaultShow ? '' : this.showValue;
                    this.$emit(this.changeEmit,sendValue,this.sign);
                }
            },
            cancleCell() {
                this.isEdit = false;
                this.showValue = this.oldValue;
                if(this.showValue.length < 1){
                    this.showValue = this.defaultShow;
                }
            },
        },

        props: {
            type: {type: String},
            value: {type: String},
            rows: {type: Number},
            needCheck: {type: Boolean},
            sign : {type : Object}, //标记参数
        },
        watch: {
            type(val) {
                if (val == this.textArea) {
                    this.inputType = this.textArea;
                    this.isTextarea = true;
                }else{
                    this.inputType = this.text;
                    this.isTextarea = false;
                }
            },
            needCheck(val){
                this.isNeedCheck = val;
            },
            value(val){
                this.rebuild();
            },
        },
    }
</script>
