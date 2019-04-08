import cache from '@/util/cache.js';
import api from '@/util/api.js';

export default {

    search: function(moduleId, keyword,page,pageSize){
        let cacheKey = 'search-'+moduleId+'-kw-'+keyword+'-page-'+page+'-pageSize-'+pageSize;
        if(cache.check(cacheKey)){
            return cache.getPromise(cacheKey);
        }else{
            return api.get({
                r : 'member/search/search',
                moduleId : moduleId,
                keyword : keyword,
                page : page,
                pageSize : pageSize,
            }).then((result) => {
                cache.set(cacheKey,result,(3600));
                return result;
            });
        }
    },
};
