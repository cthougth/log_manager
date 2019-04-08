
export default{

    /**
     * 获取当前时间戳,单位秒
     * @returns {number}
     */
    now : function(){
        return parseInt((new Date()).getTime() / 1000);
    },
};
