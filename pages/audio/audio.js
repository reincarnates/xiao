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

    scrollindex: 0,  //当前页面的索引值
    totalnum: 4,  //总共页面数
    starty: 0,  //开始的位置x
    endy: 0, //结束的位置y
    critical: 80, //触发翻页的临界值
    margintop: 0,  //滑动下拉距离

    animationMiddleHeaderItem: {},
  },

  scrollTouchstart: function (e) {
    let py = e.touches[0].pageY;
    console.log(py);
    this.setData({
      starty: py
    })
  },
  scrollTouchend: function (e) {
    let py = e.changedTouches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    console.log(e.changedTouches[0].pageY, d.starty);
    if (py - d.starty > d.critical && d.scrollindex > 0) {
      this.setData({
        scrollindex: d.scrollindex - 1
      })
    } else if (py - d.starty < -(d.critical) && d.scrollindex < this.data.totalnum - 1) {
      this.setData({
        scrollindex: d.scrollindex + 1
      })
    }
    this.setData({
      starty: 0,
      endy: 0,
      margintop: 0
    })
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
    this.heart();
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

  heart: function() {
    var circleCount = 0;
    // 心跳的外框动画
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 1000,    // 以毫秒为单位
      /**
     * http://cubic-bezier.com/#0,0,.58,1  
     *  linear  动画一直较为均匀
     *  ease    从匀速到加速在到匀速
     *  ease-in 缓慢到匀速
     *  ease-in-out 从缓慢到匀速再到缓慢
     * 
     *  http://www.tuicool.com/articles/neqMVr
     *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
     *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
     */
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {
      }
    });

    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scale(1.2).step();
      } else {
        this.animationMiddleHeaderItem.scale(1.0).step();
      }

      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export()
      });

      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000);
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