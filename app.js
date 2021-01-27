const utils = require('./utils/util');
App({
  onLaunch() {
  },
  config: {
    base_url: 'https://ts.wcip.net',
    base_api: 'https://ts.wcip.net/mp/',
    aliyun_base: 'https://tsbwg.oss-cn-beijing.aliyuncs.com',
    reg: {
      tel: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
      phone: /\d{3,4}-\d{7,8}/,
      email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      natural: /^([1-9]\d*|0)$/,
      positive: /^[1-9]\d*$/,
      price: /^([1-9]\d*|0)(\.\d{1,2})?$/
    },
    // statusBarHeight: 0,
    // topBarHeight: 0,
    // default_img: '/images/default.png'
  },
  user_data: {
    token: ''
  },
  mp_update() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // console.log(res.hasUpdate); // 是否有更新
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  },

  toast(title, duration, icon = 'none') {
    let dura = duration || 2000;
    wx.showToast({
      title: String(title),
      icon: icon,
      duration: dura
    });
  },
  modal(content, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success() {
        if (callback) {
          callback();
        }
      }
    });
  },
  confirm(content, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      success: res => {
        if (res.confirm) {
          callback();
        }
      }
    });
  },
  ajax(path, data, succ, err, complete) {
    data = data || {};
    if (!data.token) {
      data.token = this.user_data.token;
    }

    wx.request({
      url: this.config.base_api + path,
      method: 'POST',
      dataType: 'json',
      data: data,
      success: res => {
        if (res.data.code !== 1) {
          if (err) {
            err(res.data);
          } else {
            switch (res.data.code) {
              case -3: // token失效
              case -6: // token为空
                let current_pages = getCurrentPages();
                let current_page = current_pages[current_pages.length - 1];
                wx.redirectTo({
                  url: '/pages/login/login?route=' + encodeURIComponent(current_page.route + this.obj2query(current_page.options))
                });
                break;
              // case -7:
              //   this.modal(res.data.message, () => {
              //     wx.navigateTo({
              //       url: 'pages/user-info/user-info',
              //     })
              //   });
              //   break;
              default:
                if (res.data.message) {
                  this.modal(res.data.message);
                } else {
                  this.toast('网络异常');
                }
                break;
            }
          }
        } else {
          if (succ) {
            succ(res.data.data);
          }
        }
      },
      fail() {
        // this.toast('网络异常');
      },
      complete() {
        if (complete) {
          complete();
        }
      }
    });
  },
  // 处理阿里云图片路径
  aliyun_format(obj, aliyun_field = 'pic') {
    if (obj instanceof Array) {
      if (typeof obj[0] === 'string') {
        for (let i = 0; i < obj.length; i++) {
          obj[i] = this.aliyun_empty_or(obj[i]);
        }
      } else {
        for (let i = 0; i < obj.length; i++) {
          obj[i][aliyun_field] = this.aliyun_empty_or(obj[i][aliyun_field]);
        }
      }
    } else if (typeof obj === 'object') {
      obj[aliyun_field] = this.aliyun_empty_or(obj[aliyun_field]);
    } else {
      return this.aliyun_empty_or(obj);
    }
  },
  aliyun_empty_or(aliyun) {
    if (aliyun) {
      if (aliyun.indexOf('https') === 0) {
        return aliyun;
      } else {
        return this.config.aliyun_base + '/' + aliyun;
      }
    }
  },
  // 时间格式化
  format_time(obj, field, fmt) {
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        if (fmt) {
          obj[i][field] = utils.date_format(obj[i][field], fmt);
        } else {
          obj[i][field] = utils.date_format(obj[i][field]);
        }
      }
    } else {
      if (fmt) {
        obj[field] = utils.date_format(obj[field], fmt);
      } else {
        obj[field] = utils.date_format(obj[field]);
      }
    }
  }
});
