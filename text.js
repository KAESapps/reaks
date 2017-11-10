const { autorun } = require("kobs")
const isString = require("lodash/isString")

const staticText = v => domNode => {
  let str = v
  if (!isString(v)) {
    str = ""
    console.warn(
      "reaks/text value is not a string, using empty string",
      v,
      domNode
    )
  }
  const textNode = document.createTextNode(str)
  domNode.appendChild(textNode)
  return () => domNode.removeChild(textNode)
}
const dynamicText = getValue => domNode => {
  let textNode
  const unobserve = autorun(() => {
    const v = getValue()
    let str = v
    if (!isString(str)) {
      str = ""
      console.warn(
        "reaks/text value is not a string, using empty string",
        v,
        domNode
      )
    }
    if (textNode) {
      textNode.nodeValue = str
    } else {
      textNode = document.createTextNode(str)
      domNode.appendChild(textNode)
    }
  }, "reaks/text")
  return () => {
    unobserve()
    domNode.removeChild(textNode)
  }
}

module.exports = value => {
  return typeof value === "function" ? dynamicText(value) : staticText(value)
}
