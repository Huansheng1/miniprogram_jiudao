import requestModel from '../../api/url'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.onGetUserInfo()
    requestModel.getLikeBooksNums()
      .then(v => {
        console.log(v)
        this.setData({
          bookCount: v.count
        })
      })
      .catch(e=>console.log(e))
    requestModel.getLikeBooks()
    .then(v => {
      console.log(v)
      this.setData({
        classics: v
      })
    })
    .catch(e=>console.log(e))
  },
  onGetUserInfo(event) {
    console.log(event)
    this.getUserInfo(event)
  },
  getUserInfo(config) {
    // 先试图获取用户信息，如不成功，则使用新API获取用户授权
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          authorized: true
        })
      },
      fail: (err) => {
        console.log('用户未授权：')
        console.log(err)
        // 如果授权成功
        if (config && config.detail && config.detail.errMsg === "getUserInfo:ok") {
          this.setData({
            userInfo: config.detail.userInfo,
            authorized: true
          })
        } else {
          this.setData({
            authorized: false
          })
          return
        }
      }
    })
  },
  onClickAbout: function () {
    wx.navigateTo({
      url: '../about/index',
    })
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

  }
})