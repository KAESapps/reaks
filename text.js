const { autorun } = require('ks-data/obs')
const staticText = str => domNode => {
  const textNode = document.createTextNode(str)
  domNode.appendChild(textNode)
  return () => domNode.removeChild(textNode)
}
const dynamicText = getValue => domNode => {
  let textNode
  const unobserve = autorun(() => {
    const v = getValue()
    const str = typeof v === 'string' ? v : JSON.stringify(v) || ''
    if (textNode) {
      textNode.nodeValue = str
    } else {
      textNode = document.createTextNode(str)
      domNode.appendChild(textNode)
    }
  }, 'reaks/text')
  return () => {
    unobserve()
    domNode.removeChild(textNode)
  }
}

module.exports = value => {
  return typeof value === 'function' ? dynamicText(value) : staticText(value)
}
