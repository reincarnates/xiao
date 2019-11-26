var url = "http://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0; 

// 获取数据的方法，具体怎么获取列表数据大家自行发挥  
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn
    },
    success: function (res) {
      //console.info(that.data.list);  
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData: '',
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.queryData = options.id;
    // this.setData({
    //   queryData: options.id
    // });
    // console.log(this.data.queryData);
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值  
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });  
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
    //  在页面展示之后先获取一次数据  
    var that = this;
    GetList(that);  
  },

  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件  
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。  
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新  
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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