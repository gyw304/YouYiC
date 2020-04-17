// pages/test/test.js
const util = require('../../utils/util')
const request = require('../../request')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  my : function(){


    request.postRequest(request.api.history, {}, function (res) {
      if(res.data.code == 1){
        wx.navigateTo({
          url: `../test_result/test_result`
        })
      }
      else{
        util.alert(res.data.msg)
      }
    })

    // if(util.get('score') || util.get('score') == 0){
    //   wx.navigateTo({
    //     url: '../test_result/test_result'
    //   })
    // }else{
    //   util.alert('请先进行测试')
    // }
  },

  gaishan : function(){

    var that = this;

    request.postRequest(request.api.improve, {}, function (res) {
      if(res.data.code == 1){
        wx.navigateTo({
          url: `../detail/detail?cid=${res.data.data.art_id}`
        })
      }
      else{
        util.alert(res.data.msg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '快来和我一起肠道自测打卡吧',
      path: 'pages/test/test',
      imageUrl: 'https://zhiyan.zxhong.com/wxapp/yyc/resource/static/share.jpg?33321'
    }
  }
})