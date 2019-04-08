export default {

    /**
     * 深拷贝对象
     * @param obj
     * @returns {Object}
     */
    clone: function(obj){
        let tmp = Object.create(this);
        for (let key in obj) {
            tmp[key] = obj[key];
        }
        return tmp;
    },

    /**
     * 浅拷贝附加属性
     * @param obj
     * @returns {merge}
     */
    merge: function(obj){
        let _self = this;
        Object.getOwnPropertyNames(obj).forEach((key) => {
            _self[key] = obj[key];
        });
        return _self;
    },
};
