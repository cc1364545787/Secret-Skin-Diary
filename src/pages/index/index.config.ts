export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '肌秘日志'
    })
  : { navigationBarTitleText: '肌秘日志' }
