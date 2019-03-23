const app = getApp()
const map = app.globalData.map

Page({
  data: {
    enrolledArrayn: app.globalData.enrolledList,
    enrolledArrayc: []
  },

  tapDetail: function(e) {
    let obj = this.data.enrolledArrayc[e.currentTarget.id]
    wx.navigateTo({
      url: './detail?_type=' + obj._type + '&society=' + obj.society + '&departion=' + obj.departion + '&description=' + obj.description + '&turn=' + obj.turn,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function (options) {
    // let array = []
    // this.setData({
    //   enrolledArrayn: app.globalData.enrolledList
    // })
    // for(let i = 0; i < this.data.enrolledArrayn.length; i++) {
    //   for (let key in this.data.enrolledArrayn[i]) {
    //     array.push({
    //       _type: map[key.slice(0, 1)],
    //       society: map[key.slice(1, 3)],
    //       departion: map[key.slice(3)],
    //       description: this.data.enrolledArrayn[i][key][0],
    //       turn: this.data.enrolledArrayn[i][key][1]
    //     })
    //   }
    // }

    // this.setData({
    //   enrolledArrayc: array
    // })
  },

  onReady: function () {
  
  },

  onShow: function () {
    if (this.data.enrolledArrayn != app.globalData.enrolledList) {
      let array = []
      this.setData({
        enrolledArrayn: app.globalData.enrolledList
      })
      for (let i = 0; i < this.data.enrolledArrayn.length; i++) {
        for (let key in this.data.enrolledArrayn[i]) {
          array.push({
            _type: map[key.slice(0, 1)],
            society: map[key.slice(1, 3)],
            departion: map[key.slice(3)],
            description: this.data.enrolledArrayn[i][key][0],
            // turn: this.data.enrolledArrayn[i][key][1]
          })
        }
      }

      this.setData({
        enrolledArrayc: array
      })
    }
  },

  onHide: function () {
    
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  }
})