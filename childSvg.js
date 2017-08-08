const child = require('./child')

module.exports = (t, tagName = 'svg') => {
  return child(t, () => document.createElementNS('http://www.w3.org/2000/svg', tagName))
}
