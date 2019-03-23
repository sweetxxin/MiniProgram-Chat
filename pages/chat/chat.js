const app = getApp()
const map = app.globalData.map
const code = app.globalData.code

Page({
  data: {
    doctorList:[]
  },
  goToChat:function(e){
    console.log(e)
    var id = e.target.dataset.id;
    wx.redirectTo({
      url: '/pages/chatting/chatting?id='+id,
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: app.globalData.server+'/doctor/list?token=123',
      method: 'GET',
      success: function(res) {
        that.setData({
          doctorList : res.data.data
        })
       console.log(that.data.doctorList)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})