import model from '@/model/model.js';
import api from '@/util/api.js';
import cache from '@/util/cache.js';
import member from '@/model/member.js';
import formatDate from '@/util/formatDate.js';

export default model.clone({
    api: api,
    cache: cache,

    /**
     *  menus,
     *  moduleName ,
     *  moduleID,
     *  statusName,
     *  checkForm()
     *  这些属性留在子类中定义
     */

    list(page = 1 , pagesize = 10){
        return this.api.get({
            r : 'blog/' + this.moduleName + '/list',
            page : page,
            pagesize : pagesize
        });
    },

    add(form){
        form.r = 'blog/'+this.moduleName + '/create';
        return this.api.post(form);
    },
});

