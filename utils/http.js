const IP = "https://www.amazingfuture.cn"
const app = getApp()


//*******************  登录，注册 start ******************* //


/**
 * 登陆
 * username 用户名(手机号)
 * password 密码
 */
function login(username, password) {
  console.log(" 用户名 : ", username)
}


//*******************  登录，注册 end ******************* //

function getReport() {
  var token = getApp().globalData.token
  console.log("token : ", token)
}



//*******************  工具类 start ******************* //

/**
 * 文件上传
 * 
 * filePath 临时文件地址
 */
function upload(filePath) {
  wx.uploadFile({
    url: IP + "/manager/assist/upload",
    filePath: filePath,
    name: 'file',
    header: {
      token: getApp().globalData.token
    },
    success(res) {
      console.log("上传结果 : ", res)
    }
  })
}

//*******************  工具类 end ******************* //



/**
 * 暴露接口
 */
module.exports = {
  login: login,
  getReport: getReport
}