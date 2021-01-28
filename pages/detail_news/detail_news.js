const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    imgs: {
      sina: app.config.aliyun_base + '/ts-static/mp/icons/sina.png',
      wechat: app.config.aliyun_base + '/ts-static/mp/icons/wechat.png',
      qq: app.config.aliyun_base + '/ts-static/mp/icons/qq.png',
    },

    id: 0,
    prev_i: 0,
    next_i: 2,

    detail: {},
    news_list: []
  },
  onLoad: function (options) {
    this.setData({ id: parseInt(options.id) });
    this.getNewDetail();
  },

  // 获取新闻资讯详情
  getNewDetail() {
    app.ajax('api/articleDetail', { article_id: this.data.id }, res => {
      app.format_time(res, 'create_time', 'yyyy.MM.dd');
      WxParse.wxParse('rich_text', 'html', res.content, this);
      this.setData({ detail: res });
    }, null, () => {
      this.getArticleList();
    });
  },
//获取新闻资讯列表
  getArticleList() {
    let post = {
      page: 1,
      perpage: 1000
    };
    app.ajax('api/articleList', post, res => {
      this.setData({ news_list: res.list });
    }, null, () => {
      let obj = this.data.news_list;
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].id === this.data.detail.id) {
          if ((i + 1) === obj.length) {
            this.setData({ prev_i: i - 1, next_i: 0 });
            // this.prev_i = i - 1;
            // this.next_i = 0;
          } else if (i === 0) {
            this.setData({ prev_i: obj.length - 1, next_i: i + 1 });
            // this.prev_i = obj.length - 1;
            // this.next_i = i + 1;
          } else {
            this.setData({ prev_i: i - 1, next_i: i + 1 });
            // this.prev_i = i - 1;
            // this.next_i = i + 1;
          }
        }
      }
    });
  },
  // 上一篇新闻
  prev_pages(e) {
    let data = this.data;
    data.id = e.currentTarget.dataset.id;
    if (data.prev_i !== data.news_list.length - 1) {
      wx.redirectTo({ url: '/pages/detail_news/detail_news?id=' + data.id });
    } else {
      app.toast('没有上一篇了')
    }
  },
  // 下一篇新闻
  next_pages(e) {
    let data = this.data;
    data.id = e.currentTarget.dataset.id;
    if (data.next_i !== 0) {
      wx.redirectTo({ url: '/pages/detail_news/detail_news?id=' + data.id });
    } else {
      app.toast('没有下一篇了')
    }
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
