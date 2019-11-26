const app = getApp();

const accountInfo = wx.getAccountInfoSync();
// console.log(accountInfo);
var order = ['red', 'yellow', 'blue', 'green', 'red']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'hello word!',
    arr: [1, 2, 3, 4, 5],
    demo: {
      fristName: '田伟'
    },
    inputVal: '',
    datas: app.globalData.myData,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    arr2: 26,
    toView: 'red',
    scrollTop: 100,
    statusBarHeight: app.globalData.statusBarHeight,
    // userName: '',
    // passWord: ''
    //轮播图
    slider: [],
    swiperCurrent: 3,
    slider: [
      {
        url: '', picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      },
      {
        picUrl: 'http://tapiserv.fulibuy.cn/upload/picture/evaluate/20190802/77d7-95b49-0b1f72-dadf341-9783.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: false,
    beforeColor: "white",//指示点颜色 
    afterColor: "coral",//当前选中的指示点颜色 
    date: '2016-09-01',
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //轮播图的切换事件 
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可 
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  dotsChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可 
    this.setData({
      dotsCurrent: e.detail.current
    })
  },
  //点击指示点切换 
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  chuangEvents: function (e) {
    this.setData({
      dotsCurrent: e.currentTarget.id
    })
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  // userInput(e) {
  //   this.setData({
  //     userName: e.detail.value
  //   });
  // },

  // passInput(e) {
  //   this.setData({
  //     passWord: e.detail.value
  //   });
  // },

  login() {
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        wx.getUserInfo({
          success: data => {
            // console.log(data);  
            let params = {
              code: res.code,
              user_info: JSON.stringify(data.userInfo),
              encrypted_data: data.encryptedData,
              iv: data.iv,
              signature: data.signature,
              _version: '2.8.9',
              _platform: 'wx'
            }
            // console.log(params);
            // app.wxRequest('POST', 'https://test.zukejianshen.com/?store_id=3&r=api/passport/login', params, function (res) {
            //   console.log(res);
            // });
            wx.request({
              url: 'https://test.zukejianshen.com/?store_id=3&r=api/passport/login',
              method: 'POST',
              data: params,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                // 'Accept': 'application/json;charset=UTF-8',
                // "Cookie": "openId=" + wx.getStorageSync("openId"),
              },
              dataType: 'json',
              success: function(res) {
                console.log(res);
              },
            })
          }
        });
      }
    });
  },

  getBeacon() {
    var that = this;
    //监测蓝牙状态的改变
    wx.onBluetoothAdapterStateChange(function(res) {
      if (res.available) { //如果用户打开蓝牙，开始搜索IBeacon
        searchBeacon();
      }
    })

    //搜索beacons
    searchBeacon();
    //搜索函数
    function searchBeacon() {
      //检测蓝牙状态
      wx.openBluetoothAdapter({
        success: function(res) { //蓝牙状态：打开
          wx.startBeaconDiscovery({ //开始搜索附近的iBeacon设备
            uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825'], //参数uuid
            success: function(res) {
              wx.onBeaconUpdate(function(res) { //监听 iBeacon 设备的更新事件  
                //封装请求数据 
                var beacons = res.beacons;
                var reqContent = {};
                var bleArray = [];
                for (var i = 0; i < beacons.length; i++) {
                  var bleObj = {};
                  bleObj.distance = beacons[i].accuracy;
                  bleObj.rssi = beacons[i].rssi;
                  bleObj.mac = beacons[i].major + ":" + beacons[i].minor;
                  bleArray.push(bleObj);
                }
                reqContent.ble = bleArray;
                //请求后台向redis插入数据
                redisSave(reqContent);
              });
            },
            fail: function(res) {
              //先关闭搜索再重新开启搜索,这一步操作是防止重复wx.startBeaconDiscovery导致失败
              stopSearchBeacom();
            }
          })
        },
        fail: function(res) { //蓝牙状态：关闭
          wx.showToast({
            title: "请打开蓝牙",
            icon: "none",
            duration: 2000
          })
        }
      })
    }

    function redisSave(reqContent) {
      wx.request({
        url: "https://map.intmote.com/LocateServer/location.action",
        data: JSON.stringify(reqContent),
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        },
        success: function(res) {
          // wx.showToast({ title: "seccess" })
          console.log(res);
        },
        fail: function(res) {
          // wx.showToast({ title: "1" })
        }
      });
    }

    //关闭成功后开启搜索
    function stopSearchBeacom() {
      wx.stopBeaconDiscovery({
        success: function() {
          searchBeacon();
        }
      })
    }
  },

  scanCode() {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },

  vibrateShort() {
    wx.vibrateLong({
      success(res) {
        console.log(res);
      }
    });
  },

  a() {
    wx.showModal({
      title: '测试',
      content: '123'
    });
    // const version = wx.getSystemInfoSync().SDKVersion
    // console.log(version);
    // wx.login({
    //   success(res) {
    //     console.log(res);
    //     wx.getSetting({
    //       success(res) {
    //         if (!res.authSetting['scope.werun']) {
    //           wx.authorize({
    //             scope: 'scope.werun',
    //             success() {
    //               wx.getWeRunData({
    //                 success() {
    //                   wx.getWeRunData({
    //                     success(res) {
    //                       console.log(res);
    //                     }
    //                   });
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },

  //判断微信版本
  compareVersion: function(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },


  viewTap: function() {
    console.log(this.data.msg);
  },

  changeMsg: function() {
    this.setData({
      msg: '已改变'
    });
  },

  changeVal: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  },

  onPageScroll: function(e) {
    // console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  returTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  onPullDownRefresh: function () {
    var _this = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      _this.setData({
        arr2: 30
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh({
        success() {
          console.log(arr2);
        }
      }) //停止下拉刷新
    }, 1000);
  },

  getAddress(e) {
    // wx.setNavigationBarTitle({
    //   title: '当前页面',
    //   success(res) {
    //     console.log(res);
    //   }
    // });
    // wx.showNavigationBarLoading({
    //   success(res) {
    //     console.log(res);
    //   }
    // });
    // wx.hideToast({
    //   success(res) {
    //     console.log(res);
    //   }
    // });
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })
    // wx.showLoading({
    //   title: '加载中',
    // })

    // setTimeout(function() {
    //   wx.hideLoading();
    //   wx.navigateTo({
    //     url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id,
    //   });
    // },2000);
    // wx.showModal({
    //   title: '成功',
    //   content: '提交成功',
    //   showCancel: false,
    //   success() {
    //     wx.navigateTo({
    //       url: "../detail/detail?id=" + e.currentTarget.dataset.id,
    //     });
    //   }
    // });
    // console.log(e.currentTarget.dataset.id);
    // wx.navigateTo({//页面隐藏
    //   url: "../detail/detail?id=" + e.currentTarget.dataset.id,
    // });
    // wx.chooseAddress({
    //   success: (res) => {
    //     console.log(res);
    //     // this.setData({
    //     //   addressInfo: res
    //     // })
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
  },

  paymentClick() {
    // wx.requestPayment({

    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var params = {
    //   appId: 1,
    //   pageId: 1,
    //   channelId: '',
    //   versionId: '',
    //   ver: '',
    //   shuqi_h5: '',
    //   md5key: '',
    //   userId: 8000000,
    //   timestamp: 1560238237,
    //   type: 1,
    //   resetcache: '',
    //   sign: 'A7754F7166B7BD5E3AFABADDF1C6D1C5',
    //   key: 'shuqiapi',
    //   _: 1560238237067
    // }
    // app.wxRequest('GET', 'http://bookstoreapi.shuqireader.com/eva_bookstore/v1/stencil/query', params, function (res) {
    // console.log(res);
    // });

    var a = 10, b = 20;
    if(a == 10) 
    // console.log(a); 
    var a = function () {
      // console.log(3 === arguments.length);
      // console.log(100 === arguments[0]);
      // console.log(200 === arguments[1]);
      // console.log(300 === arguments[2]);
      // console.log(arguments.constructor);
    };
    a(100, 200, 300);

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              // console.log(res.userInfo)
            }
          })
        }
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  console.log(res);
                }
              })
            }
          })
        }
      }
    })

    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        // console.info(res);
        // that.setData({
        //   scrollHeight: res.windowHeight
        // });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉加载");
    var _this = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function() {
      // complete
      _this.setData({
        arr2: _this.data.arr2 + 5
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})