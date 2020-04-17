// pages/article/article.js
const app = getApp();
const request = require('../../request')
const util = require('../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article : {
      'banner': '',
      'list' : [
        // {
        //   'id' : 0,
        //   'src': 'http://pic.qbaobei.com/Uploads/Picture/2017-04-25/58fec5f10300c.jpg',
        //   'title':'14天肠道改善计划，优益C守护肠道健康',
        //   'des': '优益C14天肠道改善计划，为你和家人的健康助力！'
        // },
        // {
        //   'id': 1,
        //   'src': 'http://pic.qbaobei.com/Uploads/Picture/2017-04-21/58f982c45b7a3.png',
        //   'title': '14天肠道改善计划，优益C守护肠道健康',
        //   'des': '优益C14天肠道改善计划，为你和家人的健康助力！'
        // },
        // {
        //   'id': 2,
        //   'src': 'http://pic.qbaobei.com/Uploads/Picture/2017-04-21/58f982c45b7a3.png',
        //   'title': '14天肠道改善计划，优益C守护肠道健康',
        //   'des': '优益C14天肠道改善计划，为你和家人的健康助力！'
        // }
      ]
     
    },
    page : 1,
    isEnd : false,
    current : 0,
    tags : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.showLoading({
      title: '加载中'
    })


    request.postRequest(request.api.banner, {}, function (res) {


      if (res.data.code == 1) {
        that.setData({
          'article.banner': res.data.data
        })
      }
      else {
        util.alert(res.data.msg)
      }

    })

    request.postRequest(request.api.art_tags, {}, function (res) {


      if (res.data.code == 1) {
        that.setData({
          tags: res.data.data
        })

        request.postRequest(request.api.article, { 
          tag_id : that.data.tags[that.data.current].tag_id,
          page : 1
        }, function (res) {


          if (res.data.code == 1) {
            that.setData({
              'article.list': res.data.data
            })
            wx.hideLoading()
          }
          else {
            util.alert(res.data.msg)
          }
    
        })



      }
      else {
        util.alert(res.data.msg)
      }

    })


    //art_tags



    

  },


  tap : function(e){

    var that = this;

    this.setData({
      current: e.currentTarget.dataset.index
    })

    wx.showLoading({
      title: '文章加载中...',
    })

    request.postRequest(request.api.article, {
      tag_id : that.data.tags[that.data.current].tag_id,
      page : 1
    }, function (res) {


      if (res.data.code == 1) {
        that.setData({
          'article.list': res.data.data
        })
        wx.hideLoading()
      }
      else {
        util.alert(res.data.msg)
      }

    })


    // request.postRequest(request.api.article, {
    //   tag_id : that.data.tags[that.data.current].tag_id
    // }, function (res) {

    //   if(res.data.code == 1){
    //     that.setData({
    //       video_list : res.data.data
    //     })

    //     wx.hideLoading()
    //   }
    //   else{
    //     util.alert(res.data.msg)
    //   }

    // })

  },


  go_detail: function (e) {
    var _cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../detail/detail?cid=' + _cid + ''
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    // if (this.data.isEnd) return;

    // var that = this;

    // wx.showLoading({
    //   title: '图文加载中...',
    // })

    // this.setData({
    //   page: this.data.page + 1
    // })

    // request.postRequest(request.api.article, { page: this.data.page }, function (res) {

    //   if (res.data.code == 1) {
    //     if (res.data.data.length > 0) {

    //       var list = that.data.article.list;

    //       for (var i = 0; i < res.data.data.length; i++) {
    //         list.push(res.data.data[i]);
    //       }

    //       that.setData({
    //         'article.list': list
    //       })

    //       wx.hideLoading()

    //     }
    //     else {

    //       that.setData({
    //         isEnd: true
    //       })

    //       util.alert('没有更多文章了!')
    //     }
    //   }

    // })

  },
})