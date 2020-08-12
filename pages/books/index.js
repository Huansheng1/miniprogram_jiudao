import requestModel from '../../api/url'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    booksData: [],
    showSearchDetail: false,
    loadingMore: '',
    clearSearchData: {}
  },
  onClickedSearch(event) {
    this.setData({
      showSearchDetail: true
    })
  },
  onSearchCancel() {
    this.setData({
      showSearchDetail: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '书单',
    })
    requestModel.getBooks()
      .then(v => {
        console.log(v)
        this.setData({
          booksData: v
        })
      })
  },
  onClickBookItem(event) {
    console.log(event.detail)
    wx.navigateTo({
      url: '../bookDetail/index?id=' + event.detail.id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      clearSearchData: new Boolean('清空数据啊')
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loadingMore: new Date().getTime()
    })
  }
})