import module from './module.js';

export default module.clone({

    moduleName:'qiugou',
    moduleID : 5,

    menus: [
        {label: '发布求购', to: {name: 'qiugouAdd'}, name: 'QiugouAdd'},
        {label: '已发布', to: {name: 'qiugouList', params: {status: 'list'}}, name: 'Qiugoulist'},
        {label: '待审核', to: {name: 'qiugouList', params: {status: 'wait'}}, name: 'Qiugouwait'},
        {label: '未通过', to: {name: 'qiugouList', params: {status: 'reject'}}, name: 'Qiugoureject'},
    ],

    statusName: [
        {status: 2, label: '待审核', name: 'wait'},
        {status: 3, label: '已通过', name: 'list'},
        {status: 1, label: '已拒绝', name: 'reject'},
    ],

    checkForm(qiugou){
        let postData = {};
        postData.title = qiugou.title;
        postData.model = qiugou.model;
        postData.brand = qiugou.brand;
        postData.catid = qiugou.catid;
        postData.areaid = qiugou.areaid;
        postData.amount = qiugou.amount;
        // 时间戳转换
        if(qiugou.totime && qiugou.totime instanceof Date){
            postData.totime= Date.parse(qiugou.totime) / 1000;
        }else{
            postData.totime = 0;
        }
        // 标题图处理
        if(qiugou.thumb[0] && qiugou.thumb[0].url && qiugou.thumb[0].url.length > 0){
            postData.thumb = qiugou.thumb[0].url;
        }else{
            postData.thumb = '';
        }
        postData.content = qiugou.content;
        postData.truename = qiugou.truename;
        postData.mobile = qiugou.mobile;
        return postData;
    },

    one(id){
        return this.api.get({
            r: 'member/qiugou/one',
            itemid: id
        }).then(result =>{
            let cb = {};
            cb.title = result.title;
            cb.model = result.model;
            cb.brand = result.brand;
            cb.catid = result.catid;
            cb.areaid = result.areaid;
            cb.amount = result.amount;
            cb.totime = result.totime == '0' ? '' : new Date(parseInt(result.totime) * 1000);
            cb.thumb = [{url: result.thumb.toString()}];
            cb.content = result.content;
            cb.truename = result.truename;
            cb.mobile = result.mobile;
            return cb;
        });
    },

    newList : function(page = 1,pageSize = 10 , field = null){
        let newListCacheKey = 'qiugou-new-list-cache-key-page-'+page+'-pagesize-'+pageSize;
        if(this.cache.check(newListCacheKey)){
            return this.cache.getPromise(newListCacheKey);
        }else{
            return this.api.get({
                r : 'member/qiugou/new-list',
                page : page,
                pageSize : pageSize,
                field : field,
            }).then((result) => {
                //写入缓存
                this.cache.set(newListCacheKey,result,(3600*12));
                return result;
            });
        }
    },

});
