/**
 * 判断请求状态是否成功
 * 参数：http状态码
 * 返回值：[Boolen]
 */
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}
const http = function ({
  url,
  method = "get",
  data,
  header,
  ...restConfig
}) {
  // wx.showLoading({
  //   title: '请求接口中',
  // })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'contentType': 'application/json',
        ...header
      },
      success(v) {
        if (isHttpSuccess(v.statusCode)) {
          resolve(v.data)
        } else {
          wx.showToast({
            title: `请求出现问题，异常信息：${v.errMsg}，状态码：${v.statusCode}`,
            icon: "none",
            duration: 2500
          })
          reject(v)
        }
      },
      fail: reject,
      ...restConfig
      // complete() {
      //   // wx.hideLoading()
      //   // wx.showToast({
      //   //   title: '请求完毕',
      //   // })
      // }
    })
  })
}
export default http