const style = require("./style")

module.exports = (dimensions) => {
  const styleObj = { boxSizing: "border-box" }
  if (dimensions.w != null) styleObj.width = dimensions.w
  if (dimensions.h != null) styleObj.height = dimensions.h
  if (dimensions.wMin != null) styleObj.minWidth = dimensions.wMin
  if (dimensions.hMin != null) styleObj.minHeight = dimensions.hMin
  if (dimensions.wMax != null) styleObj.maxWidth = dimensions.wMax
  if (dimensions.hMax != null) styleObj.maxHeight = dimensions.hMax
  return style(styleObj)
}
