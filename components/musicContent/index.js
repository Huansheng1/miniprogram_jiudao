const musicManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classicData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    srcImage: 'images/music.png',
    isPlay: false,
    playIconSrc: 'images/stoping.png'
  },
  observers: {
    isPlay() {
      this.setData({
        playIconSrc: this.data.isPlay ? 'images/playing.png' : 'images/stoping.png'
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClicked(event) {
      this.setData({
        isPlay: !this.data.isPlay
      })
      if (!this.data.isPlay) {
        musicManager.pause()
      } else {
        console.log('音乐开始播放')
        // 音频标题，用于原生音频播放器音频标题（必填）。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
        musicManager.title = this.data.classicData.title
        // 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
        musicManager.epname = this.data.classicData.content
        // 设置src会自动播放
        musicManager.src = this.data.classicData.url
        console.log(musicManager)
      }
      this.triggerEvent('changePlayStatus', this.data.isPlay, {})
    },
    // 判断返回正确的播放状态
    _watchPlaying() {
      const resultFlag = this.data.classicData.url === musicManager.src
      if (musicManager.src) {
        return resultFlag && !musicManager.paused
      }
      return false
    },
    // 监听用户不通过我们按钮而是选择使用系统自带的操作音乐播放
    _watchUserControl(){
      musicManager.onPause(()=>{
        this.setData({
          isPlay: this._watchPlaying()
        })
      })
      musicManager.onPlay(()=>{
        this.setData({
          isPlay: this._watchPlaying()
        })
      })
      musicManager.onStop(()=>{
        this.setData({
          isPlay: this._watchPlaying()
        })
      })
      musicManager.onEnded(()=>{
        this.setData({
          isPlay: this._watchPlaying()
        })
      })
    }
  },
  attached() {
    console.log('音乐组件加载成功')
    this.setData({
      isPlay: this._watchPlaying()
    })
  }
})