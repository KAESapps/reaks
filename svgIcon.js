const style = require("./style")
const seq = require("./seq")
const childSvg = require("./childSvg")
const attr = require("./attrs")
const size = require("./size")

module.exports = ({ path, viewBox }, {
  color = "black",
  size: sizeArg,
  transform,
}) => {
  const transforms = [
    style({ fill: color }),
    attr({ viewBox }),
    childSvg(seq([attr({ d: path })]), "path"),
    transform,
  ]

  if (sizeArg) {
    transforms.push(size(sizeArg))
  }

  return childSvg(seq(transforms))
}
