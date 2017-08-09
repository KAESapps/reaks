const { autorun } = require('reactivedb/obs')

module.exports = (attr, getValue) => domNode =>
  autorun(() => {
    domNode[attr] = getValue()
  })
