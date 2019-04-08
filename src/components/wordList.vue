<template>
  <div>
  <el-tag
    :key="tag"
    v-for="tag in words"
    closable
    :disable-transitions="false"
    style="margin-right:12px;"
    @close="handleWordClose(tag)">
    {{tag}}
  </el-tag>
    <el-input
      class="input-new-tag"
      v-if="addInputVisible"
      v-model="addInputValue"
      ref="saveWordInput"
      size="small"
      @blur="handleInputConfirm"
      style="width:100px;"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showAddInput" v-html="buttonWord"></el-button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        words : [],
        addInputVisible : false,
        addInputValue : '',
      };
    },
    props : {
      buttonWord : {
        type : String,
      },
      maxWordNum : {
        type : Number,
      },
      wordList : {
        type : Array,
      },
    },
    created(){
      if(typeof this.wordList != 'undefined'){
          this.setWords(this.wordList);
      }
    },
    methods : {
      showAddInput(){
        if(this.words.length >= this.maxWordNum){
          this.$message({message:'最多填写'+ this.maxWordNum + '个词语',type:'warning'});
        }else{
          this.addInputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveWordInput.$refs.input.focus();
          });
        }
      },
      handleWordClose(tag){
        for(let key in this.words){
          if(this.words[key] == tag){
            this.words.splice(key,1);
            break;
          }
        }
        this.$emit('getWordsResult',this.words);
      },
      handleInputConfirm(){
        if(this.addInputValue.length > 0){
          this.words.push(this.addInputValue);
        }
        this.addInputVisible = false;
        this.addInputValue = '';
        this.$emit('getWordsResult',this.words);
      },
      getWords(){
        return this.words;
      },
      setWords(words){
          if(words instanceof  Array){
              this.words = [];
              words.forEach((item,index) => {
                  if(item.length > 0){
                      this.words.push(item);
                  }
              });
          }
      }
    },
    watch : {
      'wordList': function(){
          this.setWords(this.wordList);
      },
    },
  };
</script>
