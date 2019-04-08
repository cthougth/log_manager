import attention from './attention.js';
import formatDate from '@/util/formatDate.js';

export default attention.clone({

    list(page = 1 , pageSize = 10){
        return this.api.get({
            r : 'member/friend/list',
            page : page,
            pageSize : pageSize,
            userId : this.userId,
        }).then((result) => {
            if(result.data){
                result.data.forEach((item,index) => {
                    if(item.addtime){
                        result.data[index].addDate = formatDate.time(new Date(item.addtime * 1000));
                    }
                });
            }
            return result;
        });
    },

    editNote(id,note){
        return this.api.get({
            r : 'member/friend/change-friend-note',
            userId : this.userId,
            itemId : id,
            note : note,
        });
    },

    delete(ids){
        let delData = {};
        delData.r = 'member/friend/del-friend';
        delData.itemIds = ids instanceof Array ? ids.join(',') : ids;
        delData.userId = this.userId;
        return this.api.get(delData);
    },

    add(username,note){
        return this.api.get({
            r : 'member/friend/add-friend',
            username : username,
            userId : this.userId,
            note : note,
        });
    },
});
