// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import cookie  from '@/util/cookie.js';
import Menu from '@/components/menu.vue';

cookie.set('access_token','123456',(36000));
cookie.set('userid','61897',(36000));
cookie.set('username','cthought',(36000));

//import Token from './util/token.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);

//声明全局自定义组件导航栏
Vue.component('tc-menu',Menu);

/*
router.beforeEach((to,from,next) => {
    function fail(){
        //alert('登录超时');
    }

    if(!Token.getToken()){
        if(Token.checkRefreshToken()){
            Token.refreshToken().then(() => {
                next();
            }).catch(fail);
        }else{
            fail();
        }
    }else{
        next();
    }
});
*/

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
