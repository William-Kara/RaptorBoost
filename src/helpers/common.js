
const getYoutubeId = (url) => {
  /* eslint-disable-next-line */
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  var match = url.match(regExp)
  if (match && match[2].length == 11) {
    return match[2]
  } else {
    return null
  }
}
export {
  getYoutubeId
}