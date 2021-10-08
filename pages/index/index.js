// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    getuserbar: true,
    getuserbar2:false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    getuserinfo: true,
    openid: '',
    canUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  toList(e) {
    var storage_info = wx.getStorageSync('storage_info')
    if (storage_info == '') {
      this.setData({
        getuserbar: true
      })
      wx.showToast({
        title: '试用版不可用，请登录后尝试。',
        icon: 'none',
        duration: 1500
      })
    } else if (storage_info == 1) {
      this.setData({
        getuserbar: true
      })
      wx.redirectTo({
        url: '../../pages/list/list',
      })
    }
  },
  toInstructions(e) {
    wx.redirectTo({
      url: '../../pages/instructions/instructions',
    })
  },
  toMatters(e) {
    wx.redirectTo({
      url: '../../pages/matters/matters',
    })
  },
  
  toAdd() {
    var storage_info = wx.getStorageSync('storage_info')
    if (storage_info == '') {
      this.setData({
        getuserbar: true
      })
      wx.showToast({
        title: '试用版不可用，请登录后尝试。',
        icon: 'none',
        duration: 1500
      })
    } else if (storage_info == 1) {
      this.setData({
        getuserbar: true
      })
      wx.switchTab({
        url: '../../pages/add/add',
      })
    }


  },
  onLoad(options) {
    var storage_info = wx.getStorageSync('storage_info')
    if (storage_info == '') {
      this.setData({
        getuserbar2: false
      })
    } else if (storage_info == 1) {
      this.setData({
        getuserbar2: true
      })
    }
  },
  getUserProfile(e) {
    var that = this
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        //console.log(res)
        wx.setStorageSync('storage_info', 1)
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          getuserbar2: true
        })
        wx.setStorageSync('Userinfo', res.userInfo)
        wx.showToast({
          title: '获取信息成功',
          icon: 'none',
          duration: 1500
        })
      },
      fail: function (err) {
        that.setData({
          getuserbar: true
        })
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1500
        })
      },
    })

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