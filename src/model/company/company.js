import member from '@/model/member.js';

export default member.clone({

    menus: [
        {label: '公司资料', to: {name: 'companyInfo'}, name: 'CompanyInfo'},
        {label: '网店设置', to: {name: 'companySetting'}, name: 'CompanySetting'},
        {label: '公司新闻', to: {name: 'companyNews'}, name: 'CompanyNews'},
        {label: '公司证书', to: {name: 'companyLicense'}, name: 'CompanyLicense'},
        {label: '友情链接', to: {name: 'companyLink'}, name: 'CompanyLink'},
    ],

    getCompanyInfo(){
        return this.api.get({
            r: 'member/company/info',
            userid: this.userId(),
        }).then((result) =>{
            result.logo = result.thumb ? [{url: result.thumb}] : [];
            result.categoryId = [];
            if(result.catid){
                let catArr = result.catid.toString().split(',');
                catArr.forEach((item) =>{
                    if(item.length > 0){
                        result.categoryId.push(item);
                    }
                });
            }
            result.scopeArr = [];
            if(result.scope && result.scope.length > 0){
                let s = JSON.parse(result.scope);
                [1, 2, 3].forEach((index) =>{
                    if(s[index] && s[index].length > 0){
                        s[index].forEach((item) =>{
                            result.scopeArr.push(index + '-' + item);
                        });
                    }
                });
            }
            result.modeArr = [];
            if(result.mode && result.mode.length > 0){
                result.modeArr = result.mode.split(',');
            }
            result.buyArr = [];
            if(result.buy && result.buy.length > 0){
                result.buyArr = result.buy.split('|');
            }
            result.sellArr = [];
            if(result.sell && result.sell.length > 0){
                result.sellArr = result.sell.split('|');
            }
            return result;
        });
    },

    getCompanyContent(){
        return this.api.get({
            r: 'member/company/content',
            userid: this.userId(),
        });
    },

    category(){
        let cacheKey = 'copany-category-all';
        if(this.cache.check(cacheKey)){
            return this.cache.getPromise(cacheKey);
        }else{
            return this.api.get({
                r: 'member/company/category',
            }).then((result) =>{
                this.cache.set(cacheKey, result, (3600 * 24 * 7));
                return result;
            });
        }
    },

    getSetting(){
        return this.api.get({
            userid: this.userId(),
            r: 'member/company/setting',
        }).then((result) =>{
            let reback = {};
            result.forEach((item) =>{
                reback[item.item_key] = item.item_value;
            });
            reback.logo = reback.logo ? [{url: reback.logo}] : [];
            reback.background = reback.background ? [{url: reback.background}] : [];
            reback.banner = reback.banner ? [{url: reback.banner}] : [];
            return reback;
        });
    },


});
