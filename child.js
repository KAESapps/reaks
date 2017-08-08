/**
 * créer un child node et le confie à ses transforms
 */

const createElementDefault = () => document.createElement('div')

module.exports = (transform, createElement = createElementDefault) => parentNode => {
  const domNode = createElement()
  parentNode.appendChild(domNode)
  const transformCancel = transform(domNode)
  return () => {
    transformCancel && transformCancel()
    parentNode.removeChild(domNode)
  }
}
