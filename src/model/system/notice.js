import system from './system.js';
import member from '@/model/member.js';
import formatDate from '@/util/formatDate.js';

//系统通知处理模型
export default system.clone({

    /**
     * 获取未读系统通知
     * @param pageSize
     */
    unread(pageSize = 5){
        return this.api.get({
            username : this.username,
            pageSize : pageSize,
            unRead : 1,
            r : 'member/message/notice',
        });
    },

    /**
     * 通知列表
     * @param page
     * @param pageSize
     * @returns {Promise.<TResult>|*}
     */
    list(page = 1,pageSize = 10){
        return this.api.get({
            username : this.username,
            page : page,
            pageSize : pageSize,
            r : 'member/message/notice',
        }).then((result) => {
            let unRead = [];
            result.data.forEach((item,index) => {
                let date = new Date(item.addtime * 1000);
                result.data[index].addDate =  formatDate.time(date);
                if(parseInt(item.isread) > 0){
                    result.data[index].readStatus = '已读';
                }else{
                    result.data[index].readStatus = '未读';
                    unRead.push(item.itemid);
                }
            });

            //修改阅读状态
            if(unRead.length > 0){
                this.changeToRead(unRead.join(','));
            }
            return result;
        });
    },

    /**
     * 修改信息状态为已读
     * @param ids
     */
    changeToRead(ids){
        return this.api.get({
            r : 'member/message/change-read-status',
            ids : ids,
            userId : member.userId(),
        },false);
    },
});
