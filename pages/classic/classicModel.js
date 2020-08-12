import requestModel from '../../api/url'

function setStorageItem(key, value) {
  try {
    return wx.setStorageSync(key, value)
  } catch (error) {
    console.log('保存缓存失败：')
    console.log(e)
  }
}

function getStorageItem(key) {
  try {
    return wx.getStorageSync(key)
  } catch (error) {
    console.log('读取缓存失败：')
    console.log(e)
  }
}

function getClassicInfo(config) {
  if (config && config.index) {
    return _getData(config)
  }
}

function setClassicInfo(classicData) {
  setStorageItem('classic-' + classicData.index, classicData)
}

function _nextOrPrevious(config) {
  return config.type === "previous" ? config.index - 1 : config.index + 1
}
function _getData(config) {
  const data = getStorageItem('classic-' + _nextOrPrevious(config))
  if (data) {
    return data
  } else {
    const data = checkClassicInfo(config)
    return data
  }
}
async function checkClassicInfo(config){
  const data = await requestModel.checkClassicInfo(config)
  .then(v => {
    setClassicInfo(v)
    return v
  })
  .catch(e => {
    console.log(e)
  })
  return data
}
async function getLikeStatus(config){
  if(config.id){
    return await requestModel.getLikeStatus(config)
  .then(v => {
    const resultData = {
      ...getClassicInfo(config),
      ...v
    }
    setClassicInfo(resultData)
    return getClassicInfo(config)
  })
  }
}
export default {
  setStorageItem,
  getStorageItem,
  setClassicInfo,
  getClassicInfo,
  getLikeStatus
}