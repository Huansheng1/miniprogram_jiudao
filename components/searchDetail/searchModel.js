const Key = 'searchKey'
const LimitNum = 10
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

function getSearchInfo() {
    return _getData()
}

function setSearchInfo(data) {
  // 先获取本地缓存里的历史搜索记录
  let arrData = getSearchInfo()
  // 如果存在则不进行后续操作
  if(arrData.includes(data)) return
  // 如果达到上限则删除最后一个成员
  if(arrData.length === LimitNum){
    arrData.pop()
  }
  // 头部添加成员
  arrData.unshift(data)
  setStorageItem(Key, arrData)
}
function _getData() {
  return getStorageItem(Key) || []
}
export default {
  setStorageItem,
  getStorageItem,
  setSearchInfo,
  getSearchInfo
}