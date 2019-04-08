import api from '@/util/api.js';

export default {
    api : api,

    sendSms(mobile,username){
        return this.api.get({
            r : 'member/widget/sms-mobile',
            mobile : mobile,
            username : username,
        });
    },

    sendEmail(email,username){
        return this.api.get({
            r : 'member/widget/email-code',
            email : email,
            username : username ,
        });
    },
};
