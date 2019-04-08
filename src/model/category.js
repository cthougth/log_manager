import cache from '@/util/cache.js';
import api from '@/util/api.js';

export default {

    keshi(){
        let cacheKey = 'keshi-category-all';
        if(cache.check(cacheKey)){
            return cache.getPromise(cacheKey);
        }
        return api.get({
            r: 'member/category/module',
            moduleId: 12,
        }).then((result) =>{
            cache.set(cacheKey, result, (3600 * 24 * 3));
            return result;
        });
    },

    //构建
    buildCascader(categorysData){
        if(!(categorysData instanceof Array)){
            return Promise.reject('错误分类数据');
        }

        let options = [];
        let addFirstCate = function(catname, catid){
            if(!options[catid]){
                options[catid] = {};
                options[catid].children = [];
            }
            options[catid].value = catid;
            options[catid].label = catname;
            if(options[catid].children){
                options[catid].children = [];
            }
        };
        let addSecondCate = function(catname, catid, parentid){
            if(!options[parentid]){
                addFirstCate('', parentid);
            }
            options[parentid].children.push({label: catname, value: catid});
        };

        categorysData.forEach((item) =>{
            item.parentid.toString() == '0' ? addFirstCate(item.catname, item.catid)
                : addSecondCate(item.catname, item.catid, item.parentid);
        });
        return options;
    },

    //构建穿梭框数据
    buildTransfer(categoryData){
        let transferData = [];
        categoryData.forEach((item) => {
            transferData.push({key : item.catid,label : item.catname});
        });
        return transferData;
    },
};
