const app = getApp();

Page({
  data: {
    imgs: {
      bg_ticket: app.config.aliyun_base + '/ts-static/mp/bgs/bg-ticket-index.png',
      right: app.config.aliyun_base + '/ts-static/mp/icons/right.png',
      time: app.config.aliyun_base + '/ts-static/mp/icons/icon-time.png',
    },
    slides: [],//轮播图数据
    collection: [],//精品馆藏数据
    activity: { have_data: false },//活动预约数据
    exhibition: [],//精选展览
    news: [],//新闻资讯列表
  },
  onLoad() {
    app.mp_update();
    this.getSlideList();
    this.getCollectList();
    this.getActivityList();
    this.getDisplayDetail();
    this.getArticleList();
  },
  getSlideList() {//获取轮播图数据
    app.ajax('api/slideList', {}, res => {
      app.aliyun_format(res, 'pic');
      this.setData({ slides: res });
    });
  },
  getCollectList() { //获取精品馆藏列表
    app.ajax('api/collectList', {}, res => {
      app.aliyun_format(res.list, 'cover');
      this.setData({ collection: res.list });
    });
  },
  getActivityList() { //获取活动预约数据
    app.ajax('activity/activityList', {}, res => {
      app.aliyun_format(res.list, 'pic');
      app.format_time(res.list, 'start_time', 'yyyy.MM.dd');
      app.format_time(res.list, 'end_time', 'yyyy.MM.dd');
      res.list[0].have_data = true;
      this.setData({ activity: res.list[0] });
    });
  },
  getDisplayDetail() { //获取精选展览数据
    app.ajax('api/displayList', {}, res => {
      app.aliyun_format(res.list, 'cover');
      app.format_time(res.list, 'start_time', 'yyyy.MM.dd');
      for (let i = 0; i < res.list.length; i++) {
        if (res.list[i].end_time === 0) {
          res.list[i].end_time = '∞'
        } else {
          app.format_time(res.list[i], 'end_time', 'yyyy.MM.dd');
        }
      }
      this.setData({ exhibition: res.list });
    });
  },
  getArticleList() { //获取新闻资讯列表
    app.ajax('api/articleList', {page: 1, perpage: 4}, res => {
      app.aliyun_format(res.list, 'pic');
      app.format_time(res.list, 'create_time', 'yyyy.MM.dd');
      this.setData({ news: res.list });
    });
  },


  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
});
