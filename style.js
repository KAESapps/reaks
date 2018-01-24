const forEach = require("lodash/forEach")
const isFunction = require("lodash/isFunction")
const isNumber = require("lodash/isNumber")
const last = require("lodash/last")
const get = require("lodash/get")
const mapValues = require("lodash/mapValues")
const pull = require("lodash/pull")

const swap = require("./swap")

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
  // TODO: check perf

  const styleIdentifiedValues = mapValues(styleObj, (v, k) => {
    // convertit les valeurs en objet pour avoir une référence mémoire
    const objValue = { value: convertNumericValues(k, v) }
    // crée une pile de valeurs pour cette propriété si besoin
    if (!node.stackStyle) node.stackStyle = {}
    if (!node.stackStyle[k]) node.stackStyle[k] = []

    // ajoute la valeur en haut de la pile
    node.stackStyle[k].push(objValue)

    // applique la valeur
    node.style[k] = objValue.value

    return objValue
  })

  return () =>
    forEach(styleIdentifiedValues, (v, k) => {
      // retire la valeur de la pile
      pull(node.stackStyle[k], v)
      // applique la valeur restante en haut de pile
      node.style[k] = get(last(node.stackStyle[k]), "value") || null
    })
}

const dynamicStyle = getStyleObj => swap(() => staticStyle(getStyleObj()))

module.exports = function(arg) {
  if (isFunction(arg)) {
    return dynamicStyle(arg)
  } else {
    return staticStyle(arg)
  }
}
