const date_format = (date, fmt = 'yyyy.MM.dd') => {
  if (date) {
    // 如果是数字类型
    if (typeof date === 'number') {
      date = date.toString()[12] ? new Date(date) : new Date(date * 1000);
    } else {
      date = new Date(date);
    }
    var weekday = new Array(7);
    weekday[0] = "日";
    weekday[1] = "一";
    weekday[2] = "二";
    weekday[3] = "三";
    weekday[4] = "四";
    weekday[5] = "五";
    weekday[6] = "六";
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      'w+': weekday[date.getDay()],//周几
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  } else {
    return '';
  }
};

module.exports = {
  date_format
};
