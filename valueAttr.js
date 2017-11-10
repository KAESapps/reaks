const { autorun } = require("kobs")

module.exports = getValue => domNode =>
  autorun(() => {
    const value = getValue()
    const domValue = domNode.value
    if (domValue !== value) domNode.value = value // prevent setting the value if not necessary to prevent cursor jumping
  })
