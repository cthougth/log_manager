import module from './module.js';

export default module.clone({

    moduleName:'gongying',
    moduleID : 5,

    menus: [
        {label: '发布供应', to: {name: 'gongyingAdd'}, name: 'GongyingAdd'},
        {label: '已发布', to: {name: 'gongyingList', params: {status: 'list'}}, name: 'Gongyinglist'},
        {label: '待审核', to: {name: 'gongyingList', params: {status: 'wait'}}, name: 'Gongyingwait'},
        {label: '未通过', to: {name: 'gongyingList', params: {status: 'reject'}}, name: 'Gongyingreject'},
    ],

    statusName: [
        {status: 2, label: '待审核', name: 'wait'},
        {status: 3, label: '已通过', name: 'list'},
        {status: 1, label: '已拒绝', name: 'reject'},
    ],

    checkForm(gongying){
        let postData = {};
        postData.title = gongying.title;
        postData.model = gongying.model;
        postData.brand = gongying.brand;
        postData.catid = gongying.catid;
        postData.areaid = gongying.areaid;
        postData.amount = gongying.amount;
        // 时间戳转换
        if(gongying.totime && gongying.totime instanceof Date){
            postData.totime= Date.parse(gongying.totime) / 1000;
        }else{
            postData.totime = 0;
        }
        postData.thumb = [];
        // 标题图处理
        if(gongying.thumb.length>0){
            gongying.thumb.forEach(item=>{
                postData.thumb.push(item.url)
            })
        }
        postData.content = gongying.content;
        postData.truename = gongying.truename;
        postData.mobile = gongying.mobile;
        return postData;
    },

    one(id){
        return this.api.get({
            r: 'member/gongying/one',
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
            if(result.thumb1) cb.thumb.push({url:result.thumb1.toString()})
            if(result.thumb2) cb.thumb.push({url:result.thumb2.toString()})

            cb.content = result.content;
            cb.truename = result.truename;
            cb.mobile = result.mobile;
            return cb;
        });
    },

    newList : function(page = 1,pageSize = 10 , field = '*',status='list'){
        let newListCacheKey = 'gongying-new-list-cache-key-page-'+page+'-pagesize-'+pageSize;
        if(false){
            return this.cache.getPromise(newListCacheKey);
        }else{
            return this.api.get({
                r : 'member/gongying/new-list',
                page : page,
                pageSize : pageSize,
                field : field,
                status:status
            }).then((result) => {
                //写入缓存
                this.cache.set(newListCacheKey,result,(3600*12));
                return result;
            });
        }
    },

});
