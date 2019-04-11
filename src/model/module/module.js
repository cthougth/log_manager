import model from '@/model/model.js';
import api from '@/util/api.js';
import cache from '@/util/cache.js';
import member from '@/model/member.js';
import formatDate from '@/util/formatDate.js';

export default model.clone({
    api: api,
    cache: cache,

    /**
     *  moduleName ,
     *  这些属性留在子类中定义
     */

    list(page = 1 , pagesize = 10 , selector = {}){
        selector.r = 'blog/' + this.moduleName + '/list';
        selector.page = page;
        selector.pagesize = pagesize;
        return this.api.get(selector).then(this.afterList);
    },
    add(form){
        form.r = 'blog/'+this.moduleName + '/create';
        return this.api.post(form);
    },
    info(id , field = ''){
        return this.api.get({
            r : 'blog/'+this.moduleName + '/info',
            id : id,
            field : field,
        });
    },
    edit(id,form){
        form.id = id;
        form.r = 'blog/'+this.moduleName + '/update';
        return this.api.post(form);
    },
    delete(id){
        return this.api.post({
            r : 'blog/' + this.moduleName + '/delete',
            id : id,
        });
    },


    //预留切面方法
    afterList(result){
        return result;
    },
});

