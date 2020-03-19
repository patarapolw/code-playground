function getYYYYMMDD(d0) {
  let d = d0
  if (!d0 instanceof Date) {
    d = new Date(d0)
  }
  d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000)

  return `${
    padStart(d.getFullYear(), 4, '0')
  }-${
    padStart(d.getMonth() + 1, 2, '0')
  }-${
    padStart(d.getDate(), 2, '0')
  }`
}

/**
 * 
 * @param {*} s 
 * @param {number} length 
 * @param {*} [c] 
 */
function padStart(s, length, c = '') {
  const s0 = s.toString()
  if (s0.length > length) {
    return s0
  } else {
    return Array(length - s0.length).fill(c).join('') + s0
  }
}
