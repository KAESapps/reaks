const { autorun } = require('ks-data/obs')

module.exports = (attr, getValue) => domNode =>
  autorun(() => {
    domNode[attr] = getValue()
  })
