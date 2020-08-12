// components/tag/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持，只要slot有名字就必须开启该选项
  },
  externalClasses: ['tag-class'],
  properties: {
    tag: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})