<template>

  <el-cascader
    :options="options"
    v-model="selected"
    @change="handleChange"
    expand-trigger="hover"
    placeholder="请选择文章所属栏目"
  ></el-cascader>

</template>

<script>
  import category from '@/model/mallArticle/category.js';

  export default {
    name : 'cateSelector',
    data(){
      return {
        options : [],
        selected : [],
        selectedId : 0,
      };
    },
    created(){
      category.all().then((result) => {
        this.options = result;
      });
      if(this.catid > 0){
        this.setSelectedId(this.catid);
      }

    },
    props: {
      catid : {
        type : Number,
      }
    },
    methods :{
      handleChange(change){
        this.selectedId = change[(change.length - 1)];
        this.selected = change;
        this.$emit('change',parseInt(this.selectedId));
      },
      getSelectedId(){
        return this.selectedId;
      },
      setSelectedId(catid){
        this.setSelected(catid);
        this.selectedId = catid;
      },
      //自定义方法，设置已选择内容
      setSelected(catid){
        if(catid > 0){
          category.one(catid).then((result) => {
            this.selected = [];
            this.selected.push(result.parentid);
            this.selected.push(result.catid);
          });
        }else{
          this.selected = [];
        }
      },

    },
    watch : {
      'catid' : function(){
        this.setSelectedId(this.catid);
      },
    },
  };
</script>
