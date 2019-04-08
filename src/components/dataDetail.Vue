<template>
  <el-dialog :visible="dialog.visible" :title="title" @close="handleClose">
    <el-form label-width="100px" >
      <el-form-item v-for="(item,key) in data" v-if="fields[key]" :label="field[key]">
        {{item}}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

  export default {
    created(){

    },
    data(){
      return {
        datas :
          {name : '名称1',value : '值1'}
        ,
        field : {
          name : '名称',
          value : '取值',
        },

        dialog : {
          visible : false,
        },
      };
    },
    methods : {
      handleClose(){
        this.dialog.visible = false;
        this.$emit('close',false);
      },
    },

    props : {
      data : {
        type : Object,
      },
      fields : {
        type : Object,
      },
      onShow : {
        type : Boolean,
      },
      title : {
        type : String,
      },
    },

    watch : {
      onShow(newVal,oldVal){
        this.dialog.visible = newVal;
      },
    },
  };
</script>
