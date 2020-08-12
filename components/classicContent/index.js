Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classicData:{
      type:Object,
      value:{},
      observer(){
        this.setData({
          srcImage:this.data.classicData.type===100?'images/movie.png':'images/verse.png'
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    srcImage:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
