// components/controlButton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "耐心等待..."
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    firstIndex: {
      type: Number,
      value: 0
    },
    lastIndex: {
      type: Number,
      value: 8
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: 'images/left.png',
    rightSrc: 'images/right.png',
    disableLeftSrc: 'images/left@disable.png',
    disableRightSrc: 'images/right@disable.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickLeft(event) {
      if(!(this.data.currentIndex>this.data.firstIndex)){
        return 
      }
      this.triggerEvent('controlClicked', {
        index:this.data.currentIndex,
        type:'previous'
      }, {})
    },
    clickRight(event) {
      if(!(this.data.currentIndex<this.data.lastIndex)){
        return 
      }
      this.triggerEvent('controlClicked', {
        index:this.data.currentIndex,
        type:'next'
      }, {})
    }
  }
})