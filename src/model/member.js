import model from './model.js';
import cookie from '@/util/cookie.js';
import cache from '@/util/cache.js';
import api from '@/util/api.js';

let userid = 0;
let username = '';
export default model.clone({
    cookie : cookie,
    cache : cache,
    api : api,

    userId : function(){
        if(userid < 1 && this.cookie.get('userid') == null){
            //跳转登录页
        }
        if(userid < 1){
            userid = parseInt(this.cookie.get('userid'));
        }
        return userid;
    },

    username : function(){
        if(username.length < 1 && this.cookie.get('username') == null){
            //跳转登录页
        }
        if(username.length < 1){
            username = this.cookie.get('username');
        }
        return username;
    },

    /**
     * 获取用户信息
     */
    memberInfo(){
        return this.api.get({
            r : 'member/member/member-info',
            userId : this.userId(),
        });
    },

    /**
     * 用户头像
     */
    avator(){
        return 'http://www.tecenet.com/api/avatar/show.php?username='+this.username()+'&size=large';
    },

    checkUsername(username){
        return this.api.get({
            r : 'member/member/check-username',
            username : username
        });
    }
});
