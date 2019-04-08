import model from '@/model/model.js';
import member from '@/model/member.js';
import api from '@/util/api.js';
import md5 from 'md5';

export default model.clone({
    api: api,

    menus: [
        {label: '修改资料', to: {name: 'memberInfo'}, name: 'MemberInfo'},
        {label: '修改手机', to: {name: 'authMobile'}, name: 'AuthMobile'},
        {label: '邮箱认证', to: {name: 'authEmail'}, name: 'AuthEmail'},
        {label: '实名认证', to: {name: 'authName'}, name: 'AuthName'},
        {label: '修改密码', to: {name: 'password'}, name: 'Password'},
        {label: '站内邮件', to: {name: 'messageList',params : { status : 'receiver'}}, name: 'MessageList'},
    ],

    editInfo(info = {}){
        let postData = {};
        let checkFields = ['nickname', 'areaid', 'postcode', 'gender', 'qq', 'role', 'address'];
        checkFields.forEach((item) =>{
            if(info[item] && info[item] != undefined){
                postData[item] = info[item];
            }
        });
        postData.r = 'member/member/edit-info';
        postData.userId = member.userId();
        return this.api.post(postData);
    },

    editMobile(mobile, code){
        return this.api.post({
            r: 'member/member/edit-mobile',
            username: member.username(),
            mobile: mobile,
            code: code,
        });
    },

    editEmail(email, code){
        return this.api.post({
            r: 'member/member/edit-email',
            username: member.username(),
            email: email,
            code: code,
        });
    },

    truenameInfo(){
        return this.api.get({
            r: 'member/member/truename-info',
            userId: member.userId(),
        }).then((result) => {
            let reback = {};
            reback.truename = result.truename != undefined ? result.truename : '';
            reback.socialId = result.socialId != undefined ? result.socialId : '';
            reback.frontThumb = [];
            if(result.frontThumb != undefined){
                reback.frontThumb.push({url : result.frontThumb});
            }
            reback.backThumb = [];
            if(result.backThumb != undefined){
                reback.backThumb.push({url : result.backThumb});
            }
            reback.startTime = result.startTime != undefined ? new Date(parseInt(result.startTime) * 1000) : new Date();
            reback.endTime = (result.endTime != undefined  && result.endTime > 0) ?
                new Date(parseInt(result.endTime) * 1000) : new Date();
            reback.isLongUse = (result.isLongUse && result.isLongUse > 0) ? true : false;
            reback.statusName = result.status == 3 ? '已认证' :
                ( result.status == 2 ? '待审核' : '未认证') ;
            reback.note = result.note;
            reback.status = result.status;
            return reback;
        });
    },

    truenameValidate(params){
        //let fields = ['truename','socialId','frontThumb','backThumb','startTime','endTime','isLongUse'];
        let postData = {};
        if(params.truename){
            postData.truename = params.truename;
        }
        if(params.socialId){
            postData.socialId = params.socialId;
        }
        if(params.frontThumb && params.frontThumb instanceof Array && params.frontThumb[0].url){
            postData.frontThumb = params.frontThumb[0].url;
        }else if(params.frontThumb && params.frontThumb instanceof  String){
            postData.frontThumb = params.frontThumb;
        }
        if(params.backThumb && params.backThumb instanceof Array && params.backThumb[0].url){
            postData.backThumb = params.backThumb[0].url;
        }else if(params.backThumb && params.backThumb instanceof  String){
            postData.backThumb = params.backThumb;
        }
        if(params.startTime && params.startTime instanceof Date){
            postData.startTime = Date.parse(params.startTime) / 1000;
        }
        if(params.isLongUse){
            postData.isLongUse = 1;
        }else if(params.endTime && params.endTime instanceof Date){
            postData.endTime = Date.parse(params.endTime) / 1000;
        }
        postData.r = 'member/member/edit-truename';
        postData.userId = member.userId();
        return this.api.post(postData);
    },

    editPassword(password , newPassword){
        return this.api.post({
            r : 'member/member/edit-password',
            password : md5(password),
            newPassword : md5(newPassword),
            userId : member.userId(),
        });
    },
});
