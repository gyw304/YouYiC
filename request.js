var apiHost = "https://zhiyan.zxhong.com/wxapp/yyc/api/index.php?m=";


var api = {
  getopenid: 'index&a=openid',
  video: 'index&a=video',
  article: 'index&a=article',
  banner: 'index&a=banner',
  detail: 'index&a=artDetail',
  zan: 'index&a=zan',
  comment: 'index&a=comment',
  getDate:'index&a=getDate',
  sign: 'prize&a=sign',
  myprize: 'prize&a=myprize',
  take: 'prize&a=take',
  tags : 'video&a=tags',
  vlist : 'video&a=vlist',
  qlist : 'question&a=qlist',
  answer : 'question&a=answer',
  improve : 'question&a=improve',
  history : 'question&a=history',
  art_tags : 'video&a=art_tags'
}



/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function getRequest(url, data, success, fail) {
  wx.request({
    url: apiHost + url,
    method: 'GET',
    data: data,
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (success && typeof success === "function") {
        success(res);
      }
    },
    fail: function (error) {
      if (fail && typeof fail === "function") {
        fail(error);
      } else {
        console.log(error);
      }
    }
  })
}
/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequest(url, data, success) {

 var data = data;


  const value = wx.getStorageSync('usercode')
  if (wx.getStorageSync('usercode')) {
    data.sskey = value.sskey;
    data.openid = value.openid
  }
  

  wx.request({
    url: apiHost + url,
    method: 'POST',
    data: data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      if (success && typeof success === "function") {
        success(res);
      }
    },
    fail :function(){
      console.log(11111)
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  })


  
}




function upfileRequest(url, data, file, success) {

  var data = data;


  const value = wx.getStorageSync('usercode')
  if (wx.getStorageSync('usercode')) {
    data.sskey = value.sskey;
    data.openid = value.openid
  }


  wx.uploadFile({
    url: apiHost + url,
    filePath: file,
    name: 'upfile',
    formData: data,
    success: function (res) {
      if (success && typeof success === "function") {
        success(res);
      }
    }
  })


  // wx.request({
  //   url: apiHost + url,
  //   method: 'POST',
  //   data: data,
  //   header: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   success: function (res) {
  //     if (success && typeof success === "function") {
  //       success(res);
  //     }
  //   }
  // })



}


module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.upfileRequest = upfileRequest;
module.exports.api = api;