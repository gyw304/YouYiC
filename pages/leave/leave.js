// pages/leave/leave.js

const app = getApp();
const util = require('../../utils/util')
const request = require('../../request')


var cid = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isAuth : false,
    comment_val : ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    cid = options.cid

    var that = this;

    if (wx.getStorageSync('userInfo')){

      this.setData({
        isAuth: true
      })

    }
    else{
      this.setData({
        isAuth: false
      })
    }
  },

  comment_val: function (e) {
        this.setData({
            comment_val: e.detail.value
        })
  },

  getUserInfo : function(e){


    var that = this;

    if (e.detail.userInfo){

      var that = this;
      var _content = that.data.comment_val;

      var userinfo = e.detail.userInfo

      if (_content == '') {
        util.alert('请说点什么吧！')
        return
      }

      request.postRequest(request.api.comment, {
        id: cid,
        content: _content,
        nick_name: userinfo.nickName,
        head_img: userinfo.avatarUrl
      }, function (res) {
        //console.log(77777777)


        if(res.data.code == 1){
        util.alert('评论成功');
        app.globalData.comment = {
          content: _content,
          nick_name: userinfo.nickName,
          head_img: userinfo.avatarUrl
        }
        setTimeout(function () {

          wx.navigateBack({
            delta: 1
          })

        }, 1000)
       }

      })

     

    }
    // else{
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '您点击了拒绝授权，将无法进行评论，请授权之后再评论!!!',
    //     showCancel: false,
    //     confirmText: '返回授权',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击了“返回授权”')
    //       }
    //     }
    //   })
    // }

    

  },

  formSubmit: function (e){
    
    


    // mod.postData(commentUrl,{
    //   openid: wx.getStorageSync('usercode').openid,
    //   sskey: wx.getStorageSync('usercode').sskey,
    //   id: cid,
    //   content: _content,
    //   nick_name: wx.getStorageSync('userInfo').nickName,
    //   head_img: wx.getStorageSync('userInfo').avatarUrl
    // },function(res){

    //   if(res.data.code == 1){
    //     mod.showToast('评论成功');

    //     app.globalData.comment = {
    //       content: _content,
    //       nick_name: wx.getStorageSync('userInfo').nickName,
    //       head_img: wx.getStorageSync('userInfo').avatarUrl
    //     }  //comment

    //     setTimeout(function(){

    //       wx.navigateBack({
    //         delta: 1
    //       })

    //     },1000)
    //   }
    //   else{
    //     mod.showToast(res.data.msg)
    //   }


    // })


   
  }

  
})