// pages/test_result/test_result.js
const util = require('../../utils/util')
const request = require('../../request')
import Poster from '../../miniprogram_dist/poster/poster';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo: null,

    config: {},

    src : '',

    success : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;


    request.postRequest(request.api.history, {}, function (res) {
      if(res.data.code == 1){
       var score = res.data.data.num;
       var date = res.data.data.add_date;
       var _score = 0;
       var nick_name = res.data.data.nick_name;
       var head_img = res.data.data.head_img;

       if(score<=0){
        _score = 5
      }else if(score>0&&score<=4){
        _score = 4
      }else if(score>4&&score<=12){
        _score = 3
      }else if(score>12&&score<=16){
        _score = 2
      }else if(score>16&&score<=20){
        _score = 1
      }
  
  
      that.setData({
        posterConfig: {
          width: 682,
          height: 943,
          backgroundColor: 'rgba(255,255,255,0)',
          debug: false,
          pixelRatio: 1,
          texts: [
            {
              x: 350,
              y: 185,
              baseLine: 'middle',
              text: nick_name,
              fontSize: 26,
              color: '#666666',
            },
            {
              x: 350,
              y: 242,
              baseLine: 'middle',
              text: `符合${score}项`,
              fontSize: 26,
              color: '#666666',
            },
            {
              x: 350,
              y: 300,
              baseLine: 'middle',
              text: date,
              fontSize: 26,
              color: '#666666',
            }
          ],
          images: [
            {
              width: 682,
              height: 943,
              x: 0,
              y: 0,
              url: 'https://zhiyan.zxhong.com/wxapp/yyc/resource/static/poster/bg.png?4',
              
            },
            {
              width: 140,
              height: 140,
              x: 80,
              y: 171,
              url: head_img,
              borderWidth:20,
              borderColor:'#e6002d'
            },
            {
              width: 500,
              height: 333,
              x: 70,
              y: 340,
              url: `https://zhiyan.zxhong.com/wxapp/yyc/resource/static/poster/${_score}.png`,
            }
          ]
        }
      }, () => {
        Poster.create(true);
      });
      
      }
      else{
        util.alert(res.data.msg)
      }
    })




   


  },

  onPosterSuccess: function (e) {
    this.setData({
      src: e.detail,
      success : true
    })

    console.log(e.detail)
  },

  repaly : function(){
    wx.redirectTo({
      url: '../test_detail/test_detail'
    })
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

  save : function(){
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.src,
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  navigateToMiniProgram : function(e){


    wx.navigateToMiniProgram({
      appId: 'wxd6c6ca0d390383db',
      path: 'pages/activityH5/activityH5?kActUrl=https://pro.m.jd.com/mini/active/3Wepi2h4YvqWoBVq2KkZqRHJ5ZEj/index.html?wxAppName=Kepler.html'
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

  }
})