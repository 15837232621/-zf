
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 8974,
    page:0,
    orderlist:[],
    noMoretip:false,
    showLoading:false,
    noMoreContent:false
  },

  changeTab: function (e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    that.setData({
      type,
      page:0,
      orderlist:[],
      noMoretip:false,
      noMoreContent:false

    })
    that.newsMsg()

  },
  toDetails: function (e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/newsDetails/newsDetails?id=' + id,
      success: function(res) {'ok'},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  newsMsg:function(){
    let data={};
    data.type=this.data.type
    data.map ='applet_zhaofei_informationlist'
    data.page=this.data.page;
    wx.request({
      url:app.globalData.requestUrl,
      data:data,
      success:(res)=>{
        console.log(res)
        if(res.data.ec==200){
            let preList=this.data.orderlist;
           let newList=res.data.data;
          let allList = preList.concat(newList);
           if(newList.length<10){
             this.setData({
             noMoretip:true, //没有跟多了
             noMoreContent:true,//上拉触底
             showLoading:false 
             })
           }
           this.setData({
             orderlist:allList
           })
        }else{
          this.setData({
            noMoretip:true
          })
        }
      }
      ,
      fail:()=>{
        wx.showToast({
          title: '网络错误',
          icon:'none'
        })
      },
      complete:()=>{
        wx.stopPullDownRefresh()//停止当前页面下拉刷新
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
     
    })
    let that=this;
    this.setData({
      id:options.id
    })
    that.messageList()
    that.newsMsg()
  },
  //列表的处理函数
  messageList:function(){
    let data={};
    data.map='';
    data.page=this.data.page;
    data.category=this.data.id;
    wx.request({
      data:data,
      url:app.globalData.requestUrl,
      success:(res)=>{
        console.log(res)
        if(res.data.ec==200){
          wx.showToast({
            title: '数据加载完了',
          })
          this.setData({
            messageList:res.data.data,
            headerTitle:res.data.header
          })
        }

      },
      fail:()=>{
        wx.showToast({
          title: '网络错无',
          icon:'none'
        })
      },
      complete:()=>{
        setTimeout(function(){

         wx.hideLoading()
        },1500)
      }

    })

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
     this.setData({
       orderlist:[],
       page:0
     })
    this.newsMsg();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page=this.data.page;
    if(!this.data.noMoreContent){
      page++;
      this.setData({
        page,
        showLoading:true
      })
      this.newsMsg();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})