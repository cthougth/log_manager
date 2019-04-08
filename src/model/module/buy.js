import module from '@/model/module/module.js';

export default module.clone({

    moduleName : 'buy',
    moduleID : 6,

    menus : [
        {label: '发布招标', to: {name: 'buyAdd'}, name: 'BuyAdd'},
        {label: '已发布', to: {name: 'buyList', params: {status: 'list'}}, name: 'Buylist'},
        {label: '待审核', to: {name: 'buyList', params: {status: 'wait'}}, name: 'Buywait'},
        {label: '未通过', to: {name: 'buyList', params: {status: 'reject'}}, name: 'Buyreject'},
    ],

    statusName: [
        {status: 2, label: '待审核', name: 'wait'},
        {status: 3, label: '已通过', name: 'list'},
        {status: 1, label: '已拒绝', name: 'reject'}
    ],




});
