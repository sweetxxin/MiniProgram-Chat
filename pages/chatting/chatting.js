let socketOpen = false
let socketMsgQueue = []
let SocketTask = null
let sessionId  = null
let msgQueue = []
const app = getApp()
Page({
  data: {
    docId:"",
    message:"123",
    msgLog:[],
    to:""
  },
  test:function(e){
   this.setData({
     message: e.detail.value
   })
  },
  test2: function (e) {
    this.setData({
      to: e.detail.value
    })
  },
  formSubmit: function (e) {
    var form_id = e.detail.formId;
    wx.request({
      url: 'https://chat.sweetxxin.top/push?m=push&id='+form_id,
      success:function(res){
        console.log(res);
      }
    })
    console.log(form_id);
  },
  send:function(){
    let message = {
      "to":this.data.to,
      "msg":this.data.message,
      "from":sessionId,
       "type": "text"
    }
    let that = this 
    SocketTask.send({
      data:JSON.stringify(message),
      success:function(res){
        console.log(message)
        console.log("发送成功")
        msgQueue.push(message)
        that.setData({
          msgLog: msgQueue
        })
      },
      fail:function(res){
        console.log("发送失败")
      }
    })
  },
  onLoad: function (e) {
    this.setData({
      docId:e.id
    })
    SocketTask =  wx.connectSocket({
      url: 'wss://' + app.globalData.socketUrl+"/websocket",
      data:e.id,
      success:function(res){
        console.log(res)
        console.log("连接成功")
      }
    })
    var that = this;
    SocketTask.onMessage(function (res) {
      res = JSON.parse(res.data)
      if (res.from == "server") {
        sessionId = res.to;
      }
          msgQueue.push(res)
      that.setData({
        msgLog:msgQueue
      })
      console.log(that.data.msgLog)
      console.log("收到消息")
      console.log(res)
    })
  },
  sendSocketMessage:function(msg) {
    console.log("准备发送")
    if(socketOpen) {
      wx.sendSocketMessage({
        data: msg,
        success:function(res){
          console.log("发送成功")
        },
        fail : function(res){
          console.log("发送失败")
        }
      })
    } 
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