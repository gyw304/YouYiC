// pages/test_detail/test_detail.js
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    score : 0,
    val_data : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.showLoading({
      title: '题目加载中...',
    })

    request.postRequest(request.api.qlist, {
      
    }, function (res) {

      if(res.data.code == 1){
        that.setData({
          items : res.data.data
        })

        wx.hideLoading()
      }
      else{
        util.alert(res.data.msg)
      }

    })

  },

  onGotUserInfo: function (e) {

    var that = this;



    request.postRequest(request.api.answer, {
      nick_name : e.detail.userInfo.nickName,
      head_img : e.detail.userInfo.avatarUrl,
      choose : that.data.val_data
    }, function (res) {



      if(res.data.code == 1){
        wx.redirectTo({
          url: '../test_result/test_result'
        })
        
      }
      else{
        util.alert(res.data.msg)
      }

    })

  },

  checkboxChange: function (e) {

    this.data.score = e.detail.value.length;

    this.data.val_data = e.detail.value.toString()


  }
})