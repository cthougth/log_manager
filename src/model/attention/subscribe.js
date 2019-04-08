import attention from './attention.js';
import config from '@/util/config.js';
import formatDate from '@/util/formatDate.js';

export default attention.clone({

    list(page,pageSize){
        return this.api.get({
            r : 'member/alert/list',
            page : page,
            pageSize : pageSize,
            username : this.username,
        }).then((result) => {
            let module = config.module;
            result.data.forEach((item,index) => {
                if(item.addtime && item.addtime != undefined){
                    let addDate = new Date(parseInt(item.addtime) * 1000);
                    result.data[index].addDate = formatDate.time(addDate);
                }
                result.data[index].moduleName = module[item.mid] ? module[item.mid].label : '';
            });
            return result;
        });
    },

    add(mid,word){
        return this.api.post({
            r : 'member/alert/add',
            mid : mid,
            word : word,
            username : this.username,
        });
    },

    edit(){

    },

    delete(id){
        return this.api.get({
            r : 'member/alert/delete',
            id : id,
        });
    },
});
