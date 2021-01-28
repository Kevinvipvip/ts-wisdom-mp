const app = getApp();
Page({
  data: {
    imgs: {
      tab_left: app.config.aliyun_base + '/ts-static/mp/border/tab-left.png',
      tab_right: app.config.aliyun_base + '/ts-static/mp/border/tab-right.png',
      tab_left_select: app.config.aliyun_base + '/ts-static/mp/border/tab-left-select.png',
      tab_right_select: app.config.aliyun_base + '/ts-static/mp/border/tab-right-select.png',
    },
    tab: 0,
    news: [],//新闻资讯列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList(1);
  },
// 点击切换新闻类别
  tab_click(e) {
    this.setData({ tab: parseInt(e.currentTarget.dataset.id) });
    this.getArticleList(1);
  },
  getArticleList(page) { //获取新闻资讯列表
    let post = { type: this.data.tab, page: page, perpage: 10 };
    app.ajax('api/articleList', post, res => {
      app.aliyun_format(res.list, 'pic');
      app.format_time(res.list, 'create_time', 'yyyy.MM.dd');
      this.setData({ news: res.list });
    });
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
