// pages/newsDetails/newsDetails.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0

  },
  likeYou:function(e){
    let type=e.currentTarget.dataset.type;
    let id=this.data.id;
    console.log(id)
    let data={};
    data.map ="applet_zhaofei_likecategory",
      data.id = this.data.id; wx.request({
        url: app.globalData.requestUrl,
        data: data,
        success: (res) => {
          console.log(res)
          if (res.data.ec == 200) {
            this.setData({
           msg:res.data.data
            })

            if (this.data.newsDetails.member==0){
              let newsDetails = this.data.newsDetails;
              newsDetails.member=1;
              this.setData({
                newsDetails
              })
            }else{
              let newsDetails = this.data.newsDetails;
              newsDetails.member=0;
              this.setData({
                newsDetails
              })
            }

          }
        }
      })
    
    

  },
  newsDetails:function(){
    let data={};
    data.id=this.data.id;
    data.map ="applet_zhaofei_information"
    wx.request({
      url:app.globalData.requestUrl,
      data:data,
      success:(res)=>{
        console.log(res)
        if(res.data.ec==200){
          this.setData({
            newsDetails:res.data.data[0],
            content:res.data.data[0].content.replace(/\<img/gi,'<img style="max-width:100%;height:auto"')
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
    let that=this;
    that.setData({
      id:e.id
    })
    that.newsDetails()
    


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
    wx.setNavigationBarTitle({
      title: '最新消息',
    })
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