import model from '@/model/model.js';
import member from '@/model/member.js';
import api from '@/util/api.js';
import formatDate from '@/util/formatDate.js';

//站内邮箱管理
let messageObj = model.clone({

    api :api,

    menus: [
        {label: '发送站内信', to: {name: 'messageSend'}, name: 'MessageSend'},
        {label: '收件箱', to: {name: 'messageList', params: {status: 'receiver'}}, name: 'MessageReceiver'},
        {label: '已发送', to: {name: 'messageList', params: {status: 'sender'}}, name: 'MessageSender'},
        {label: '垃圾箱', to: {name: 'messageList', params: {status: 'trash'}}, name: 'MessageTrash'},
        {label: '转发设置', to: {name: 'messageSet'}, name: 'MessageSet'},
    ],

    type : {
        0 : '站内通信',
        1 : '询价',
        2 : '报价',
        3 : '留言',
        4 : '系统通知',
    },

    messageStatus : {
        2 : '待审核',
        3 : '已通过',
        4 : '回收站',
    },

    getList(status, params){
        let statusFunc = {
            'receiver': this.receiveList,
            'sender': this.sendList,
            'trash': this.trashList,
        };
        let func = statusFunc[status] ? statusFunc[status] :
            function(){
                return Promise.reject('不存在的页面状态');
            };
        return func(params.page, params.pageSize).then(this.dealListData);
    },

    dealListData(result){
        result.data.forEach((item, index) =>{
            if(item.addtime){
                result.data[index].addDate = formatDate.time(new Date(item.addtime * 1000));
            }
            result.data[index].typeName = (messageObj.type[item.typeid] != undefined) ? messageObj.type[item.typeid] : '';
            result.data[index].fromuser = (item.typeid == 4) ? '管理员' : item.fromuser;
        });
        return result;
    },

    sendList(page = 1, pageSize = 10){
        return messageObj.api.get({
            r: 'member/message/list',
            fromuser: member.username(),
            page: page,
            pageSize: pageSize,
        });
    },

    receiveList(page = 1, pageSize = 10){
        return messageObj.api.get({
            r: 'member/message/list',
            touser: member.username(),
            page: page,
            pageSize: pageSize,
        });
    },

    trashList(page = 1, pageSize = 10){
        return messageObj.api.get({
            r : 'member/message/list',
            touser : member.username(),
            page : page,
            pageSize : pageSize,
            status : 4,
        });
    },

    changeToReadStatus(ids){
        let getData = {};
        getData.ids = ids instanceof Array ? ids.join(',') : ids;
        getData.r = 'member/message/change-read-status';
        return messageObj.api.get(getData);
    },

    trash(ids){
        let getData = {};
        getData.ids = ids instanceof Array ? ids.join(',') : ids;
        getData.r = 'member/message/trash';
        return messageObj.api.get(getData);
    },

    delete(ids){
        let getData = {};
        getData.ids = ids instanceof Array ? ids.join(',') : ids;
        getData.r = 'member/message/delete';
        return messageObj.api.get(getData);
    },

    one(id){
        return messageObj.api.get({
            r : 'member/message/one',
            id : id,
            username : member.username(),
        }).then((result) => {
            result.addDate = formatDate.time(new Date(result.addtime * 1000));
            return result;
        });
    },

    add(touser,title,content){
        return messageObj.api.post({
            r : 'member/message/add',
            touser : touser,
            fromuser : member.username(),
            title : title,
            content : content ,
            typeid  : 0,
        });
    }
});

export default messageObj;
