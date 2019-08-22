// pages/fly/fly.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.3245211,
    latitude: 23.10229,
  },
  changeindex: function (e) {
    let that = this;
    let type = that.data.type;
    that.setData({
      type: !type
    })

  },
  inviteDetail:function(){
    let data={};
    data.map ="applet_zhaofei_recruit",
    data.id=this.data.id
    wx.request({
      url: app.globalData.requestUrl,
      data:data,
      success:(res)=>{
        console.log(res)
        if(res.data.ec==200){
          this.setData({
            inviteDetail:res.data.data[0],
            markers: [{
              iconPath: "/images/icon_address.png",
              longitude: res.data.data[0].lng,
              latitude: res.data.data[0].lat,
              width: 50,
              height: 50
            }]

          })
        }
       
      }
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
        this.setData({
          id:e.id
        })
    this.inviteDetail()

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