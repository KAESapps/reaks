const forEach = require('lodash/forEach')

module.exports = styleObj => node => {
  forEach(styleObj, (v, k) => node.setAttribute(k, v))
}
