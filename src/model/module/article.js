import module from '@/model/module/module.js';

export default module.clone({

    moduleName: 'article',
    moduleID : 21,

    menus: [
        {label: '发布资讯', to: {name: 'articleAdd'}, name: 'ArticleAdd'},
        {label: '已发布', to: {name: 'articleList', params: {status: 'list'}}, name: 'Articlelist'},
        {label: '待审核', to: {name: 'articleList', params: {status: 'wait'}}, name: 'Articlewait'},
        {label: '未通过', to: {name: 'articleList', params: {status: 'reject'}}, name: 'Articlereject'},
    ],

    statusName: [
        {status: 2, label: '待审核', name: 'wait'},
        {status: 3, label: '已通过', name: 'list'},
        {status: 1, label: '已拒绝', name: 'reject'},
    ],

    checkForm(article){
        let postData = {};
        postData.title = article.title;
        postData.catid = article.catid;
        postData.keyword = article.keywords instanceof Array ? article.keywords.join(' ') : article.keywords;
        postData.thumb = article.thumb[0].url ? article.thumb[0].url : '';
        postData.content = article.content;
        postData.copyfrom = article.copyfrom;
        postData.fromurl = article.fromurl;
        postData.author = article.author;
        postData.introduce = article.introduce;
        return postData;
    },

    one(id){
        return this.api.get({
            r: 'member/article/one',
            itemid: id,
        }).then(result =>{
            let reback = {};
            reback.title = result.title;
            reback.catid = result.catid;
            reback.author = result.author;
            reback.copyfrom = result.copyfrom;
            reback.fromurl = result.fromurl;
            reback.introduce = result.introduce;
            reback.keywords = result.keyword.toString().split(' ');
            reback.content = result.content;
            reback.thumb = [{url: result.thumb.toString()}];
            return reback;
        });
    },

});
