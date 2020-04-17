// pages/video/video.js

const request = require('../../request')
const util = require('../../utils/util')

const TxvContext = requirePlugin("tencentvideo");




Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_list : [],
    page: 1,
    current : 0,
    isEnd : false,
    tags : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    request.postRequest(request.api.tags, {
      
     }, function (res) {
     

      if(res.data.code == 1){
        that.setData({
          tags : res.data.data
        })

        wx.showLoading({
          title: '视频加载中...',
        })

        request.postRequest(request.api.vlist, {
          tag_id : that.data.tags[that.data.current].tag_id
        }, function (res) {
    
    
          if(res.data.code == 1){
            that.setData({
              video_list : res.data.data
            })
    
            wx.hideLoading()
          }
          else{
            util.alert(res.data.msg)
          }
    
        })


      }
      else{
        util.alert(res.data.msg)
      }

    })


    

    //page: this.data.page
    

  },

  tap : function(e){

    var that = this;

    this.setData({
      current: e.currentTarget.dataset.index
    })

    wx.showLoading({
      title: '视频加载中...',
    })


    request.postRequest(request.api.vlist, {
      tag_id : that.data.tags[that.data.current].tag_id
    }, function (res) {

      if(res.data.code == 1){
        that.setData({
          video_list : res.data.data
        })

        wx.hideLoading()
      }
      else{
        util.alert(res.data.msg)
      }

    })

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    // if (this.data.isEnd) return;
    
    // var that = this;

    // wx.showLoading({
    //   title: '视频加载中...',
    // })

    // this.setData({
    //   page: this.data.page + 1
    // }) 

    // request.postRequest(request.api.video, { page: this.data.page }, function (res) {

    //   if (res.data.code == 1) {
    //     if (res.data.data.length > 0) {

    //       var list = that.data.video_list;

    //       for (var i = 0; i < res.data.data.length; i++) {
    //         list.push(res.data.data[i]);
    //       }

    //       that.setData({
    //         video_list: list
    //       })

    //       wx.hideLoading()

    //     }
    //     else {

    //       that.setData({
    //         isEnd : true
    //       })

    //       util.alert('没有更多视频了!')
    //     }
    //   }

    // })

  },

  onHide : function(){

    var currPlayerId = TxvContext.getLastPlayId();     //获取当前播放视频的playerid
    var currPlayerContxt = TxvContext.getTxvContext(currPlayerId)   //获取当前播放视频的上下文，可进行play，pause等操作
     currPlayerContxt.pause()
  }

})