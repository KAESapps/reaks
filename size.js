const style = require("./style")

module.exports = dimensions => {
  const styleObj = { boxSizing: "border-box" }
  if (dimensions.w) styleObj.width = dimensions.w
  if (dimensions.h) styleObj.height = dimensions.h
  if (dimensions.wMin) styleObj.minWidth = dimensions.wMin
  if (dimensions.hMin) styleObj.minHeight = dimensions.hMin
  if (dimensions.wMax) styleObj.maxWidth = dimensions.wMax
  if (dimensions.hMax) styleObj.maxHeight = dimensions.hMax
  return style(styleObj)
}
