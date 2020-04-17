//获取当前时间的时间戳

const getNowTime = function () {
  return new Date().getTime();
}

// 设置同步缓存
const set = function (name, value) {
  return wx.setStorageSync(name, value);
}

//获取缓存
const get = function (name) {
  return wx.getStorageSync(name);
}
//移除缓存
const remove = function (name) {
  return wx.removeStorageSync(name);
}

//时间戳转日期
const timestampToTime = function (timestamp) {
  let Timestamp;
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  if (timestamp.length == 10) {
    Timestamp = timestamp * 1000;
  } else {
    Timestamp = timestamp;
  }
  let date = new Date(Timestamp);
  let Y = date.getFullYear();
  let M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  //return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
  return Y + "年" + M + "月" + D + "日";
}

//验证手机号码
const regMobile = function (mobile) {
  let myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
  return myreg.test(mobile);
}

//验证身份证号码 数字和结尾字母x
const regIdcard = function (idcard) {
  let myreg = /(^\d{17}(\d|X|x)$)/;
  return myreg.test(idcard);
}

//验证邮箱地址
const regEmail = function (email) {
  let myreg = /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9{2,5}$]/;
  return myreg.test(email);
}

//字符串转数组 （character：分隔符号
const stringToArray = function (string, character) {
  return string.split(character);
}

//删除数组元素
const deletArray = function (array, index) {
  let temp = [];
  array.forEach((element, idx) => {
    if (idx != index) {
      temp.push(element);
    }
  });
  return temp;
}

//截取字符串
const formatString = function (string, num) {
  if (string) {
    if (string.length > num) {
      return string.slice(0, num) + "...";
    } else {
      return string;
    }
  } else {
    return " ";
  }
}


//http地址转https
const https = function (url) {
  var http = url.indexOf("http:");
  if (http > -1) {
    var newurl = url.replace("http", "https");
    return newurl;
  } else {
    return url;
  }
}

//自定义错误提示信息
const alert = (msg) => {
  wx.showToast({
    title: msg,
    duration: 2000,
    icon: "none"
  })
}

// 隐私数字 身份证号码，手机号码
const encryption = function (string, minIdx, maxIndex) {
  return string.substr(0, minIdx) + '****' + string.substr(maxIndex);
}

//处理数字加减乘除
const formateNumber = function (number_1, number_2, character) {
  if (character == "+") {
    return (number_1 * 10e10 + number_2 * 10e10) / 10e10;
  } else if (character == "-") {
    return (number_1 * 10e10 - number_2 * 10e10) / 10e10;
  } else if (character == "*") {
    return ((number_1 * 10e10) * (number_2 * 10e10)) / (10e10 * 10e10);
  } else if (character == "/") {
    return (number_1 * 10e10) / (number_2 * 10e10);
  }
};

// 数组去重
const reArray = (array) => {
  return Array.from(new Set(array));
}

//获取随机数
const randomNum = function (lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}


module.exports = {
  getNowTime: getNowTime,
  set: set,
  get: get,
  remove: remove,
  timestampToTime: timestampToTime,
  regMobile: regMobile,
  regIdcard: regIdcard,
  stringToArray: stringToArray,
  formatString: formatString,
  https: https,
  alert: alert,
  regEmail: regEmail,
  deletArray: deletArray,
  encryption: encryption,
  formateNumber: formateNumber,
  reArray: reArray,
  randomNum: randomNum
}