import member from '@/model/member.js';

export default member.clone({
    //产品销售
    mallSale(mallids,type){
        let ids = '';
        if(mallids instanceof Array){
            ids = mallids.join(',');
        }else{
            ids = mallids;
        }
        return this.api.post({
            r : 'member/vip/mall-sale',
            userId : this.userId(),
            username : this.username(),
            mallIds : ids,
            type : type ? 1 : 0,
        });
    },
});
