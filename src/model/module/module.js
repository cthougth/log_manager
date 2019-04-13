import model from '@/model/model.js';
import api from '@/util/api.js';
import cache from '@/util/cache.js';
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
        return this.api.post(form).then((result) => {
            return this.afterAdd(result,this);
        });
    },
    info(id , field = ''){
        return this.api.get({
            r : 'blog/'+this.moduleName + '/info',
            id : id,
            field : field,
        }).then((result) => {
            return this.afterInfo(result,this);
        });
    },
    edit(id,form){
        form.id = id;
        form.r = 'blog/'+this.moduleName + '/update';
        return this.api.post(form).then((result) => {
            return this.afterEdit(result,this);
        });
    },
    delete(id){
        return this.api.post({
            r : 'blog/' + this.moduleName + '/delete',
            id : id,
        });
    },


    //预留切面方法
    afterList(result,obj){
        return result;
    },
    afterInfo(result,obj){
        return result;
    },
    afterAdd(result,obj){
        return result;
    },
    afterEdit(result,obj){
        return result;
    },
});

