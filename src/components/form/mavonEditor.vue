<template>
    <div>
        <mavonEditor></mavonEditor>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';

    export default {
        data(){
            return {
                value : '',
            };
        },
        components : {
          mavonEditor
        }
    }
</script>
