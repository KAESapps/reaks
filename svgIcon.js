const style = require("./style")
const seq = require("./seq")
const childSvg = require("./childSvg")
const attr = require("./attrs")
const size = require("./size")

module.exports = ({ path, viewBox }, { color, size: sizeArg, transform }) => {
  if (!color) {
    color = "black"
  }
  const svgTransforms = [
    style({ fill: color }),
    attr({ viewBox }),
    childSvg(seq([attr({ d: path })]), "path"),
    transform,
  ]

  if (sizeArg) {
    svgTransforms.push(size(sizeArg))
  }

  return seq([
    // display: flex ensures that parent size fits svg node size
    // (with display: block, there may be some weird margins coming up)
    style({ display: "flex" }),
    childSvg(seq(svgTransforms)),
  ])
}
