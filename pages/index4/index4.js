// pages/index4/index4.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  toLook: function() {
    wx.navigateTo({
      url: '/pages/expert/expert',
    })
  },

  
  toSearch: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/serverDetail/serverDetail?id=' + id,
    })
  },
  index4: function() {
    let data = {};
    data.map = "applet_zhaofei_physicalindex";
    wx.request({
      url: app.globalData.requestUrl,
      data: data,
      success: (res) => {
        console.log(res.data)
        if (res.data.ec == 200) {
          this.setData({
            index4:res.data
          })
        

        }else{
          wx.showToast({
            title: res.data.em,
            icon:'none'
          })
        }

      },
      fail:function(){
     wx.showToast({
       title: '网络错误',
       icon:'none'
     })
      },
      complete:function(){
        wx.hideLoading()
      }


    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.index4()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})