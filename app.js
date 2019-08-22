//app.js
const rqcfg = require('/utils/constant.js');
App({
  
  globalData: {
    requestUrl: '',
    userInfo:{}
  },
  onLaunch: function() {
    console.log('你走这吗')
     var that=this;
     that.wxchart();
  },
  //微信授权
  wxchart: function (obj) {
    var that = this;
    console.log('1245454')
    wx.login({
      success: res => {
        let data = {};
        data.map = 'applet_member_info';
        data.code = res.code;
        data.slient = 1;
        data.suid = rqcfg.rqcfg.suid;
        console.log(data)
        wx.request({
          url: rqcfg.rqcfg.rqurl,
          data: data,
          success(res) {
            console.log(res)
            if (res.data.ec == 200) {
              that.globalData.plumsession = res.data.data.plum_session_applet
              that.globalData.nickname = res.data.data.nickname
              that.globalData.requestUrl = rqcfg.rqcfg.rqurl + '&plum_session_applet=' + res.data.data.plum_session_applet + '&suid=' + rqcfg.rqcfg.suid;
              console.log(that.globalData.requestUrl)

              if (that.plumsessionCallback) {
                that.plumsessionCallback(res.data.data.plum_session_applet)
              }

            } else {
              wx.showToast({
                title: 'res.data.em',
                icon: 'none'
              })
            }
          },
          fail() {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
          }

        })






        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

})