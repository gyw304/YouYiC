// pages/home/home.js
const util = require('../../utils/util')
const request = require('../../request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rule_pop: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setStorageSync('home_page', true)

  },

  rule: function () {
    this.setData({
      rule_pop: false
    })
  },


  close_pop: function () {
    this.setData({
      rule_pop: true
    })
  },

  go_signed : function(){
    wx.switchTab({
      url: '../signed/signed'
    })
  }
})