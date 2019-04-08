import module from './module.js';
import category from '@/model/category.js';
import member from '@/model/member.js';

export default module.clone({

    moduleName: 'mall',
    moduleID: 16,

    menus: [
        {label: '发布产品', to: {name: 'mallAdd'}, name: 'MallAdd'},
        {label: '已发布', to: {name: 'mallList', params: {status: 'list'}}, name: 'Malllist'},
        {label: '待审核', to: {name: 'mallList', params: {status: 'wait'}}, name: 'Mallwait'},
        {label: '未通过', to: {name: 'mallList', params: {status: 'reject'}}, name: 'Mallreject'},
        {label: '已下架', to: {name: 'mallList', params: {status: 'trash'}}, name: 'Malltrash'},
    ],

    statusName: [
        {status: 2, label: '待审核', name: 'wait'},
        {status: 3, label: '已通过', name: 'list'},
        {status: 1, label: '已拒绝', name: 'reject'},
        {status: 4, label: '已下架', name: 'trash'},
    ],

    //搭建级联分类选择器的数据
    categoryCascader(){
        return this.categoryAll().then((result) =>{
            return category.buildCascader(result);
        });
    },

    checkForm(data){
        let postData = {};
        if(!data.title){
            return Promise.reject('缺少标题');
        }
        postData.title = data.title;
        postData.manufacturer = data.manufacturer ? data.manufacturer : '';
        postData.batchnum = data.batchnum ? data.batchnum : '';
        postData.catid = data.catid;
        postData.areaid = data.areaid ? data.areaid : 0,
        postData.brand = data.brand;
        postData.amount = data.amount ? data.amount : 0;

        postData.priceType = data.priceType ? data.priceType : '';
        postData.lowPrice = data.lowPrice ? data.lowPrice : 0;
        postData.highPrice = data.highPrice ? data.highPrice : 0;
        postData.price = data.price ? data.price : 0;

        postData.unit = data.unit ? data.unit : '';
        postData.keyword = data.keyword && data.keyword instanceof Array ? data.keyword.join(' ') : '';
        postData.thumb = data.thumb && data.thumb[0] && data.thumb[0].url ? data.thumb[0].url : '';
        postData.thumb1 = data.thumb && data.thumb[1] && data.thumb[1].url ? data.thumb[1].url : '';
        postData.thumb2 = data.thumb && data.thumb[2] && data.thumb[2].url ? data.thumb[2].url : '';
        postData.model = data.model ? data.model : '';
        postData.standard = data.standard ? data.standard : '';
        let license = [];
        if(data.license && data.license instanceof Array){
            data.license.forEach((item) =>{
                if(item.title && item.code && item.image && item.image[0] && item.image[0].url && item.totime){
                    license.push({
                        title: item.title,
                        code: item.code,
                        url: item.image[0].url,
                        totime: Date.parse(item.totime) / 1000,
                        action : item.action ? item.action : '',
                        itemid : item.licenseId ? item.licenseId : 0,
                        isMust : item.isMust ? item.isMust : 0,
                    });
                }
            });
        }
        postData.license = JSON.stringify(license);
        if(data.keshi && data.keshi instanceof Array){
            postData.kcatids = data.keshi.join(',');
        }
        postData.introduce = data.introduce ? data.introduce : '';
        postData.content = data.content ? data.content : '';
        return postData;
    },

    one(id){
        return this.api.get({
            r: 'member/mall/one',
            itemid: id,
        }).then((result) =>{
            let reback = {};
            let field = ['title', 'manufacturer', 'batchnum', 'brand', 'amount', 'priceType', 'lowPrice', 'highPrice',
                'price', 'unit', 'model', 'standard', 'introduce', 'content',
            ];
            let mallModel = this;
            reback.selectedCate = [];
            let getSelectedCate = function(catid){
                mallModel.categoryAll().then((cates) => {
                    cates.forEach((item) => {
                        if(item.catid == catid){
                            reback.selectedCate = [item.parentid,item.catid];
                        }
                    });
                });
            };
            getSelectedCate(parseInt(result.catid));

            field.forEach((item) =>{
                reback[item] = (result[item]) ? result[item] : '';
            });
            reback.catid = parseInt(result.catid);
            reback.thumb = [];
            ['thumb', 'thumb1', 'thumb2'].forEach((item) =>{
                if(result[item]){
                    reback.thumb.push({url: result[item]});
                }
            });
            reback.keshi = result.kcatids ? result.kcatids.split(',') : [];
            reback.areaid = parseInt(result.areaid);
            reback.keyword = result.keyword ? result.keyword.split(' ') : [];
            return reback;
        });
    },

    newList: function(page = 1, pageSize = 10, field = null){
        let newListCacheKey = 'mall-new-list-cache-key-page-' + page + '-pagesize-' + pageSize;
        if(this.cache.check(newListCacheKey)){
            return this.cache.getPromise(newListCacheKey);
        }else{
            return this.api.get({
                r: 'member/mall/new-list',
                page: page,
                pageSize: pageSize,
                field: field,
            }).then((result) =>{
                //写入缓存
                this.cache.set(newListCacheKey, result, (3600 * 12));
                return result;
            });
        }
    },

    license(mallid){
        return this.api.get({
            r : 'member/mall/license',
            userId : member.userId(),
            mallId : mallid,
        }).then((result) => {
            let reback = [];
            result.forEach((item) => {
                reback.push({
                    title : item.title,
                    image : [{url : item.thumb}],
                    totime : new Date(item.expiretime * 1000),
                    code : item.batchnum,
                    isMust : item.isMust ? 1 : 0,
                    licenseId : item.itemid,
                    action : 'edit',
                });
            });
            return reback;
        });
    },


});
