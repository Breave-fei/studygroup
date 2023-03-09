// 中国标准时间转换yyyy-mm-dd
export function setChinaDate(date) {
    let newDate = new Date(date);
    let y = newDate.getFullYear();
    let m = newDate.getMonth() + 1;
    m = m < 10 ? ("0" + m) : m;
    let d = newDate.getDate()
    d = d < 10 ? ("0" + d) : d;
    let time = y + "-" + m + "-" + d;
    return time;
}

// 时间戳转换 yyyy-mm-dd
export function setTimeStamp(date) {
    let newDate = new Date(parseInt(date));
    let y = newDate.getFullYear();
    let m = newDate.getMonth() + 1;
    m = m < 10 ? ("0" + m) : m;
    let d = newDate.getDate()
    d = d < 10 ? ("0" + d) : d;
    let time = y + "-" + m + "-" + d;
    return time;
}

// 获取当前日期
export function getNewDate() {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth();
    if (m < 10) {
        m = "0" + (m + 1);
    }
    let d = date.getDate();
    if (d < 10) {
        d = "0" + d;
    }
    date = y + "-" + m + "-" + d;
    return date;
}

// {
//     date.getYear(); //获取当前年份(2位)
//     date.getFullYear(); //获取完整的年份(4位)
//     date.getMonth(); //获取当前月份(0-11,0代表1月)
//     date.getDate(); //获取当前日(1-31)
//     date.getDay(); //获取当前星期X(0-6,0代表星期天)
//     date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
//     date.getHours(); //获取当前小时数(0-23)
//     date.getMinutes(); //获取当前分钟数(0-59)
//     date.getSeconds(); //获取当前秒数(0-59)
//     date.getMilliseconds(); //获取当前毫秒数(0-999)
//     date.toLocaleDateString(); //获取当前日期
//     var mytime = date.toLocaleTimeString(); //获取当前时间
//     date.toLocaleString(); //获取日期与时间
// }