// pages/add/add.js
const app = getApp()
/**
 * Detail类 构造函数 
 * @param {string} goods_bar_code 商品条码
 * @param {string} brand_name_specification 商品规格
 * @param {string} quantity 数量
 */
function Detail(goods_bar_code, brand_name_specification, quantity) {
  this.goods_bar_code = goods_bar_code;
  this.brand_name_specification = brand_name_specification;
  this.quantity = quantity;
}

function Info() {
  this.details = [];
}
var num = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BottomIcon: "BottomIcon",
    bottomGoodIcon: "bottomGoodIcon",
    userViewHidden: false,
    goodsViewHidden: false,
    code: 123,
    avatarUrl: '',
    nickName: '',
    info: {},
    orderNum2: '',
    focus: true,
    bottom_value: '',
    codeDisabled: true,
    cardImg: '../../images/13.png',
    cardImg2: '../../images/13.png',
    cardOk1: '',
    cardOk1Hidden: true,
    cardOk1View: false,
    dataTime: '',
    openid: '', //是	string	小程序openid
    nickname: '', //	是	string	小程序用户昵称
    headimg: '', //是	string	小程序用户头像
    agent_code: '', //	是	string	代理人CODE
    state: '1', //否	string	状态
    japan_to_dalian_code: '', //否	string	日本到大连单号
    japan_code: '', //	是	string	日本单号
    number_of_cases: '', //是	string	箱数
    recipient_name: '', //	是	string	收件人名
    recipient_mobile: '', //	是	string	收件人电话
    recipient_address: '', //	是	string	收件人地址
    recipient_card_id: '', //是	string	收件人身份证
    cardOk1: '', //	是	base64	正面照片
    cardOk2: '', //是	base64	反面照片
    cardOk1base: '',
    cardOk2Base: '',
    goods: [],
    formSubmit: '',
    display: true,
    touchStartTime: 0, // 触摸开始时间
    touchEndTime: 0, // 触摸结束时间
    lastTapTime: 0, // 最后一次单击事件点击发生时间
    disabled:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    num = 0
    //  this.init();
    var Userinfo = wx.getStorageSync('Userinfo')
    var openid = wx.getStorageSync('openid')
    //  console.log(openid)
    //  console.log(Userinfo)
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份 
    var Y = date.getFullYear();
    //获取月份 
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var dataTime = +Y + '-' + M + '-' + D
    if (Userinfo == '') {

      this.setData({
        dataTime: dataTime,
        avatarUrl: '../../images/13.png',
        formSubmit: 'formSubmit'
      })
      // wx.showModal({
      //   title: '提示',
      //   content: '获取信息失败,请返回获取个人信息',
      //   showCancel:false,
      //   success (res) {
      //     if (res.confirm) {
      //       wx.switchTab({
      //         url: '../../pages/index/index',
      //       })
      //     } 
      //   }
      // })
    } else {
      this.setData({
        avatarUrl: Userinfo.avatarUrl,
        nickName: Userinfo.nickName,
        dataTime: dataTime,
        openid: openid,
        formSubmit: "formSubmit"
      })
    }
  },
  /**
   *  编辑代理人代码
   */
  // codeEdit: function () {
  //   var that = this
  //   wx.showModal({
  //     title: '请输入代理人代码',
  //     content: '',
  //     editable: true,
  //     success(res) {
  //       if (res.confirm) {
  //         // console.log(res)
  //         that.setData({
  //           agent_code: res.content
  //         })
  //         wx.showToast({
  //           title: '修改成功',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //       } else if (res.cancel) {
  //         wx.showToast({
  //           title: '您已取消修改',
  //           icon: 'none',
  //           duration: 2000
  //         })
  //       }
  //     }
  //   })
  // },
  /**身份证正面**/
  getCardImg(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showToast({
          title: '上传中',
          icon: 'none',
          duration: 2000
        })
        let cardOk1base = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
        that.setData({
          cardOk1: res.tempFilePaths[0],
          cardOk1Hidden: false,
          cardOk1View: true,
          cardOk1base: cardOk1base
        })

      },
      fail(res) {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getCardImg2(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let cardOk2base = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
        wx.showToast({
          title: '上传中',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          cardOk2: res.tempFilePaths[0],
          cardOk2Hidden: false,
          cardOk2View: true,
          cardOk2base: cardOk2base
        })
      },
      fail(res) {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  touchStart(e) {
    this.touchStartTime = e.timeStamp;
  },
  touchEnd(e) {
    this.touchEndTime = e.timeStamp;
  },
  formSubmit(e) {
    var that = this;
    var Userinfo = wx.getStorageSync('Userinfo')
    if (Userinfo == '') {
      wx.showModal({
        title: '提示',
        content: '试用版不可用，请登录后尝试。',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../pages/index/index',
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.d.ceshiUrl + '/api/order/order_add',
        method: 'POST',
        data: {
          openid: that.data.openid, //	是	string	小程序openid
          nickname: that.data.nickName, //	是	string	小程序用户昵称
          headimg: that.data.avatarUrl, //:''//	是	string	小程序用户头像
          agent_code: e.detail.value.agent_code, //	是	string	代理人CODE
          state: that.data.state, //否	string	状态
          japan_to_dalian_code: '', //	否	string	日本到大连单号
          japan_code: e.detail.value.japan_code, //	是	string	日本单号
          number_of_cases: e.detail.value.number_of_cases, //是	string	箱数
          recipient_name: e.detail.value.recipient_name, //	是	string	收件人名
          recipient_mobile: e.detail.value.recipient_mobile, //	是	string	收件人电话
          recipient_address: e.detail.value.recipient_address, //是	string	收件人地址
          recipient_card_id: e.detail.value.recipient_card_id, //是	string	收件人身份证
          recipient_card_front: that.data.cardOk1base, //	是	base64	正面照片
          recipient_card_back: that.data.cardOk2base, //是	base64	反面照片
          goods: JSON.stringify(that.data.goods), //	否	string	[{"goods_bar_code":"","brand_name_specification":"","quantity":""}] json字符串
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code != 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            if (that.touchEndTime - that.touchStartTime < 350) {
              // 当前点击的时间
              var currentTime = e.timeStamp;
              var lastTapTime = that.lastTapTime;
              // 更新最后一次点击时间
              that.lastTapTime = currentTime;
              // 如果两次点击时间在300毫秒内，则认为是双击事件
              if (currentTime - lastTapTime > 100) {
              } else {
                that.setData({
                  disabled:true
                })
                wx.showModal({
                  title: res.data.msg,
                  content: '',
                  editable: false,
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../index/index'
                      })
                    }
                  }
                })
              }
            }
          }
        },
        fail: function (res) {}
      })
    }
  },

  orderHidden: function (e) {
    var that = this;
    that.setData({
      userViewHidden: that.data.userViewHidden ? false : true,
      BottomIcon: that.data.BottomIcon ? '' : 'BottomIcon'
    })
  },
  goodsHidden: function (e) {
    var that = this;
    that.setData({
      goodsViewHidden: that.data.goodsViewHidden ? false : true,
      bottomGoodIcon: that.data.bottomGoodIcon ? '' : 'bottomGoodIcon'
    })
  },
  addItem: function (e) {
    let info = this.data.info;
    info.details.push(new Detail());
    this.setData({
      info: info
    });
    //console.log(info)
  },
  addItem2: function (e) {
    console.log(e)
    let goods = this.data.goods;
    var data = {};
    data.goods_bar_code = "";
    data.brand_name_specification = "";
    data.quantity = "";
    goods.push(data);
    this.setData({
      goods: goods
    });
    console.log(this.data.goods)
  },
  setPlace: function (e) {
    let index = parseInt(e.currentTarget.id.replace("place-", ""));
    let place = e.detail.value;
    let goods = this.data.goods;
    goods[index].goods_bar_code = place;
    this.setData({
      goods: goods
    });
  },
  setName: function (e) {
    let index = parseInt(e.currentTarget.id.replace("name-", ""));
    let brand_name_specification = e.detail.value;
    let goods = this.data.goods;
    goods[index].brand_name_specification = brand_name_specification;
    this.setData({
      goods: goods
    });
  },
  setNumber: function (e) {
    let index = parseInt(e.currentTarget.id.replace("quantity-", ""));
    let quantity = e.detail.value;
    let goods = this.data.goods;
    goods[index].quantity = quantity;
    this.setData({
      goods: goods
    });
  },

  qrCodeBtn: function (e) {
    console.log(e)
    wx.scanCode({
      onlyFromCamera: false, //值为 false  既可以使用相机也可以使用相册，  值为true 只能使用相机
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'], //分别对应 一维码  二维码  DataMatrix码  PDF417条码  
      success: async (res) => { //扫码成功后
        console.log(res)
        wx.showToast({
          title: "扫码成功",
          duration: 3000,
          mask: true
        })
        let index = parseInt(e.currentTarget.id.replace("place-", ""));
        let goods = this.data.goods;
        goods[index].goods_bar_code = res.result;
        this.setData({
          goods: goods
        });
      },
      fail: (res) => { //扫码失败后
        wx.showToast({
          title: '扫码失败',
          icon: 'loading',
          duration: 1500
        })
      },
    })


  },
  inputFocus: function (e) {
    // console.log(e)
    var that = this;
    that.setData({
      bottom_value: e.detail.height
    })
  },
  inputBlue: function (e) {
    // console.log(e)
    var that = this;
    that.setData({
      bottom_value: 0
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