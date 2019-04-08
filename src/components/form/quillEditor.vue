<template>
    <div>
        <QuillEditor :config="config" :options="options" :content="content"></QuillEditor>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor';
    // require styles 引入样式
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
        data(){
            return {
                content : '',
                config : {

                },
                options : {

                },
            };
        },

        components: {
            'QuillEditor' : quillEditor,
        }
    }
</script>
