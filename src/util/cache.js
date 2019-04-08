import time from './timestamp.js';

let cachePre = 'ct_blog_';
let cacheExpiresPre = 'ct_blog_expires_';

export default {

    /**
     * 设置缓存内容
     * @param cKey 缓存键值
     * @param cValue 缓存值
     * @param expires 保存时间，单位秒
     */
    set(cKey, cValue = '', expires = 0) {
        let saveTime = parseInt(expires);
        let nowTime = time.now();
        let endTime = saveTime > 0 ? saveTime + nowTime : nowTime;
        window.localStorage.setItem(cachePre + cKey, JSON.stringify(cValue));
        window.localStorage.setItem(cacheExpiresPre + cKey, endTime);
    },

    get(cKey) {
        let cacheValue = null;

        function checkCache() {
            cacheValue = window.localStorage.getItem(cachePre + cKey);
            return cacheValue !== null;
        }

        function checkExpires() {
            let expriesValue = window.localStorage.getItem(cacheExpiresPre + cKey);
            return (expriesValue && parseInt(expriesValue) > time.now());
        }

        return (checkCache() && checkExpires()) ? JSON.parse(cacheValue) : null;
    },

    check(cKey, checkValue = null) {
        let value = this.get(cKey);
        return checkValue === null ? value !== null : value === checkValue;
    },

    /**
     * 数据缓存放置在promise流程中返回
     * @param key
     */
    getPromise(key) {
        let value = this.get(key);
        return new Promise((resolve, reject) => {
            resolve(value);
        });

    },
};
