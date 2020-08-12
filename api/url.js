import http from './base.js'

function getClassicLatest() {
  return http({
    url: '/classic/latest'
  })
}

function changeLikeStatus({
  status,
  art_id,
  type
}) {
  const flag = !!status
  return http({
    url: flag ? '/like' : '/like/cancel',
    method: 'POST',
    data: {
      art_id,
      type
    }
  })
}

function checkClassicInfo(config) {
  return http({
    url: `/classic/${config.index}/${config.type}`
  })
}

function getLikeStatus(config) {
  return http({
    url: `/classic/${config.typeId}/${config.id}/favor`
  })
}

function getBookLikeInfo(id) {
  return http({
    url: `/book/${id}/favor`
  })
}

function getBooks() {
  return http({
    url: '/book/hot_list'
  })
}

function getBookDetail(id) {
  return http({
    url: `/book/${id}/detail`
  })
}

function getBookTag(id) {
  return http({
    url: `/book/${id}/short_comment`
  })
}

function addBookComment(config) {
  console.log(config)
  return http({
    url: `/book/add/short_comment`,
    method: 'POST',
    data: {
      book_id: config.id,
      content: config.content
    }
  })
}

function getPopularTags() {
  return http({
    url: `/book/hot_keyword`
  })
}

function getLikeBooksNums() {
  return http({
    url: `/book/favor/count`
  })
}

function searchBook(config) {
  return http({
    url: `/book/search?start=${config.start}&summary=1&q=${config.keyword}`
  })
}

function getLikeBooks() {
  return http({
    url: `/classic/favor`
  })
}
export default {
  getClassicLatest,
  changeLikeStatus,
  checkClassicInfo,
  getLikeStatus,
  getBooks,
  getBookDetail,
  getBookTag,
  getBookLikeInfo,
  addBookComment,
  getPopularTags,
  searchBook,
  getLikeBooksNums,
  getLikeBooks
}