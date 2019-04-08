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
        { label : '系统通知' , to : { name : 'Notice'}, name: 'Notice'},
        { label : '平台公告' , to : { name : 'Announce'}, name : 'Announce'}
    ]


});
