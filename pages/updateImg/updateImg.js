// pages/updateImg/updateImg.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
 

  },
  testImg: function (e) {
    let that = this;
    let arr = [];
    let url = e.currentTarget.dataset.imgs;
    arr.push(url)
    wx.previewImage({
      urls:arr,
    })
  },

  //上传图片的逻辑
  chooseImage:function(){
    //显示操作菜单
wx.showActionSheet({
  itemList: ['从相册选择','拍照'],
  success:(res)=>{
     console.log(res)
    if (res.tapIndex==0){
       let type='album'
       this.chooseImgTwo(type)
     }else{
       let type="camera"
      this.chooseImgTwo(type)
     }
  }, 
})
  },
  chooseImgTwo(type){
    //从本地相册选择图片或使用相机拍照
    let that=this;
    let images = that.data.images
    wx.chooseImage({
      count:3,
      sourceType:[type],
      success: (res)=>{
        for (let i=0;i<res.tempFilePaths.length;i++){
        that.upLoadImg(res.tempFilePaths[i])
        }
      },
    })
  },
  upLoadImg(path){
    wx.uploadFile({
      url: app.globalData.requestUrl+'&map=applet_img_upload',
      filePath:path,
      name: 'image',
      success:(res)=>{
        console.log(res);
        console.log(JSON.parse(res.data))
        let imgSrc = JSON.parse(res.data).data;
        this.setData({
          images: this.data.images.concat(imgSrc.url)
        })
          console.log(this.data.images)
        }
    })
  },
  delete:function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index ;
    let images=this.data.images;
      images.splice(index, 1)
    this.setData({
      images:images
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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