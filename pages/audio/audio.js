// pages/audio/audio.js

const back = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    isPlay: false,
    timer: '',
    n: 0,
  },

  audio: function() {
    if (this.data.isPlay = !this.data.isPlay) {
      this.endSetInter();
      back.pause();
    } else {
      this.startSetInter();
      back.play();
    }
  },

  //预览图片
  previewImg: function (e) {
    var currentUrl = e.currentTarget.dataset.currenturl
    var previewUrls = e.currentTarget.dataset.previewurl
    wx.previewImage({
      current: currentUrl, //必须是http图片，本地图片无效
      urls: previewUrls, //必须是http图片，本地图片无效
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    player();
    function player() {
      back.title = "可不可以";
      back.src = "https://reincarnation.oss-cn-beijing.aliyuncs.com/audio/%E5%8F%AF%E4%B8%8D%E5%8F%AF%E4%BB%A5.mp3";
      back.onEnded(() => {
        player();
      })
    };

    var picList = [];
    picList.push("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1623318287,3864173199&fm=27&gp=0.jpg");
    picList.push("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532429494100&di=6d4f20a64fb21f113e1bb67be1cdbb63&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121019%2F240425-12101920154274.jpg");
    picList.push("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532429494100&di=f3712ddf9ca5b37bf81f2cea4ae40c54&imgtype=0&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140808%2F0042040230406581_b.jpg");
    that.setData({
      picList: picList,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startSetInter();
    back.play();
  },

  startSetInter: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    var that = this;
    //连续动画需要添加定时器,所传参数每次+1就行
    var timerTem = setInterval(function () {
      // animation.translateY(-60).step()
      that.data.n = that.data.n + 1;
      animation.rotate(10 * (that.data.n)).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200);

    this.setData({
      timer: timerTem
    });
  },

  endSetInter: function() {
    clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.endSetInter();
    back.pause();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { 
    this.animation.rotate(0).step();
    this.endSetInter();
    this.setData({
      animationData: this.animation.export(),
      n: 0
    });
    wx.pauseBackgroundAudio()
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