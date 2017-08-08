/**
 * permet de créer un transform qui en combine plusieurs de façon séquentielle
 */
module.exports = transforms => {
  return domNode => {
    const unmounts = transforms.map(t => t && t(domNode))
    return () => unmounts.forEach(unmount => unmount && unmount())
  }
}
