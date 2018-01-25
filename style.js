const forEach = require("lodash/forEach")
const isFunction = require("lodash/isFunction")
const isNumber = require("lodash/isNumber")
const last = require("lodash/last")
const get = require("lodash/get")
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
  if (defaultNumericUnits[prop]) {
    if (isNumber(value)) {
      return value + defaultNumericUnits[prop]
    }
  }
  return value
}

const stackableProps = ['display', 'color', 'backgroundColor']

const staticStyle = styleObj => node => {
  const styleIdentifiedValues = {}
  forEach(styleObj, (v, k) => {
    const value = convertNumericValues(k, v)
    // applique la valeur
    node.style[k] = value

    if (stackableProps.indexOf(k) > -1) {
      // convertit les valeurs en objet pour avoir une référence mémoire
      const objValue = { value }
      // crée une pile de valeurs pour cette propriété si besoin
      if (!node.stackStyle) node.stackStyle = {}
      if (!node.stackStyle[k]) node.stackStyle[k] = []

      // ajoute la valeur en haut de la pile
      node.stackStyle[k].push(objValue)

      styleIdentifiedValues[k] = objValue
    }
  })

  return () =>
    forEach(styleObj, (v, k) => {
      const sIV = styleIdentifiedValues[k]
      let value = null
      if (sIV) {
        // retire la valeur de la pile
        pull(node.stackStyle[k], sIV)
        // applique la valeur restante en haut de pile
        value = get(last(node.stackStyle[k]), "value") || null
      }
      node.style[k] = value
    })
}

const dynamicStyle = getStyleObj => swap(() => staticStyle(getStyleObj()))

module.exports = function (arg) {
  if (isFunction(arg)) {
    return dynamicStyle(arg)
  } else {
    return staticStyle(arg)
  }
}
