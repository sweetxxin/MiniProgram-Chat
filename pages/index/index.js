//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log("onload")
    if (app.globalData.userInfo) {
      if (app.globalData.basicInfo.data.code==-1){
        console.log("用户未注册");
        wx.redirectTo({
          url: '../basic/basic',
        })
      }
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log("else if")
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(app.globalData.basicInfo)
        if (app.globalData.basicInfo.data.code == -1) {
          console.log("用户未注册");
          wx.redirectTo({
            url: '../basic/basic',
          })
        }
      }
    } else {
      console.log("else")
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
