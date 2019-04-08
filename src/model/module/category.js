import module from './module.js';

export default module.clone({
    moduleName : 'category',

    //cacheKey
    list_all_key : 'category-list-all',     //所有分类
    first_all_key : 'category-first-level', //最上级所有分类

    /**1
     * 获取所有分类内容
     * @returns Promise
     */
    list_all(){
        if(this.cache.check(this.list_all_key)){
            return this.cache.getPromise(this.list_all_key);
        }else{
            return this.api.get({
                r : 'blog/category/list-all',
            }).then((result) => {
                this.cache.set(this.list_all_key,result,3600*3);
                return result;
            });
        }
    },

    first_level(){
        if(this.cache.check(this.first_all_key)){
            return this.cache.getPromise(this.first_all_key);
        }else{
            return this.list_all().then((result) => {
                let data = [];
                result.list.forEach(item => {
                    if(parseInt(item.pid) == 0){
                        data.push(item);
                    }
                });
                this.cache.set(this.first_all_key,data,3600*3);
                return data;
            });
        }
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
            item.pid.toString() == '0' ? addFirstCate(item.sortname, item.sid)
                : addSecondCate(item.sortname, item.sid, item.pid);
        });
        return options;
    },

    getCascaderData(){
        const _self = this;
        return this.list_all().then(result => {
            return _self.buildCascader(result.list);
        });
    },
});
