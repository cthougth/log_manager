import system from './system'
import member from '@/model/member';
import formatDate from '@/util/formatDate.js';

//平台公告处理模型
export default system.clone({
    /**
     * 公告列表
     * @param page
     * @param pageSize
     * @returns {Promise.<TResult>|*}
     */
    list(page = 1,pageSize = 10){
        return this.api.get({
            page:page,
            pageSize:pageSize,
            r:'/member/announce/announce-list'
        }).then((result) => {
            result.data.forEach((item,index) => {
                // 时间戳转日期
                let date = new Date(item.addtime * 1000);
                result.data[index].addDate =  formatDate.time(date);
            });
            return result;
        });
    }
});






