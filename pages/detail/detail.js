// pages/detail/detail.js
const app = getApp();
const request = require('../../request')
const util = require('../../utils/util')

var _id = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    detail : {
      comments : []
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    _id = options.cid;

    console.log(_id)

    request.postRequest(request.api.detail, { id: _id }, function (res) {
      console.log(res.data.data)
      that.setData({
        detail : res.data.data
      })
    })



    // request.postData(artDetailUrl,{
    //   openid: wx.getStorageSync('usercode').openid,
    //   sskey: wx.getStorageSync('usercode').sskey,
    //   id: _id,
    //   formid: app.globalData.formid
    // },function(res){
    //   if(res.data.code == 1){
    //     that.setData({
    //       detail: res.data.data
    //     })
    //   }
    //   else{
    //     mod.showToast(res.data.msg)
    //   }

     
    // })
  
  },

  onShow : function(){

    var that = this;

    console.log(app.globalData.comment)

    if (app.globalData.comment != null){

      var _comments = that.data.detail.comments;

      _comments.unshift(app.globalData.comment)

      that.setData({
        'detail.comments': _comments
      })

      app.globalData.comment = null

    }

  
  },

  zan : function(e){

    var that = this;

    var _id = e.currentTarget.dataset.cid;


    request.postRequest(request.api.zan, { id: _id ,type:1}, function (res) {

      console.log(res.data)

      var _zan_num = parseInt(that.data.detail.zan_num);



      if (res.data.code == 1) {
        _zan_num++

        that.setData({
          ["detail.zan"]: true,
          ["detail.zan_num"]: _zan_num
        })

        util.alert('点赞成功啦');

      }
      else{
        util.alert(res.data.msg)
      }
      
    })

  },

  gopage : function(e){
    var _id = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../leave/leave?cid=' + _id+''
    })
  }
})