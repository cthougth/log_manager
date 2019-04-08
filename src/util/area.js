import cache from './cache.js';
import api from './api.js';

export default {

    allArea: function(){
        let cacheKey = 'all-area';
        if(cache.check(cacheKey)){
            return cache.getPromise(cacheKey);
        }else{
            return api.get({
                r: 'area/all-area',
            },false).then(result => {
                if(result.data.code == 1 && result.data.data){
                    cache.set(cacheKey,result.data.data,(3600*24*14));
                    return result.data.data;
                }else{
                    return [];
                }
            });
        }
    },
};
