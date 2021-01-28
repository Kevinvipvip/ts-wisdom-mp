const app = getApp();
Page({
  data: {
    imgs: {
      banner: app.config.aliyun_base + '/ts-static/mp/img-collection.png',
      cate_bg: app.config.aliyun_base + '/ts-static/mp/bg-cate.png',
      border_cate: app.config.aliyun_base + '/ts-static/mp/border/border-cate.png',
    },
    cate: [],//分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectCateList();
  },

  // 获取分类数据
  getCollectCateList() {
    app.ajax('api/collectCateList', {}, arr => {
      app.aliyun_format(arr, 'pic2');
      this.setData({ cate: arr });
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
