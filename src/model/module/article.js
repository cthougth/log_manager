import module from '@/model/module/module.js';

export default module.clone({

    moduleName: 'blog',

    afterList(result){
        if(result.data && result.data instanceof Array){
            result.data.forEach((item) => {
                if(item.date) item.dateStr = (new Date(item.date * 1000)).toLocaleDateString();
            });
            return result;
        }
    },

});
