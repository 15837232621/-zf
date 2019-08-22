//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slient: 1, //用户是否授权,1授权，2未授权
    showModel: 1,
    item: true,
  },
  gotodetail: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/newsDetails/newsDetails?id=' + id
    })
  },




gotoList:function(e){
  let that=this;
  let id=e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/personFly/personFly?id='+id,
  })

},


  cancel: function() {
    let that = this;
    that.setData({
      showModel: 0
    })
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
     //防止首页加载
    /* wx.login是异步函数、此时可能获取不到值 */
    if (!app.globalData.plumsession) {
      app.plumsessionCallback = plumsession => {
        if (plumsession != '') {
          that.getSlient() //有标识之后判断再是否授权
        } else {
          console.log('未查询到登录信息')
          app.wxchart();
        }
        that.indexMsg();
      }
    } else {
      that.getSlient();
      that.indexMsg();
      console.log(that.indexMsg());

    }


  },

  //判断用户是否授权/权限
  getSlient: function() {
    var that = this;
    //获取用户当前设置
    wx.getSetting({
      success: res => {
        console.log(res)
        //判断是否有权限
        let slient = that.data.slient;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，1.可以直接调用 getUserInfo 获取头像昵称，2.不会弹框
          console.log(app.globalData.nickname)
          that.setData({
            slient:1
          })
          
        } else {
          that.setData({
            slient: 2
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: function() {
        setTimeout(function() {
          wx.hideLoading()
        }, 1500)
      }
    })
  },
/*   获取用户信息ok */
  getUserInfo: function() {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo)
        //res获取到的用户信息将用户信息添加到全局globalData中人才库中直接使用
        app.globalData.userInfo = res.userInfo;
        //更新用户信息调用upload函数
        /* that.uploadUserInfo(res.userInfo) */
        //获取信息后让弹框消失
        that.setData({
          slient: 1
        })
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: function() {
        setTimeout(function() {
          wx.hideLoading()
        })
      }

    })
  },
/*   首页数据 */
  indexMsg: function() {
    let that = this;
    let data = {};
    data.map = 'applet_zhaofei_index';
    wx.request({
      url: app.globalData.requestUrl,
      data,
      success: function(res) {
        console.log(res)
        if (res.data.ec == 200) {
          that.setData({
            indexMsg: res.data.data
          })
          console.log(that.data.indexMsg)
        } else {
          wx.showToast({
            title: res.data.em,
            icon: 'none'
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
/*   上传用户信息ok */
uploadUserInfo: function(userInfo) {
    var data = {};
    data.map = 'applet_update_member_info';
    data.avatar = userInfo.avatarUrl;
    data.nickname = userInfo.nickName;
    data.sex = userInfo.gender == 1 ? '男' : '女';
    data.province = userInfo.province;
    data.city = userInfo.city
    console.log(data);
    wx.request({
      url: app.globalData.requestUrl,
      data: data,
      success: function(res) {
        console.log(res);
        console.log(res.data);
        if (res.data.ec == 200) {
          wx.showToast({
            title: '授权成功',
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: function() {
        setTimeout(function() {
          wx.hideLoading()
        }, 1500)
      }
    })
  },


  uploadUserInfo:function(){
    let data={};


  },






  toPersonFly: function() {
    wx.navigateTo({
      url: '/pages/personFly/personFly',
      success: function(res) {
        'ok'
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  toNews: function() {
    wx.navigateTo({
      url: '/pages/news/news',
      success: function(res) {
        'ok'
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getData: function(e) {
    console.log(e)
    let that = this;
    let item = that.data.item;
    item = !item
    //更新数据层
    that.setData({
      item
    })


  }

})