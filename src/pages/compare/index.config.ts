export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '疗效对比'
    })
  : { navigationBarTitleText: '疗效对比' }
