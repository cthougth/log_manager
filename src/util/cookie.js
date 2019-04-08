export default {

    pre: 'tc_member_',
    /**
     * 设置cookie
     * @param cKey
     * @param cValue
     * @param cExpires 保存时间，单位秒
     */
    set(cKey, cValue, cExpires) {
        let d = new Date();
        d.setTime(d.getTime() + (cExpires * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = this.pre + cKey + '=' + cValue + ';' + expires;
    },

    /**
     * 获取cookie值
     * @param cKey
     * @returns {*}
     */
    get(cKey) {
        let name = this.pre + cKey + '=';
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return '';
    },

    /**
     * 清理指定cookie
     * @param cKey
     */
    clear(cKey) {
        this.set(cKey, '', -1);
    },

    /**
     * 清理所有cookie
     */
    clearAll() {
        document.cookie = '';
    },

    /**
     * 检查cookie
     * @param cKey
     * @param checkValue
     */
    check(cKey, checkValue) {
        return checkValue ? (checkValue === this.get(cKey)) : (this.get(cKey).length > 0);
    },
};
