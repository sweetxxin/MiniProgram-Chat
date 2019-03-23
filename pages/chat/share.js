const app = getApp()
const map = app.globalData.map

Page({
  data: {
    shareData: {
      title: "线上报名系统",
      // imageUrl: '../../image/tiaokuan.png'
    },
    society: '',
    department: ''
  },

  back: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  onLoad: function (options) {
    let department = options.department
    this.setData({
      society: map[department.slice(1, 3)],
      department: map[department.slice(3)]
    })
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
    return this.data.shareData
  }
})