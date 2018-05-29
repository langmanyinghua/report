//index.js
const http = require("../../utils/http.js")

//获取应用实例
const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: "爱报备",
    ScreenBrightness: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (res) {
    var that = this
    console.log("index onLoad")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getSystemInfo({
      success: function (res) {
        console.log(" systeminfo ", res)
      },
    })
    wx.getNetworkType({
      success: function (res) {
        console.log(" newwordtype ", res)
      },
    })
    wx.onNetworkStatusChange(function (res) {
      console.log("onNetworkStatusChange : ", res)
    })

    wx.getScreenBrightness({
      success(res) {
        that.setData({
          ScreenBrightness: res.value
        })
        console.log("getScreenBrightness : ", res)
      }
    })
    wx.getSetting({
      success(res) {
        console.log(" getSetting ", res)
      }
    })

    // 获取token
    http.getReport()

  },
  onShow: function () {
    console.log("index onShow")
    this.update()
  },
  onHide: function () {
    console.log("index onHide")
  },
  onReachBottom: function (e) {
    console.log("onReachBottom")
  },
  onShareAppMessage: function () {
    return {
      title: "爱报备",
      path: "pages/index/index"
    }
  },

  // 自定义方法
  changeMotto: function (event) {
    this.setData({
      motto: "你好世界"
    })
  },
  showToast: function (event) {
    console.log(" showToast :" + event.target.id)
    console.log(" showToast :" + event.target.dataset.name)
    // wx.showToast({
    //   title: '你好世界',
    //   icon: "none",
    //   mask: false
    // })
    // wx.showLoading({
    //   title: '加载中...',
    // })

    // wx.showModal({
    //   title: '删除订单',
    //   content: '确定要删除订单吗',
    // })

    wx.showActionSheet({
      itemList: ['男', '女', '未知'],
    })


  },
  getAddress: function (event) {
    wx.chooseAddress({
      success(res) {
        console.log("chooseAddress:", res)
      },
      fail(res) {
        console.log(" address file", res)
        wx.openSetting({
          success(res) {
            console.log(" openSetting ", res)
          }
        })
      }
    })

    // if (wx.openSetting) {
    //   wx.openSetting({
    //     success(res) {
    //       wx.chooseAddress({
    //         success: function (res) {
    //           console.log(" success :" + res)
    //         },
    //         fail: function (res) {
    //           console.log(" fail :" + res)
    //         },
    //         complete: function (res) {
    //           console.log(" complete :" + res)
    //         }
    //       })
    //     }
    //   })
    // } else {
    //   wx.showModal({
    //     title: '授权提示',
    //     content: '需要授权才能使用哦',
    //   })
    // }

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.address']) {

    //     } else {
    //       wx.showModal({
    //         title: '授权提示',
    //         content: '需要授权才能使用哦',
    //       })
    //     }
    //     console.log("getSetting  " + res)
    //   }
    // })


  },
  openSetting: function (e) {
    console.log("openSetting")
    // wx.openSetting({
    //   success: function (res) {
    //     console.log("openSetting:" + res.authSetting)
    //   }
    // })

    wx.chooseAddress({
      success(res) {
        console.log("chooseAddress :" + res)
      }
    })
  },
  login: function (e) {
    console.log("login")
    wx.login({
      success(res) {
        console.log(res.code)
      }
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  getUserInfo: function (e) {
    console.log("getUserInfo")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  update: function (e) {
    wx.request({
      url: 'https://www.amazingfuture.cn/manager/assist/update',
      method: "POST",
      success(res) {
        console.log("update" + res.data.msg)
      }
    })
  },
  callphone: function () {
    wx.makePhoneCall({
      phoneNumber: '17051030680',
      success(res) {
        console.log(" phone ", res)
      }
    })
  },
  scan: function () {
    wx.scanCode({
      success(res) {
        console.log("二维码 : ", res)

      }
    })
  },
  ScreenBrightnessChange: function (e) {
    console.log(" change ", e.detail.value)
    wx.setScreenBrightness({
      value: e.detail.value,
    })
  }
})
