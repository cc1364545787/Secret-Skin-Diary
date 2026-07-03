export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '标准拍照打卡'
    })
  : { navigationBarTitleText: '标准拍照打卡' }
