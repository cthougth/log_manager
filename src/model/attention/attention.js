import model from '@/model/model.js';
import api from '@/util/api.js';
import member from '@/model/member.js';
import cache from '@/util/cache.js';

export default model.clone({
    api : api,
    cache : cache,
    userId : member.userId(),
    username : member.username(),

    menu : [
        { label : '信息收藏' , to : { name : 'Favorite'}, name: 'Favorite'},
        { label : '关注用户' , to : { name : 'FavMember'}, name : 'FavMember'},
        { label : '我的订阅' , to : { name : 'Subscribe'}, name : 'Subscribe'},
    ],
});
