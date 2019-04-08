export default {
    clone: function (config) {
        let tmp = Object.create(this);
        for (var key in config) {
            tmp[key] = config[key];
        }
        return tmp;
    },
};
