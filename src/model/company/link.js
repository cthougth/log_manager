import company from '@/model/company/company.js';

export default company.clone({

    list(page, pageSize, status){
        return this.api.get({
            r: 'member/company/link',
            page: page,
            pageSize: pageSize,
            status: status,
            username: this.username(),
        });
    },

    one(id){
        return this.api.get({
            r: 'member/company/link-info',
            username: this.username(),
            itemid: id,
        });
    },

    delete(id){
        return this.api.get({
            r: 'member/company/link-delete',
            itemid: id,
            username: this.username(),
        });
    },

    checkForm(params){
        let postData = {};
        console.log(params.thumb);
        postData.title = params.title;
        postData.linkurl = params.linkurl;
        postData.thumb = params.thumb && params.thumb[0] && params.thumb[0].url ? params.thumb[0].url : '';
        postData.introduce = params.introduce ? params.introduce : '';
        postData.username = this.username();
        postData.userId = this.userId();
        return postData;
    },

    edit(id, params){
        let postData = this.checkForm(params);
        postData.r = 'member/company/link-edit';
        postData.itemid = id;
        return this.api.post(postData);
    },

    add(params){
        let postData = this.checkForm(params);
        postData.r = 'member/company/link-add';
        return this.api.post(postData);
    },
});
