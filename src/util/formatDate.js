/**
 * 时间戳(毫秒)转换为日期格式(Y-H-D h:m:s)
 * @param date
 * @returns {string}
 */
const time = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const date = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [year, month, day].map(formatNumber).join('-')
};

const formatNumber = n => {
    n = n.toString();

    return n[1] ? n : '0' + n
};


module.exports = { time, date};
