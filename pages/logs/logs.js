//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })

    console.log("id:" + options.id)
    console.log("name:" + options.name)
  },

  back: function () {
    wx.navigateBack({

    })
  }
})
