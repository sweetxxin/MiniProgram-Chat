const app = getApp()
const map = app.globalData.map
const code = app.globalData.code

Page({
  data: {
    imageList: [],
    arrayn1: [],
    arrayn2: [],
    arrayc1: [],
    arrayc2: [],
    index1: 0,
    index2: 0,
    gendern: [0, 1],
    genderc: ['女', '男'],
    indexGender: 0,
    count: [0, 0, 0],  // 输入字符个数
    strings: ["", "", ""],  // 前四项信息
    flag: false
  },

  chooseImage: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      },
      fail: function(res) {},
      complete: function (res) {},
    })
  },

  previewImage: function(e) {
    let that = this
    wx.previewImage({
      current: '',
      urls: this.data.imageList,
      success: function(res) {},
      fail: function(res) {},
      complete: function (res) {},
    })
  },

  inputCounter: function (e) {
    let count = e.detail.value.length
    let aString = e.detail.value
    let array1 = this.data.count
    let array2 = this.data.strings
    array1[e.target.id] = count
    array2[e.target.id] = aString
    this.setData({
      count: array1,
      strings: array2
    })
  },

  bindPickerChangeGender: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexGender: e.detail.value
    })
  },

  bindPickerChange1: function (e) {
    if (e.detail.value == 0) {
      return false
    }
    if (e.detail.value != this.data.index1) {  // 选择另一类型
      this.setData({
        index2: 0
      })
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    let arrayn = new Array('')
    let arrayc = new Array('请选择')
    let college = code["3"]
    console.log(college[this.data.arrayn1[this.data.index1]])
    arrayn = arrayn.concat(college[this.data.arrayn1[this.data.index1]])
    // for (let key in college[this.data.arrayn1[this.data.index1]]) {
    //   arrayn.push(key)
    // }
    for (let i = 1; i < arrayn.length; i++) {
      arrayc.push(map[arrayn[i]])
      // console.log(arrayn[i] + ': ' + arrayc[i])
    }
    this.setData({
      arrayn2: arrayn,
      arrayc2: arrayc
    })
    // console.log(code[this.data.arrayn1[this.data.index1]])
  },

  bindPickerChange2: function (e) {
    if (e.detail.value == 0) {
      return false
    }
    if (this.data.index1 == 0) {
      return false
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })

    // console.log(this.data.arrayn1[this.data.index1] + this.data.arrayn2[this.data.index2] + this.data.arrayn3[this.data.index3])
  },

  bindSubmit: function(e) {
    let _class = '2' + this.data.arrayn1[this.data.index1] + this.data.arrayn2[this.data.index2]
    if (app.globalData.remainderTimes < 1) {
      return false
    }

    let that = this

    let a = this.data.imageList.length
    let b = this.data.count[0]
    // let c = this.data.indexGender
    let d = this.data.count[1]
    let ee = this.data.count[2]
    let f = this.data.index1
    let g = this.data.index2

    if (false) {
      // wx.showModal({
      //   title: '提示',
      //   content: '信息填不完整',
      //   success: function (res) {
      //   }
      // })
      console.log("没填好")
      //return false
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })

      let basicInfo = app.globalData.basicInfo
      let formData = {
        name: that.data.strings[0] != app.globalData.basicInfo.name ? that.data.strings[0] : app.globalData.basicInfo.name,
        gender: that.data.indexGender.toString() != app.globalData.basicInfo.gender ? that.data.indexGender.toString() : app.globalData.basicInfo.gender,
        sid: that.data.strings[1] != app.globalData.basicInfo.sid ? that.data.strings[1] : app.globalData.basicInfo.sid,
        phone: that.data.strings[2] != app.globalData.basicInfo.phone ? that.data.strings[2] : app.globalData.basicInfo.phone,
        klass: _class != app.globalData.basicInfo._class ? _class : app.globalData.basicInfo._class,
        token: app.globalData.basicInfo.data.data
      }
      // console.log(formData)

      if (this.data.imageList[0] != app.globalData.basicInfo.avatar) {
        console.log('upload')
        console.log(that.data.imageList[0])
        wx.uploadFile({
          url: 'http://www.sweetxxin.top:8888/basic-with-avatar',
          filePath: that.data.imageList[0],
          name: 'avatar',  // face, avatar
          header: {},
          formData: formData,
          success: function (res) {
            let result = JSON.parse(res.data)
            console.log(result.state)
            if (result.state == '0') {
              app.globalData.basicInfo.avatar = result.avatar
              app.globalData.basicInfo.name = that.data.strings[0]
              app.globalData.basicInfo.gender = that.data.indexGender
              app.globalData.basicInfo.sid = that.data.strings[1]
              app.globalData.basicInfo.phone = that.data.strings[2]
              app.globalData.basicInfo._class = _class
              app.globalData.hasBasicInfo = true
              app.globalData.remainderTimes = app.globalData.remainderTimes - 1
              console.log(app.globalData.remainderTimes)
              wx.hideLoading()
              // console.log('start to show')
              wx.showToast({
                title: '好了，快去报名吧',
                duration: 2000,
                mask: true,
              })
              setTimeout(function () {
                // console.log('start to switch')
                wx.switchTab({
                  url: '/pages/index/index',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }, 2000)
            }
          },
          fail: function (res) {
            wx.hideLoading()
          },
          complete: function (res) { },
        })
      } else {
        console.log('request')
        wx.request({
          url: 'http://www.sweetxxin.top:8888/basic-without-avatar',
          data: formData,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            // console.log(res.data + ' ' + res.statusCode)
            // let result = JSON.parse(res.data)
            let result = res.data
            // console.log(result.state)
            if (result.state == '0') {
              app.globalData.basicInfo.name = that.data.strings[0]
              app.globalData.basicInfo.gender = that.data.indexGender
              app.globalData.basicInfo.sid = that.data.strings[1]
              app.globalData.basicInfo.phone = that.data.strings[2]
              app.globalData.basicInfo._class = _class
              app.globalData.hasBasicInfo = true
              app.globalData.remainderTimes = app.globalData.remainderTimes - 1
              console.log(app.globalData.remainderTimes)
              wx.hideLoading()
              // console.log('start to show')
              wx.showToast({
                title: '好了，快去报名吧',
                duration: 2000,
                mask: true,
              })
              setTimeout(function () {
                // console.log('start to switch')
                wx.switchTab({
                  url: '/pages/index/index',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }, 2000)
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }
  },

  onLoad: function (options) {
    let arrayn = new Array('')
    let arrayc = new Array('请选择')
    console.log(code);
    for (let key in code["3"]) {
      arrayn.push(key)
    }
    for (let i = 1; i < arrayn.length; i++) {
      arrayc.push(map[arrayn[i]])
      // console.log(arrayn[i] + ': ' + arrayc[i])
    }
    this.setData({
      arrayn1: arrayn,
      arrayc1: arrayc
    })
  },

  onReady: function () {
    
  },

  onShow: function () {
    let that = this
    // console.log('读取basicInfo完成')
    // console.log(app.globalData.remainderTimes)
    if(app.globalData.hasBasicInfo && !that.data.flag) {
      // console.log(app.globalData.hasBasicInfo)
      let basic = app.globalData.basicInfo
      // console.log(basic)
      let index1 = 0
      let index2 = 0
      let classTmp = basic._class
      for(let i = 0; i < that.data.arrayn1.length; i++) {
        if (classTmp.slice(1, 3) == that.data.arrayn1[i]) {
          index1 = i
          break;
        }
      }
      let arrayn = new Array('')
      let arrayc = new Array('请选择')
      let college = code["3"]
      // console.log(college[this.data.arrayn1[index1]])
      arrayn = arrayn.concat(college[this.data.arrayn1[index1]])
      for (let i = 1; i < arrayn.length; i++) {
        arrayc.push(map[arrayn[i]])
      }
      this.setData({
        arrayn2: arrayn,
        arrayc2: arrayc
      })
      for (let i = 0; i < that.data.arrayn2.length; i++) {
        if (classTmp.slice(3) == that.data.arrayn2[i]) {
          index2 = i
          break;
        }
      }
      // console.log(basic.gender)
      that.setData({
        imageList: [basic.avatar],
        indexGender: parseInt(basic.gender),
        strings : [basic.name, basic.sid, basic.phone],
        index1: index1,
        index2: index2,
        count: [basic.name.length, basic.sid.length, basic.phone.length],
        flag: false
      })
      // console.log(this.data.indexGender)
    }
  },

  onHide: function () {
    this.setData({
      flag: true
    })
    console.log('hide')
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  }
})