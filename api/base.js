import http from '../utils/http.js'

function request({
  baseURL = 'http://bl.7yue.pro/v1',
  url,
  method,
  data,
  header = {
    'appkey': 'GgRhTjUNUYn1fHke'
  },
  ...restConfig
}) {
  return http({
    url: baseURL + url,
    method,
    data,
    header,
    ...restConfig
  })
}
export default request