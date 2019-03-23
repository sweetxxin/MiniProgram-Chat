Page({
  data: {
    _type: null,
    society: null,
    departion: null,
    description: null,
    // turn: null,
    // turnc: ['未面试', '过一面', '过二面', '过三面']
  },

  onLoad: function (options) {
    this.setData({
      _type: options._type,
      society: options.society,
      departion: options.departion,
      description: options.description,
      // turn: options.turn
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
  
  }
})