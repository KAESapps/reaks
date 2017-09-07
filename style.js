const forEach = require("lodash/forEach")
const isFunction = require("lodash/isFunction")
const isNumber = require("lodash/isNumber")

const { autorun } = require("reactivedb/obs")

const defaultNumericUnits = {
  borderRadius: "px",
  fontSize: "px",
  height: "px",
  margin: "px",
  marginBottom: "px",
  marginLeft: "px",
  marginRight: "px",
  marginTop: "px",
  maxHeight: "px",
  maxWidth: "px",
  minHeight: "px",
  minWidth: "px",
  padding: "px",
  paddingBottom: "px",
  paddingLeft: "px",
  paddingRight: "px",
  paddingTop: "px",
  width: "px",
}

const convertNumericValues = (prop, value) => {
  if (prop in defaultNumericUnits) {
    if (isNumber(value)) {
      return value + defaultNumericUnits[prop]
    }
  }
  return value
}

const staticStyle = styleObj => node => {
  forEach(styleObj, (v, k) => (node.style[k] = convertNumericValues(k, v)))
  return () => forEach(styleObj, (v, k) => (node.style[k] = null))
}

const dynamicStyle = getStyleObj => node => {
  return autorun(function() {
    const styleObj = getStyleObj()
    staticStyle(styleObj)(node)
  }, "reaks/style")
}

module.exports = function(arg) {
  if (isFunction(arg)) {
    return dynamicStyle(arg)
  } else {
    return staticStyle(arg)
  }
}
