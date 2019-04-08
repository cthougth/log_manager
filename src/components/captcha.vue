<template>
    <div>
        <div v-on:click="loadCaptcha" >
            <div style="display:none;">
                <img :src="(refreshSrc + rand )" />
            </div>
            <img :src="(src + rand)" />
        </div>
    </div>
</template>

<script>
    import widget from '@/model/widget.js';

    export default {
        created(){
            this.loadCaptcha();
        },
        data(){

            return {
                rand : '',
                refreshSrc : '',
                src : '',
                captcha : '',
            };
        },
        props : {

        },
        methods : {
            loadCaptcha(){

                this.src = widget.getImgCaptcha();
                this.refreshSrc = widget.getRefreshCaptcha();
                this.rand = parseInt(Math.random() * 10000);
            }
        },
    }
</script>

