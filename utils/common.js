function sayHello(name) {
  console.log(" hello " + name)
}

function upload(filePath) {
  var url = "https://www.amazingfuture.cn/manager/assist/upload"
  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: 'file',
    header: {
      token: "6af962c7f9d3c4baf008efab308b565f"
    },
    success(res) {
      console.log("上传结果 : ", res)
    }
  })
}

module.exports = {
  sayHello: sayHello,
  upload: upload
}