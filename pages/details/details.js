// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BottomIcon: "BottomIcon",
    bottomGoodIcon: "bottomGoodIcon",
    userViewHidden: false,
    goodsViewHidden: false,
    avatarUrl: '',
    nickName: '',
    id: '',
    agent_code: '', //	是	string	代理人CODE
    create_time: "",
    goods: [],
    headimg: "",
    japan_code: "",
    japan_to_dalian_code: "",
    nickname: "",
    number_of_cases: '',
    openid: "",
    recipient_address: "",
    recipient_card_back: "",
    recipient_card_front: "",
    recipient_card_id: "",
    recipient_mobile: "",
    recipient_name: "",
    state: '',
    state_text: "",
    cardOk1base: '',
    cardOk2base: '',
    inputdisabled: false,
    editHidden: false,
    codeEdit: 'codeEdit',
    getCardImg: 'getCardImg',
    getCardImg2: 'getCardImg2',
    qrCodeBtn2: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Userinfo = wx.getStorageSync('Userinfo')
    //console.log(options)
    var that = this
    that.setData({
      avatarUrl: Userinfo.avatarUrl,
      nickName: Userinfo.nickName,
      id: options.id
    })
    console.log(that.data.id)
    wx.request({
      url: app.d.ceshiUrl + '/api/order/order_detail',
      data: {
        order_id: that.data.id
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.data.state != 1) {
          that.setData({
            inputdisabled: true,
            editHidden: true,
            qrCodeBtn2: true,
            codeEdit: '',
            getCardImg: '',
            getCardImg2: '',

          })
        } else {
          that.setData({
            inputdisabled: false,
            editHidden: false,
            qrCodeBtn2: false,
            codeEdit: 'codeEdit',
            getCardImg: 'getCardImg',
            getCardImg2: 'getCardImg2',
          })
        }
        that.setData({
          agent_code: res.data.data.agent_code,
          create_time: res.data.data.create_time,
          goods: res.data.data.goods,
          headimg: res.data.data.headimg,
          japan_code: res.data.data.japan_code,
          japan_to_dalian_code: res.data.data.japan_to_dalian_code || '单号暂未生成',
          nickname: res.data.data.nickname,
          number_of_cases: res.data.data.number_of_cases,
          openid: res.data.data.openid,
          recipient_address: res.data.data.recipient_address,
          recipient_card_back: res.data.data.recipient_card_back ,
          recipient_card_front: res.data.data.recipient_card_front,
          recipient_card_id: res.data.data.recipient_card_id,
          recipient_mobile: res.data.data.recipient_mobile,
          recipient_name: res.data.data.recipient_name,
          state: res.data.data.state,
          state_text: res.data.data.state_text,

        })
      },
      fail: function (err) {
        console.log(err)
      },

    });
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

  },
  orderHidden: function (e) {
    var that = this;
    that.setData({
      userViewHidden: that.data.userViewHidden ? false : true,
      BottomIcon: that.data.BottomIcon ? '' : 'BottomIcon'
    })
  },
  goodsHidden: function (e) {
    console.log(e)
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

  qrCodeBtn2: function (e) {
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
        console.log(res)
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
  formSubmit(e) {
    var that = this
    let recipient_card_front = this.data.cardOk1 //	是	base64	正面照片
    let recipient_card_back = this.data.cardOk2 //	是	base64	反面照片

    wx.request({
      url: app.d.ceshiUrl + '/api/order/order_edit',
      method: 'POST',
      data: {
        id: that.data.id,
        openid: that.data.openid, //	是	string	小程序openid
        nickname: that.data.nickName, //	是	string	小程序用户昵称
        headimg: that.data.avatarUrl, //:''//	是	string	小程序用户头像
        agent_code:e.detail.value.agent_code, //	是	string	代理人CODE
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
          // wx.showToast({
          //   title: "编辑包裹成功",
          //   icon: 'success',
          //   duration: 2000
          // })
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
      },
      fail: function (res) {}
    })
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
          recipient_card_front: res.tempFilePaths[0],
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
          recipient_card_back: res.tempFilePaths[0],
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