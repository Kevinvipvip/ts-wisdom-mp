const app = getApp();

Component({
  data: {
    imgs: {
      logo: app.config.aliyun_base + '/ts-static/mp/logo.png',
      mine: app.config.aliyun_base + '/ts-static/mp/icons/mine.png',
      scanning: app.config.aliyun_base + '/ts-static/mp/icons/scanning.png',
      search: app.config.aliyun_base + '/ts-static/mp/icons/search.png',
      nav: app.config.aliyun_base + '/ts-static/mp/icons/nav.png',
      nav_close: app.config.aliyun_base + '/ts-static/mp/icons/nav-close.png',
      right: app.config.aliyun_base + '/ts-static/mp/icons/icon-right.png',
      open_right: app.config.aliyun_base + '/ts-static/mp/icons/s-nav-open.png',
      nav_bg: app.config.aliyun_base + '/ts-static/mp/bg-nav.jpg',
      nav_border_top: app.config.aliyun_base + '/ts-static/mp/border/border-top.png',
      nav_border_bottom: app.config.aliyun_base + '/ts-static/mp/border/border-bottom.png',
    },
    nav: [
      {
        id: 1, name: '首页', url: 'index', s_nav: []
      }, {
        id: 2, name: '最新动态', url: 'news', s_nav: []
      }, {
        id: 3,
        name: '陈列展览',
        url: 'exhibition',
        s_nav: [{
          title: '常设展览', s_url: 'exhibit_standing'
        }, {
          title: '临时展览', s_url: 'exhibit_temp'
        }]
      }, {
        id: 4, name: '典藏文物', url: 'collection', s_nav: []
      }, {
        id: 5, name: '观众服务', url: 'service',
        s_nav: [{
          title: '参观预约', s_url: 'service'
        }, {
          title: '活动预约', s_url: 'activity'
        }, {
          title: '讲解预约', s_url: 'explain'
        }, {
          title: '交通指南', s_url: 'service'
        }, {
          title: '参观须知', s_url: 'service'
        }]
      }, {
        id: 6, name: '文创产品', url: 'products', s_nav: []
      }],

    show_nav: false,
    show_s_nav: false,
    nav_id: 0
  },
  methods: {
    fn_show_nav() {//头部显示导航与否
      this.setData({ show_nav: !this.data.show_nav });
    },
    fn_s_nav(e) {
      let id = 0,index=e.currentTarget.dataset.index;
      console.log(index);
      if (this.data.nav_id === this.data.nav[index].id) {
        id = 0;
      } else {
        id = this.data.nav[index].id;
      }
      this.setData({
        show_s_nav: !this.data.show_s_nav,
        nav_id: id
      });
    },
  },
});
