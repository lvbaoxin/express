// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    time: '',
    recipient_name: '',
    list: [],
    page: 1,
    openid: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var day = (Y + '-' + M + '-' + D)
    that.setData({
      openid: openid,
      start: '2015-09-01', //开始时间
      end: day, //结束时间
      daystart: new Date(day.replace(/-/g, "/")).getTime(), //开始时间戳
      dayend: new Date(day.replace(/-/g, "/")).getTime() //结束时间戳
    })
    wx.request({
      url: app.d.ceshiUrl + '/api/order/order_list',
      method: 'GET',
      data: {
        page: 1, //	是	string	当前页
        limit: 5, //	是	string	每页条数
        start_time: "", //	否	string	开始日
        end_time: "", //	否	string	截止日
        recipient_name: "", //	否	string	收货人名
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data.data
        })
      },
      fail: function (res) {}
    })

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
      duration: 2000
    })
    // 页数+1
    that.setData({
      page: that.data.page + 1 //每次下拉，页数+1
    })
    //请求列表数据接口
    wx.request({
      url: app.d.ceshiUrl + '/api/order/order_list',
      data: {
        page: that.data.page, //页数
        limit: 5, //每页显示10条数据
        start_time: "", //	否	string	开始日
        end_time: "", //	否	string	截止日
        recipient_name: "", //	否	string	收货人名
        openid: that.data.openid
      },
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        var oldData = that.data.list; //默认一开始加载接口返回的的数据
        that.setData({
          list: oldData.concat(res.data.data) //重新添加到列表里面的数据-追加
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

  formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    that.setData({
      recipient_name: e.detail.value.searchinput
    })
    //console.log(e)
    wx.request({
      url: app.d.ceshiUrl + '/api/order/order_list',
      method: 'GET',
      data: {
        page: 1, //	是	string	当前页
        limit: 5, //	是	string	每页条数
        start_time: '' || that.data.startTime, //	否	string	开始日
        end_time: "" || that.data.endTime, //	否	string	截止日
        recipient_name: that.data.recipient_name, //	否	string	收货人名
        openid: that.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data.data,
          page: 1,
        })
      },
      fail: function (res) {}
    })
  },
  goDetails(e) {
    //  console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.id
    })
  },

  bindDateChange(e) {
    let that = this;
    let daystart = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    if (daystart <= that.data.dayend) {
      that.setData({
        startTime: e.detail.value,
        daystart: daystart
      })
    } else {
      wx.showToast({
        title: '请选择正确的时间区间',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  bindDateChange2(e) {
    let that = this;
    let dayend = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    if (that.data.daystart <= dayend) {
      that.setData({
        endTime: e.detail.value,
        dayend: dayend
      })

    } else {
      wx.showToast({
        title: '请选择正确的时间区间',
        icon: 'none',
        duration: 1000,
        mask: true
      })

    }

  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '英创代理'
        })
      }, 2000)
    })
    return {
      title: '英创代理',
      path: '/page/index/index',
      promise 
    }
  }


})