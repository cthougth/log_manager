import company from '@/model/company/company.js';

export default company.clone({

    isValidated(){
        return this.api.get({
            r : 'member/company/validate-license',
            userId : this.userId(),
        }).then((result) => {
            let reback = {};
            reback.status = result.status;
            reback.productLicense = result.product_license;
            return reback;
        });
    },

    validateLicense() {
        return this.api.get({
            r: 'member/company/validate-license',
            userId: this.userId(),
        }).then((result) => {
            let reback = {};
            reback.businessLicense = result.business_license ? [{url: result.business_license}] : [];
            reback.productLicense = result.product_license ? [{url: result.product_license}] : [];
            reback.businessToTime = result.business_license_totime && result.business_license_totime > 0 ?
                new Date(result.business_license_totime * 1000) : new Date();
            reback.productToTime = result.product_license_totime && result.product_license_totime > 0 ?
                new Date(result.product_license_totime * 1000) : new Date();
            reback.businessCode = result.business_license_code ? result.business_license_code : '';
            reback.statusName = result.status == 3 ? '已通过' : (
                result.status == 2 ? '待审核' : '已拒绝'
            );
            reback.note = result.note ? result.note : '';
            reback.status = result.status;
            return reback;
        });
    },

    editValidateLicense(params) {
        let postData = {};
        postData.business_license =
            params.businessLicense && params.businessLicense[0] && params.businessLicense[0].url
                ? params.businessLicense[0].url : '';
        postData.business_license_totime = params.businessToTime ? Date.parse(params.businessToTime) / 1000 : 0;
        postData.business_license_code = params.businessCode ? params.businessCode : '';
        postData.product_license =
            params.productLicense && params.productLicense[0] && params.productLicense[0].url
                ? params.productLicense[0].url : '';
        postData.product_license_totime = params.productToTime ? Date.parse(params.productToTime) / 1000 : 0;
        postData.r = 'member/company/validate-license-edit';
        postData.userId = this.userId();
        postData.username = this.username();
        return this.api.post(postData);
    },

    honorList(page, pageSize, status) {
        return this.api.get({
            r: 'member/company/honor',
            username: this.username(),
            page: page,
            pageSize: pageSize,
            status: status,
        }).then((result) => {
            result.data.forEach((item, index) => {
                if (item.addtime) {
                    result.data[index].addDate = (new Date(item.addtime * 1000)).toLocaleDateString();
                }
            });
            return result;
        });
    },

    honorOne(id) {
        return this.api.get({
            r: 'member/company/honor-one',
            username: this.username(),
            id: id,
        }).then(result => {
            let reback = {};
            reback.title = result.title;
            reback.authority = result.authority;
            reback.time = [];
            if (result.fromtime) {
                let starttime = new Date(result.fromtime * 1000);
                reback.time.push(starttime);
            } else {
                reback.time.push(new Date());
            }
            if (result.totime) {
                let totime = new Date(result.totime * 1000);
                reback.time.push(totime);
            } else {
                reback.time.push(new Date());
            }
            reback.license = [{url: result.thumb}];
            return reback;
        });
    },

    honorCheckForm(params){
        let postData = {};
        postData.title = params.title;
        postData.authority = params.authority;
        if (params.time[0] && params.time[0] instanceof Date) {
            postData.fromtime = Date.parse(params.time[0]) / 1000;
        }
        if (params.time[1] && params.time[1] instanceof Date) {
            postData.totime = Date.parse(params.time[1]) / 1000;
        }
        if(params.license && params.license[0] && params.license[0].url){
            postData.thumb = params.license[0].url;
        }
        postData.username = this.username();
        postData.userId = this.userId();
        return postData;
    },

    honorEdit(id, params) {
        let postData = this.honorCheckForm(params);
        postData.id = id;
        postData.r = 'member/company/honor-edit';
        return this.api.post(postData);
    },

    honorAdd(params){
        let postData = this.honorCheckForm(params);
        postData.r = 'member/company/honor-add';
        return this.api.post(postData);
    },

    honorDelete(id){
        let ids = id instanceof Array ? id.join(',') : id;
        return this.api.get({
            r : 'member/company/honor-delete',
            ids : ids,
            username : this.username(),
            userId : this.userId(),
        });
    },
});
