import requestModel from '../../api/url'
import searchModel from 'searchModel'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchMore: {
      type: String,
      observer(v) {
        // 通过时间戳来使得每次结果都不相同达到下拉就调用的目的
        console.log(v)
        this.searchMore({
          keyword: this.data.keywordValue,
          start: this.data.bookData.length
        })
      }
    },
    clearSearchData: {
      type: Object,
      observer() {
        console.log('清空数据啊')
        this.searchBook({
          start: 0,
          keyword: this.data.keywordValue
        })
        wx.stopPullDownRefresh({
          success: (res) => {
            console.log('停止加载更多成功！')
          },
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 热门标签数据
    popularTags: [],
    // 历史搜索数据
    searchData: [],
    // 搜索数据结果数据
    bookData: [],
    // 是否显示搜索结果状态值
    showSearchResult: false,
    // 输入框当前值
    keywordValue: '',
    // 为什么这里使用undefined而不是0？因为我们为了避免当搜索结果总数就是0 与 初始值的区别
    bookTotalNums: undefined,
    // 是否显示本搜索组件界面
    isSearch: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this,
      this.triggerEvent('onSearchCancel', '取消按钮被点击了', {})
    },
    onPopularSearch(event) {
      console.log(event)
      const keyword = this.data.popularTags[event.currentTarget.dataset.index]
      this.setData({
        keywordValue: keyword
      })
      this.searchBook({
        start: 0,
        keyword
      })
    },
    onHistorySearch(event) {
      const keyword = this.data.searchData[event.currentTarget.dataset.index]
      this.setData({
        keywordValue: keyword
      })
      this.searchBook({
        start: 0,
        keyword
      })
    },
    onClear() {
      this.setData({
        start: 0,
        bookData: [],
        showSearchResult: false
      })
    },
    saveSearchInfo(info) {
      searchModel.setSearchInfo(info)
      this.setData({
        searchData: searchModel.getSearchInfo()
      })
    },
    onSearchConfirm(event) {
      const keyword = event.detail.value || this.data.keywordValue
      console.log(keyword)
      this.searchBook({
        start: 0,
        keyword
      })
    },
    searchBook(config) {
      // 判断搜索关键字是否为空 且 不为 空格 
      if (!config.keyword.trim().length) return
      // 搜索前先将之前数据清空
      this.setData({
        bookData: []
      })
      wx.showLoading({
        title: '搜索中...'
      })
      requestModel.searchBook(config)
        .then(v => {
          this.saveSearchInfo(config.keyword)
          this.setData({
            showSearchResult: true
          })
          console.log(v)
          this.setData({
            bookData: v.books,
            bookTotalNums: v.total
          })
        })
        .catch(e => console.log(e))
        .finally(() => wx.hideLoading())
    },
    onClickBookItem(event) {
      console.log(event.detail)
      wx.navigateTo({
        url: '../bookDetail/index?id=' + event.detail.id,
      })
    },
    searchMore(config) {
      // 判断搜索关键字是否为空 且 不为 空格  && config.keyword
      if (!config.keyword.trim().length) return
      // 如不为初始的undefined时 判断搜索页数是否达到上限
      if (typeof this.data.bookTotalNums !== 'undefined' && config.start >= this.data.bookTotalNums) {
        console.log('666')
        wx.showToast({
          title: '结果全部展示啦',
          duration: 2500
        })
        return
      }
      // 判断搜索是否正在进行，避免重复搜索
      if (!this.data.isSearch) {
        wx.showLoading({
          title: '获取更多中...'
        })
        // 加锁
        this.setData({
          isSearch: true
        })
        // 获取更多的请求
        requestModel.searchBook(config)
          .then(v => {
            this.saveSearchInfo(config.keyword)
            console.log(v)
            // 将获取到的新数据追加到之前数据后面
            this.setData({
              bookData: this.data.bookData.concat(v.books),
              bookTotalNums: v.total
            })
          })
          .catch(e => console.log(e))
          .finally(() => {
            // 取消loading显示与去锁
            wx.hideLoading()
            this.setData({
              isSearch: false
            })
          })
      }
    }
  },
  attached() {
    this.setData({
      searchData: searchModel.getSearchInfo()
    })
    requestModel.getPopularTags()
      .then(v => {
        console.log(v)
        this.setData({
          popularTags: v.hot
        })
      })
      .catch(e => console.log(e))
  }
})