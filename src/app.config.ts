export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/report/index',
    'pages/compare/index',
    'pages/mine/index',
    'pages/camera/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F7F5F8',
    navigationBarTitleText: '肌秘日志',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8C8894',
    selectedColor: '#9A8C98',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar/house.png',
        selectedIconPath: './assets/tabbar/house-active.png'
      },
      {
        pagePath: 'pages/report/index',
        text: '报告',
        iconPath: './assets/tabbar/trending-up.png',
        selectedIconPath: './assets/tabbar/trending-up-active.png'
      },
      {
        pagePath: 'pages/compare/index',
        text: '对比',
        iconPath: './assets/tabbar/split.png',
        selectedIconPath: './assets/tabbar/split-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/tabbar/user.png',
        selectedIconPath: './assets/tabbar/user-active.png'
      }
    ]
  }
})
