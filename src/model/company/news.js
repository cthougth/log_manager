import company from '@/model/company/company.js';
import module from '@/model/module/module.js';

let news = company.clone({

    moduleName: 'company-news',

    statusName: [
        {status: 2, label: '待审核', name: 'wait'},
        {status: 3, label: '已通过', name: 'list'},
        {status: 1, label: '已拒绝', name: 'reject'},
    ],

    checkForm(params){
        let result = {};
        result.title = params.title;
        result.content = params.content;
        result.author = params.author ? params.author : '';
        result.keyword = (params.keyword instanceof Array) ? params.keyword.join(' ') : '';
        result.introduce = params.introduce ? params.introduce : '';
        result.thumb = (params.thumb[0] && params.thumb[0].url) ? params.thumb[0].url : '';
        result.copyfrom = params.copyfrom ? params.copyfrom : '';
        result.fromurl = params.fromurl ? params.fromurl : '';
        return result;
    },

    one(id){
        return this.api.get({
            itemid: id,
            r: 'member/company-news/one',
            username: this.username(),
        }).then((result) =>{
            let reback = {};
            reback.title = result.title;
            reback.catid = result.catid;
            reback.author = result.author;
            reback.copyfrom = result.copyfrom;
            reback.fromurl = result.fromurl;
            reback.introduce = result.introduce;
            reback.keyword = result.keyword ? result.keyword.toString().split(' ') : [];
            reback.content = result.content ? result.content : '';
            reback.thumb = result.thumb ? [{url: result.thumb.toString()}] : [];
            return reback;
        });
    },
});

export default news.merge(module);


