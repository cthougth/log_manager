<template>
    <div class="default-state">
        <i class="default-state__icon" :class=defaultState.type :style="{ width: defaultState.width + 'px' , height: defaultState.height + 'px' , backgroundSize: defaultState.height + 'px auto' }"></i>
        <p class="default-state__text">{{defaultState.text}}</p>
    </div>
</template>
<style scoped>
    .default-state{
        padding:20px 0 30px;
        text-align: center;
    }
    .default-state__icon{
        display: inline-block;
    }
    .default-state__icon.message{
        background:url("../../assets/img/default-icon-message.png");
    }
    .default-state__icon.fav{
        background:url("../../assets/img/default-icon-fav.png");
    }
    .default-state__text{
        font-size:16px;
        font-weight: 200;
        color:#888;
    }
</style>
<script>
    export default {
        data() {
            return {
                defaultState:{
                    'type': 'message',
                    'text':'暂无信息',
                    'width':'200',
                    'height':'200'
                }
            };
        },
        props: {
            text: {
                type: String
            },
            iconType: {
                type: String
            },
            iconWidth:{
                type: Number
            },
            iconHeight:{
                type: Number
            }
        },
        mounted() {
            if(this.iconWidth || this.iconHeight){
                this.defaultState.width = this.iconWidth;
                this.defaultState.height = this.iconHeight;
            }
            if(this.text){
                this.defaultState.text = this.text;
            }
            if(this.iconType){
                this.defaultState.type = this.iconType;
            }
        },
        methods: {

        },
        watch : {

        }

    }
</script>
