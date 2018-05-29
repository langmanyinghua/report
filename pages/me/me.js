// pages/me/me.js
var common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesrc: null,
    urls: null,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    common.sayHello(12)
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

  openNewPages: function () {
    wx.navigateTo({
      url: '/pages/logs/logs?id=10&name=plx',
    })
  },

  redirect: function () {
    wx.redirectTo({
      url: '/pages/logs/logs?id=10&name=plx',
    })
  },

  previewImage: function () {
    var that = this;
    wx.previewImage({
      urls: that.urls,
    })

    wx.getImageInfo({
      src: that.urls[0],
      success(res) {
        console.log("image info : " + res)
      }
    })
  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        that.urls = res.tempFilePaths

        that.setData({
          imagesrc: that.urls[0]
        })
        common.upload(that.urls[0])
      },
    })
  },

  change: function (e) {
    var temp = this.data.isShow
    this.setData({
      isShow: !temp
    })
    // if (e.detail.value){
    //   console.log(" 状态 true  ", e.detail.value)
    //   this.setData({
    //     isShow: false
    //   })
    // }else{
    //   console.log(" 状态 false ", e.detail.value)
    //   this.setData({
    //     isShow: true
    //   })
    // }
  },

  saveData: function () {
    console.log("saveData")
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(" phone : ", res)
      },
      fail: function(res){
        console.log(" phone fail : ", res)
        wx.setStorage({
          key: 'phone',
          data: '17051030680',
        })
      }
    })
  }


})