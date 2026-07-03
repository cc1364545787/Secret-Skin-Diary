export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '皮肤报告'
    })
  : { navigationBarTitleText: '皮肤报告' }
