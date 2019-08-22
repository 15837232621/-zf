// pages/index2/index2.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    page: 0,
    noMoreTip: false,
    noMoreContent: false,
    faceList: [],
    showLoading: false


  },
  toDetails: function() {
    wx.navigateTo({
      url: '/pages/interview/interview',
    })
  },
  changeTab: function(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    that.setData({
      type,
      page: 0,
      noMoreTip: false,
      noMoreContent: false,
      faceList: []
    })
    this.intervitallist()


  },
  intervitallist: function() {
    let data = {};
    data.map = "applet_zhaofei_orderlist";
    data.page = this.data.page;
    data.type = this.data.type;
    wx.request({
      url: app.globalData.requestUrl,
      data: data,
      success: (res) => {
        console.log(res)
        if (res.data.ec == 200) {
          let preList = this.data.faceList;
          let intervitallist = res.data.data.list
          let allList = preList.concat(intervitallist)
          if (intervitallist.length < 10) {
            noMoreTip: true;
            noMoreContent: true;
            showLoading: false;
          }
          this.setData({
            faceList: allList
          })
        } else {
          this.setData({
            noMoreTip: true,
            showLoading: false,
            noMoreContent: true
          })
        }

      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none',

        })
      },
      complete: () => {
        wx.stopPullDownRefresh()

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.intervitallist()
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
    wx.setNavigationBarTitle({
      title: '面试技巧',
    })

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
    let that = this;
    that.setData({
      page: 0,
      faceList: []
    })
    this.intervitallist()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (!that.data.noMoreContent) {
      let page = that.data.page;
      page++;
      that.setData({
        page,
        showLoading: true
      })
      this.intervitallist()

    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})