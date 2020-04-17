// pages/signed/signed.js

var dataArr = []
const request = require('../../request')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    now_year: new Date().getFullYear(),
    now_month: new Date().getMonth() + 1,
    now_day: new Date().getDate(),

    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),

    calendar_day: [],
    
    calendar : [],
    
    rule_pop: true,
    
    qiandao_pop: true,
    
    qiandao_day: 0,
    
    share_pop: true,

    buqiandate : null,

    share_date : 0,

    change : false,

    isShow: false,

    canyaoyao : false,

    issign : false,

    crm_pop : true,

    poil_pop : true,

    err_pop : true,

    err2_pop: true,

    prize_info : null,

    rund_banner: new Date().getMonth() + 1,

    poil_list : [],

    take_pop : true,

    qd_day_pic : false,

    dj_pic : true,

    xj_pic : false,

    singed_state : false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    this.getdate(this.data.year, this.data.month, this.data.day)
  },

  getdate: function (year, month,day) {
    var that = this;
    wx.showLoading({
      title: '日历加载中'
    })

    that.setData({
      change: false
    })


    request.postRequest(request.api.getDate, {
      year: year,
      month: month,
      day: day
    }, function (res) {

      console.log(res.data)

      if (res.data.code == 1) {
        that.setData({
          calendar_day: res.data.data.date,
          qiandao_day: res.data.data.total 
        })

        if(res.data.data.today_sign == 1){
          that.setData({
            issign: true
          })
        }

        that.setData({
          change: true
        })



        wx.hideLoading()
      }
    })
  },

  formSubmit : function(e){

    var that = this;

    if (e.detail.value.name == '' || e.detail.value.tel == '' || e.detail.value.address == ''){
      util.alert('请填写完整信息')
      return
    }

    request.postRequest(request.api.take,{
      username: e.detail.value.name,
      tel: e.detail.value.tel,
      address: e.detail.value.address
    },function(res){
      if(res.data.code == 1){

        that.setData({
          take_pop: false,
          crm_pop : true
        })

      }
      else{
        util.alert(res.data.msg)
      }
    })

    console.log(e.detail.value)
  },

  daka: function () {
    var that = this;

    var isbox = 0;

    if (this.data.qiandao_day >= 13){
      isbox = 1
    }

    that.data.calendar_day.forEach(function (item, index) {

      if (item.year == that.data.year
        && item.month == that.data.month
        && item.day == that.data.day
        && item.status == 4
        && that.data.qiandao_day < 13
      ){
        that.setData({
          err_pop: false
        })
      }
      
    })


    if (this.data.err_pop == false) return

    request.postRequest(request.api.sign, {
      type: 1,
      year: that.data.now_year,
      month: that.data.now_month,
      day: that.data.now_day,
      isbox: isbox
    }, function (res) {

      var _data = res.data

      console.log(_data)

      if (_data.code == 1) {

        that.data.calendar_day.forEach(function (item, index) {


          if (that.data.qiandao_day <= 0) {

            if (item.year == that.data.year
              && item.month == that.data.month
              && item.day == that.data.day) {
              if ((42 - index) > 13) {

                that.data.calendar_day.forEach(function (item, index) {
                  if (item.year == that.data.year
                    && item.month == that.data.month
                    && item.day == that.data.day
                  ) {

                    var status = 4;
                    if (that.data.calendar_day[index + 13].status == 99) {
                      status = 103
                    }
                    else {
                      status = 4;
                    }


                    that.setData({
                      ['calendar_day[' + (index + 13) + '].status']: status
                    })

                  }
                })


              }

            }


          }



          if (item.year == that.data.year
            && item.month == that.data.month
            && item.day == that.data.day
          ) {

            var total = that.data.qiandao_day;

            total++;

            var status;

            if (that.data.calendar_day[index].status == 4) {
              status = 5
            }
            else {
              status = 3
            }

            that.setData({
              ['calendar_day[' + index + '].status']: status,
              qiandao_day: total,
              prize_info: _data.data,
              qiandao_pop: false
            })

            if (total >= 14) {
              that.dajiang()
            }

          }
        })

        that.setData({
          issign: true
        })


      }
      else {
        util.alert(_data.msg)
      }
    })



    
  },

  dajiang : function(){

    var that = this;


    setTimeout(function(){
      that.setData({
        qd_day_pic : true,
        dj_pic : false
      })
    },3000)

  },

  prev_month: function () {


    if (this.data.month <= new Date().getMonth() + 1 - 1 || !this.data.change) {
      util.alert('最多展示前1个月')
      return
    }

    if (this.data.month <= 1){
      util.alert('只能展示当年月份')
      return
    }

    

    this.data.month--

    this.setData({
      rund_banner: this.data.month
    })

    if(this.data.month<1){
      this.data.month = 12
      this.data.year-=1
    }

    this.setData({
      year: this.data.year,
      month: this.data.month
    })

    this.getdate(this.data.year, this.data.month,-1)

  },

  next_month: function () {


    if (this.data.month >= new Date().getMonth() + 1 + 1 || !this.data.change) {
      util.alert('最多展示后1个月')
      return
    }

    

    this.data.month++

    this.setData({
      rund_banner: this.data.month
    })


    if (this.data.month >12) {
      this.data.month = 1
      this.data.year += 1
    }

    this.setData({
      year: this.data.year,
      month: this.data.month
    })

    this.getdate(this.data.year, this.data.month,-1)

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

  close_pop_take : function(){
    this.setData({
      take_pop: true
    })
  },

  close_pop_crm : function(){
    this.setData({
      crm_pop: true
    })
  },

  close_pop_err : function(){
    this.setData({
      err_pop: true
    })
  },

  close_pop_share : function(){
    this.setData({
      share_pop : true
    })
  },

  close_pop_qiandao: function () {
    this.setData({
      qiandao_pop: true
    })
  },

  close_pop_poil : function(){
    this.setData({
      poil_pop: true
    })
  },

  close_pop_err2 : function(){
    this.setData({
      err2_pop: true
    })
  },

  mypoils : function(){

    var that = this;

    request.postRequest(request.api.myprize, {}, function (res) {

      if (res.data.code == 1) {

        that.setData({
          poil_list: res.data.data,
          poil_pop: false
        })
        //wx.hideLoading()
      }
    })


    
  },

  lingqu : function(){
    this.setData({
      poil_pop: true,
      crm_pop: false
    })
  },

  day_click: function (e) {

    if (e.currentTarget.dataset.state == 2) {

      this.setData({
        buqiandate : {
          year: e.currentTarget.dataset.year,
          month: e.currentTarget.dataset.month,
          day: e.currentTarget.dataset.day
        }
      })

      this.setData({
        share_pop: false
      })
    }


    if (e.currentTarget.dataset.state == 4){


      if (this.data.qiandao_day == 13){
        this.daka()
      }
      else{
        this.setData({
          err2_pop: false
        })
      }

      
    }

    if (e.currentTarget.dataset.state == 103){
      util.alert('请翻到下个月！')
    }

    if (e.currentTarget.dataset.state == 5) {

      util.alert('您已经领过大奖啦')

    }




    if (e.currentTarget.dataset.state == 1) {
      this.daka()
    }


  
    
   


  },

  onShow : function(){

    var that = this;

    var isbox = 0;

    if (this.data.qiandao_day >= 13) {
      isbox = 1
    }

    var timest = Math.round(new Date().getTime() / 1000).toString();

    if (timest - this.data.share_date >=3){

      if(this.data.share_date > 0){
        this.setData({
          share_pop: true
        })
        
        request.postRequest(request.api.sign, {
          year: that.data.buqiandate.year,
          month: that.data.buqiandate.month,
          day: that.data.buqiandate.day,
          type :2,
          isbox: isbox
        }, function (res) {

          console.log(res.data.data)

          if (res.data.code == 1) {
            util.alert('补签成功')

            that.data.calendar_day.forEach(function (item, index) {
              if (item.year == that.data.buqiandate.year && item.month == that.data.buqiandate.month && item.day == that.data.buqiandate.day) {

                var total = that.data.qiandao_day;
                total++

                that.setData({
                  ['calendar_day[' + index + '].status'] : 3,
                  prize_info: res.data.data,
                  qiandao_day: total,
                  qiandao_pop: false,
                })


                if (total >=14){
                  that.dajiang()
                }

              }
            })

            //wx.hideLoading()
          }
        })

      }


    }
    else{
      util.alert('分享完成才能补签')
      this.setData({
        share_pop: true
      })
    }


    //this.isShow = true;


    // wx.onAccelerometerChange(function (e) {

    //   if (that.isShow && that.data.canyaoyao) {
    //     console.log(e.x)
    //     console.log(e.y)
    //     console.log(e.z)
    //     if (e.x > 0.5 && e.y > 0.5) {
    //       wx.showToast({
    //         title: '摇一摇成功',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //     }
    //   }
      
    // })




  },

  onHide: function () {
    this.isShow = false;
  },

  navigateToMiniProgram : function(e){


    wx.navigateToMiniProgram({
      appId: 'wxd6c6ca0d390383db',
      path: 'pages/activityH5/activityH5?kActUrl=https://pro.m.jd.com/mini/active/3Wepi2h4YvqWoBVq2KkZqRHJ5ZEj/index.html?wxAppName=Kepler.html'
    })
    
  },

  onShareAppMessage(res) {

    if (res.from == 'button'){
      this.setData({
        share_date: Math.round(new Date().getTime() / 1000).toString()
      })
    }

    return {
      title: '快来和我一起肠道自测打卡吧',
      path: 'pages/index/index',
      imageUrl: 'https://zhiyan.zxhong.com/wxapp/yyc/resource/static/share.jpg?33321'
    }
  }
})