import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';

//member
import memberIndex from '@/views/member/index.vue';

//article
import articleForm from '@/views/article/form.vue';
import articleList from '@/views/article/list.vue';

//category
import category from '@/views/category/category.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Index,
            children: [
                {path: '', component: memberIndex, name: 'Index',},
                {path: 'article/add' , component: articleForm , name : 'articleAdd'},
                {path: 'article/list' , component : articleList , name :'articleList'},

                {path: 'category' , component : category , name : 'category'},
            ]
        },
    ]
});
