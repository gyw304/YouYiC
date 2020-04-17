// pages/signed_total/signed_total.js

const app = getApp()
const request = require('../../request')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    id: util.randomNum(0,3),
    qiandao_day: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    this.setData({
      qiandao_day: app.globalData.qiandaoday
    })

  },

  go_punch : function(){
    wx.switchTab({
      url: '../signed/signed',
    })
  }
})