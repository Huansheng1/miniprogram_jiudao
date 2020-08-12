import requestModel from '../../api/url'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetailData: [],
    bookTags: [],
    fav_nums: 0,
    like_status: 0,
    id: 0,
    postStatus: false,
    imageError: 'images/img-undefined.png'
  },
  showPostView(event) {
    this.setData({
      postStatus: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    requestModel.getBookDetail(options.id)
      .then(v => {
        console.log(v)
        this.setData({
          bookDetailData: v
        })
        wx.setNavigationBarTitle({
          title: v.title,
        })
      })
      .catch(e => console.log(e))
    requestModel.getBookTag(options.id)
      .then(v => {
        console.log(v)
        this.setData({
          bookTags: v.comments
        })
      })
      .catch(e => console.log(e))
    requestModel.getBookLikeInfo(options.id)
      .then(v => {
        console.log(v)
        this.setData({
          fav_nums: v.fav_nums,
          like_status: v.like_status
        })
      })
      .catch(e => console.log(e))
  },
  handleOnLike: function (event) {
    const like_status = Number(event.detail)
    requestModel.changeLikeStatus({
        status: like_status,
        art_id: this.data.id,
        type: 400
      })
      .then(v => {
        console.log(v)
        this.setData({
          like_status,
          fav_nums: like_status ? this.data.fav_nums + 1 : this.data.fav_nums - 1
        })
      })
      .catch(e => {
        console.log(e)
      })
  },
  onConfirm(event) {
    this.postComment({
      content: this.data.saveInputTxt
    })
  },
  onCancle() {
    this.setData({
      postStatus: false
    })
  },
  saveInputTxt(event) {
    this.data.saveInputTxt = event.detail.value
  },
  addComment(event) {
    this.postComment({
      index: event.currentTarget.dataset.index
    })
  },
  onConfirmFinish: function (event) {
    this.postComment({
      content: event.detail.value
    })
  },
  // 图片加载出错时使用默认的占位图片
  onLoadImgErr() {
    this.setData({
      ['bookDetailData.image']: this.data.imageError
    })
  },
  postComment: function (config) {
    console.log(config)
    let newComment = ''
    if (config.hasOwnProperty('index')) {
      newComment = this.data.bookTags[config.index].content
    } else {
      newComment = config.content
    }
    requestModel.addBookComment({
        id: this.data.id,
        content: newComment
      })
      .then(v => {
        console.log(v)
        // 强烈注意，该数据方法直接修改数组，返回的是当前数组长度!
        this.data.bookTags.unshift({
          content: newComment,
          nums: 1
        })
        this.setData({
          // 插入到数组头部后的数据进行更新
          bookTags: this.data.bookTags
        })
        wx.showToast({
          title: '短评+1',
          icon: 'none'
        })
        this.onCancle()
      })
      .catch(e => {
        console.log(e)
      })
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