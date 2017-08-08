const { autorun } = require('ks-data/obs')

module.exports = (getValue, createCmp) => parentNode => {
  const domNodes = new Map()
  const cmps = new Map()
  const prevIds = []
  const cancelObservation = autorun(() => {
    const ids = getValue()
    // TODO: est-il possible de faire ça meiux pour limiter les opérations sur le DOM ? reprendre l'implémentation de react/preact/inferno ?
    prevIds.slice().forEach((id, i) => {
      const newIndex = ids.indexOf(id)
      // remove ids no more in use
      if (newIndex < 0) {
        const unmount = cmps.get(id)
        unmount()
        cmps.delete(id)
        const domNode = domNodes.get(id)
        parentNode.removeChild(domNode)
        domNodes.delete(id)
        prevIds.splice(i, 1)
      }
    })
    // move current ids and add new ones
    ids.forEach((id, i) => {
      if (prevIds[i] === id) return // nothing to do

      const prevIndex = prevIds.indexOf(id)
      if (prevIndex >= 0) {
        //move
        const domeNode = domNodes.get(id)
        const refId = prevIds[i]
        const refNode = domNodes.get(refId)
        parentNode.insertBefore(domeNode, refNode)
        prevIds.splice(prevIndex, 1)
        prevIds.splice(i, 0, id)
      } else {
        // add
        const domNode = document.createElement('div')
        const refId = prevIds[i]
        const refNode = domNodes.get(refId)
        parentNode.insertBefore(domNode, refNode)
        const cmp = createCmp(id)
        cmps.set(id, cmp(domNode))
        domNodes.set(id, domNode)
        prevIds.splice(i, 0, id)
      }
    })
  }, 'repeat')
  return () => {
    cancelObservation()
    cmps.forEach(unmount => unmount())
    domNodes.forEach(domNode => parentNode.removeChild(domNode))
  }
}
