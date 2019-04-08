import member from '@/model/member.js';

export default member.clone({
    pay(type){
        return this.api.post({
            r : 'member/vip/open-vip',
            userId : this.userId(),
            payType : type,
        });
    },
});
