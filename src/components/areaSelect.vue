<template>
    <el-cascader style="width:100%" :options="options" v-model="selected" @change="handleChange"></el-cascader>
</template>

<script>
    import area from '@/util/area.js';

    export default {
        created(){
            this.loadAreaData();
        },
        data(){

            return {
                options : [],
                selected : [],

                //根据ID排列地区数据
                sortAreaData : [],
            };
        },
        props : {
            areaid : {type : Number},
            value : {type : Number},
        },
        methods : {
            loadAreaData(){
                area.allArea().then((result) => {
                    this.options = result;

                    for(let i = 0 ;i < result.length;i++){
                        let item = result[i];
                        if(item.value && item.value != undefined){
                            this.sortAreaData[item.value] = {};
                            this.sortAreaData[item.value].areaid = item.value;
                            this.sortAreaData[item.value].areaname = item.label;
                            this.sortAreaData[item.value].parent = 0;
                            if(item.children && item.children != undefined){
                                for(let j = 0;j < item.children.length ; j++){
                                    let childItem = item.children[j];
                                    this.sortAreaData[childItem.value] = {};
                                    this.sortAreaData[childItem.value].areaid = childItem.value;
                                    this.sortAreaData[childItem.value].areaname = childItem.label;
                                    this.sortAreaData[childItem.value].parent = item.value;
                                }
                            }
                        }
                    }

                    this.buildSelected();
                });
            },
            buildSelected(){
                this.selected = [];
                let selectedId = this.value ? this.value : this.areaid;
                this.sortAreaData.every((item,index) => {
                    if(parseInt(item.areaid) == selectedId){
                        if(item.parent && parseInt(item.parent) > 0){
                            this.selected.push(item.parent);
                        }
                        this.selected.push(item.areaid);
                        return false;
                    }
                    return true;
                });

            },
            handleChange(val){
                let result = 0;
                for(let item of val){
                    result = item;
                }
                this.$emit('change',parseInt(result));
                this.$emit('input',parseInt(result));
            }
        },
        watch : {
            'areaid' : function(){
                this.buildSelected();
            },
            'value' : function(){
                this.buildSelected();
            },
        },
    }
</script>
