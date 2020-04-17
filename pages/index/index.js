//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')
const request = require('../../request')


Page({
  data: {

    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()

  },
  onLoad: function () {

    var that = this;

    wx.showLoading({
      title: '加载中'
    })

    if (!wx.getStorageSync('usercode')) {
      getApp().getPass().then((resArg) => {
        console.log('通过登录去首页')
        
        if (resArg.status == 200){
          that.homepage()
        }

      })
    } else {
      console.log('直接去首页')
      that.homepage()
    }
    
  },
  homepage : function(){

    var that = this;

  

    if (wx.getStorageSync('home_page')){

      request.postRequest(request.api.getDate, {
        year: that.data.year,
        month: that.data.month,
        day: that.data.day
      }, function (res) {

        if (res.data.code == 1) {

          app.globalData.qiandaoday = res.data.data.total;


          if (app.globalData.qiandaoday <= 0) {
            wx.switchTab({
              url: '../signed/signed',
            })
          }
          else {

            if(res.data.data.today_sign > 0){
              wx.switchTab({
                url: '../signed/signed',
              })
            }
            else{
              wx.redirectTo({
                url: '../signed_total/signed_total'
              })
            }

           
          }

        }
      })

    }
    else{
      wx.redirectTo({
        url: '../home/home'
      })
     
    }


    

    wx.hideLoading()
  }
})
