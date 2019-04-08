import model from '@/model/model.js';
import member from '@/model/member.js';
import api from '@/util/api.js';

//会员积分
let creditObj = model.clone({

    api :api,

    menus: [
        {label: '所有积分', to: {name: 'creditList',params:{creditType:0}}, name: '0'},
        {label: '收入积分', to: {name: 'creditList', params: {creditType: 1}}, name: '1'},
        {label: '支出积分', to: {name: 'creditList', params: {creditType: 2}}, name: '2'},

    ],
    getList(creditType, params){

        return this.creditList(params.page, params.pageSize,creditType).then(this.dealListData);
    },

    dealListData(result){
        result.data.forEach((item, index) =>{
            if(item.addtime){
                result.data[index].addDate = new Date(item.addtime * 1000).toLocaleString();
            }
        });
        return result;
    },


    creditList(page = 1, pageSize = 10,creditType=0){
        return creditObj.api.get({
            r: 'member/credit/list',
            username: member.username(),
            creditType:creditType,
            page: page,
            pageSize: pageSize,
        });
    },


});

export default creditObj;
