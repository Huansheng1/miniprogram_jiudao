import requestModel from '../../api/url'
import classicModel from 'classicModel.js'
Page({
  data: {
    classicData: {},
    totalIndex: 8
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '流行',
    })
    requestModel.getClassicLatest()
      .then(v => {
        classicModel.setStorageItem('totalIndex',v.index)
        classicModel.setClassicInfo(v)
        this.setData({
          classicData: v,
          totalIndex:v.index
        })
      })
  },
  handleOnLike(event) {
    const like_status = Number(event.detail)
    requestModel.changeLikeStatus({
        status: like_status,
        art_id: this.data.classicData.id,
        type: this.data.classicData.type
      })
      .then(v => {
        this.setData({
          classicData: {
            ...this.data.classicData,
            like_status,
            fav_nums: like_status?this.data.classicData.fav_nums + 1:this.data.classicData.fav_nums - 1
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  },
  async controlClicked(event) {
    let resultData = await classicModel.getClassicInfo(event.detail)
    // console.log(event.detail)
    const config = {
      ...resultData,
      ...event.detail,
      id:resultData.id,
      typeId: resultData.type
    }
    resultData = await classicModel.getLikeStatus(config)
    this.setData({
      classicData:resultData
    })
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

  }
})