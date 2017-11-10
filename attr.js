const { autorun } = require("kobs")

module.exports = (attr, getValue) => domNode =>
  autorun(() => {
    domNode[attr] = getValue()
  })
