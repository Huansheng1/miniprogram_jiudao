// components/bookitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookData:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageError: 'images/img-undefined.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 图片加载出错时使用默认的占位图片
  onLoadImgErr() {
    this.setData({
      ['bookData.image']: this.data.imageError
    })
  },
    onClickBook(event){
      this.triggerEvent('clickedBook',this.data.bookData,{})
    }
  }
})
