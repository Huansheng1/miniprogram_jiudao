// components/dateStyle.js
Component({
  properties: {
    numIndex: {
      type: Number,
      value: 0
    }
  },
// 定义需要使用的变量
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0,
    month: '',
    _index: 0
  },
  observers: {
    numIndex() {
      let _index = this.data.numIndex < 10 ? '0' + this.data.numIndex : this.data.numIndex
      this.setData({
        _index: _index
      })
    }
  },
  // 组件进入节点树时执行代码（也就是组件生成渲染后会调用）
  attached() {
    let date = new Date()
    this.setData({
      year: date.getFullYear(),
      month:this.data.months[date.getMonth()]
    })
  }
})