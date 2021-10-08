// app.js
var util = require('./utils/util.js');

App({
  d: {
    ceshiUrl: util.getUri(),
  },
  onLaunch() {
    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: util.getUri() +'/api/user/code2',
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('openid', res.data.data.openid)
            },
            fail: function (res) {}
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.onUserInfoReady) this.onUserInfoReady(res.userInfo)
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    tel: '',
    mobile: "",
    nickname: '',
    avatar: "",
    openid: ""
  }
})