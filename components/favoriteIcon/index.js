// components/favoriteIcon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeCount: {
      type: Number,
      value: 0
    },
    likeStatus: {
      type: Boolean,
      value: false
    },
    writeOnly: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: 'images/like.png',
    srcHighLight: 'images/like@highlight.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike(event) {
      // 如果传入写入为假则不可点击
      if (!this.data.writeOnly) return
      this.setData({
        likeStatus: !this.data.likeStatus
      })
      this.triggerEvent('onlike', this.data.likeStatus, {})
    }
  }
})