const forEach = require("lodash/forEach")

module.exports = attrs => node => {
  forEach(attrs, (v, k) => node.setAttribute(k, v))
}
