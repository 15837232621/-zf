// pages/serverDetail/serverDetail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    inputValue: [],
    page: 0,
    noMoreTip: false,
    noMoreContent: false,
    serverList: [],
    showLoading: false
  },

  watchInput: function(e) {
    console.log(e)
    this.setData({
      inputValue: e.detail.value
    })
  },
  search: function() {
    let inputValue = this.data.inputValue
    this.serverDetail(inputValue)
  },
 




  changeTab: function(e) {
    let that = this;
    console.log(e);
    let type = e.currentTarget.dataset.type;
    that.setData({
      type,
      page: 0,
      noMoreTip: false,
      noMoreContent: false,
      serverList: []
    })
    this.serverDetail()
  },
  serverDetail: function(inputValue) {
    let data = {};
    data.map = 'applet_zhaofei_physicallist'
    data.cls = this.data.id
    data.page=this.data.page
    if (inputValue) {
      data.title = inputValue;
    }
    wx.request({
      url: app.globalData.requestUrl,
      data: data,
      success: (res) => {
        console.log(res.data)
        if (res.data.ec == 200) {
          let preList = this.data.serverList;
          let serverDetail = res.data.list
          let allList = preList.concat(serverDetail)

          if (serverDetail.length < 10) {
            noMoreTip: true;
            noMoreContent: true;
            showLoading: false;
          }
          if (inputValue) {
            this.setData({
              page:0,
              serverList: serverDetail
            })
          }else{
            this.setData({
              serverList: allList
            })
          }
        } else {
          this.setData({
            showLoading: false,
            noMoreContent: true
          })
          setTimeout(function(){
          wx.showToast({
            title: res.data.em,
            icon: 'none'
          })
          },1500)
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
        //防止错误信息一闪而过
        setTimeout(function() {
          wx.hideLoading()
        }, 1500)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    console.log(e)
    let that = this;
    that.setData({
      id: e.id
    })
    that.serverDetail()
    //分享页面时没有标识也要加载数据
    if (!app.globalData.plumsession) {
      app.plumsessionCallback = plumsession => {
        if (plumsession != '') {
          app.wxchart();
          that.serverDetail()
        }
      }
    } else {
      that.serverDetail()
    }
  },
  //判断用户是否授权/权限



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
    let that = this;
    that.setData({
      page: 0,
      serverList: [],
      inputValue: ''
    })
    this.serverDetail()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (!that.data.noMoreContent) {
      let page = that.data.page;
      page++;
      console.log(page)
      that.setData({
        page,
        showLoading: true
      })
      this.serverDetail()

    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '第一次',
      path: '/pages/serverDetail/serverDetail'
    }

  }
})