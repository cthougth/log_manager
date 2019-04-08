import attention from './attention.js';

export default attention.clone({

    add : function(title,url,note = ''){
        return this.api.post({
            r : 'member/favorite/add',
            userId : this.userId,
            title : title,
            url : url,
            note : note,
        });
    },

    edit : function(id,note){
        return this.api.post({
            r : 'member/favorite/edit',
            itemId : id,
            note : note,
            userId : this.userId,
        });
    },

    delete : function(ids){
        let putId = ids instanceof Array ? ids.join(',') : ids;
        return this.api.get({
            r : 'member/favorite/delete',
            ids : putId,
            userId : this.userId,
        });
    },

    list : function(page = 1,pageSize = 10){
        return this.api.get({
            r : 'member/favorite/list',
            userId : this.userId,
            page : page,
            pageSize : pageSize,
        }).then((result) => {
            result.data.forEach((item,index) => {
                if(item.addtime){
                    result.data[index].addDate = (new Date(item.addtime * 1000)).toLocaleDateString();
                }
            });
            return result;
        });
    },
});
