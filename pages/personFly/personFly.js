// pages/personFly/personFly.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:false,
    page:0,


  },
  gotoDetail:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/fly/fly?id='+id,
    })
  },



  messageList: function () {
    let data = {};
    data.map = 'applet_zhaofei_recruitlist';
    data.page = this.data.page;
    data.category = this.data.id;
    wx.request({
      url: app.globalData.requestUrl,
      data:data,
      success: (res) => {
        console.log(res)
        if (res.data.ec == 200) {
          this.setData({
            messageList: res.data.data,
            headerTitle: res.data.header
          })
        }

        wx.setNavigationBarTitle({
          title: this.data.headerTitle
        })

      },
      fail: () => {
        wx.showToast({
          title: '网络错无',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }

    })

  },

  toFly:function(){
   wx.navigateTo({
     url: '/pages/fly/fly',
   })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      id:options.id
    })
    that.messageList()
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